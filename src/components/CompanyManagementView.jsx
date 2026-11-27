import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Link2, 
  FileSpreadsheet, 
  Smartphone,
  X,
  Sparkles,
  Users
} from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function CompanyManagementView({ 
  companies, 
  activeCompanyId, 
  onSelectCompany, 
  onCreateCompany, 
  onOpenSurveyForCompany, 
  onOpenExcelForCompany 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedCompanyId, setCopiedCompanyId] = useState(null);

  // New company form state
  const [nombre, setNombre] = useState('');
  const [nit, setNit] = useState('');
  const [actividadEconomica, setActividadEconomica] = useState('');
  const [claseRiesgo, setClaseRiesgo] = useState('Riesgo II');
  const [centroTrabajo, setCentroTrabajo] = useState('Sede Principal');
  const [ciudad, setCiudad] = useState('Bogotá D.C.');
  const [departamento, setDepartamento] = useState('Cundinamarca');
  const [responsableSST, setResponsableSST] = useState('');

  const filteredCompanies = companies.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nit.includes(searchTerm) ||
    c.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyLink = (companyId) => {
    const url = `https://jimmyale89.github.io/bateria-riesgo-psicosocial/?companyId=${companyId}&survey=true`;
    navigator.clipboard?.writeText(url);
    setCopiedCompanyId(companyId);
    setTimeout(() => setCopiedCompanyId(null), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !nit) {
      alert('Por favor ingrese el nombre y NIT de la empresa.');
      return;
    }

    const newCompany = {
      id: `emp-00${companies.length + 1}`,
      nombre: nombre.toUpperCase(),
      nit,
      actividadEconomica: actividadEconomica || 'Servicios y Comercio (CIIU 8299)',
      claseRiesgo,
      centroTrabajo,
      ciudad,
      departamento,
      responsableSST: responsableSST || 'Líder SG-SST',
      fechaEvaluacion: new Date().toISOString().split('T')[0],
      periodicidad: 'Por determinar tras tabulación',
      proximaEvaluacion: 'Pendiente',
      resumenRiesgo: {
        intraA: 'SIN EVALUAR',
        intraB: 'SIN EVALUAR',
        extra: 'SIN EVALUAR',
        estres: 'SIN EVALUAR',
        semaforoGeneral: 'SIN EVALUAR'
      },
      totalParticipantes: 0,
      participacionA: 0,
      participacionB: 0
    };

    onCreateCompany(newCompany);
    setIsCreateModalOpen(false);
    // Reset form
    setNombre('');
    setNit('');
    setActividadEconomica('');
    setResponsableSST('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold mb-1">
            <Building2 className="w-3.5 h-3.5" />
            Portal Multi-Empresa para Consultores SST
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Directorio de Empresas Clientes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Administre múltiples clientes, genere enlaces de encuestas personalizados y acceda a los diagnósticos independientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por empresa, NIT o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Add Company Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Registrar Nueva Empresa
          </button>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((comp) => {
          const isActive = comp.id === activeCompanyId;
          return (
            <div
              key={comp.id}
              className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                isActive
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    comp.claseRiesgo.includes('IV') || comp.claseRiesgo.includes('V')
                      ? 'bg-red-100 text-red-800'
                      : comp.claseRiesgo.includes('III')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    ARL {comp.claseRiesgo}
                  </span>

                  {isActive && (
                    <span className="text-[10px] bg-indigo-600 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Empresa Activa
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {comp.nombre}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    NIT: {comp.nit}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{comp.actividadEconomica}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{comp.ciudad}, {comp.departamento} ({comp.centroTrabajo})</span>
                  </div>
                </div>
              </div>

              {/* Card Body: Risk Semaphores & Stats */}
              <div className="p-5 space-y-4 bg-slate-50/50 flex-1">
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Evaluados</span>
                    <span className="text-lg font-black text-slate-900">{comp.totalParticipantes}</span>
                    <span className="text-[10px] text-slate-500 block">Forma A: {comp.participacionA} | B: {comp.participacionB}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Riesgo Global</span>
                    <div className="mt-1">
                      <RiskBadge level={comp.resumenRiesgo.semaforoGeneral} size="sm" />
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{comp.periodicidad.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Semaphores mini-row */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 grid grid-cols-3 gap-1 text-[11px] text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Intralaboral</span>
                    <RiskBadge level={comp.resumenRiesgo.intraB} size="sm" showDot={false} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Extralaboral</span>
                    <RiskBadge level={comp.resumenRiesgo.extra} size="sm" showDot={false} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Estrés</span>
                    <RiskBadge level={comp.resumenRiesgo.estres} size="sm" showDot={false} />
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="p-4 border-t border-slate-100 bg-white space-y-2">
                <button
                  onClick={() => onSelectCompany(comp.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  <span>{isActive ? 'Panel de Diagnóstico Activo' : 'Entrar a este Diagnóstico'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyLink(comp.id)}
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    title="Copiar enlace de encuesta móvil para esta empresa"
                  >
                    {copiedCompanyId === comp.id ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Link Copiado
                      </span>
                    ) : (
                      <>
                        <Link2 className="w-3 h-3" /> Copiar Link Móvil
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenSurveyForCompany(comp.id)}
                    className="py-1.5 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                    title="Abrir simulador móvil con esta empresa"
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onOpenExcelForCompany(comp.id)}
                    className="py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                    title="Subir archivo Excel para esta empresa"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create New Client Company */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Registrar Nueva Empresa Cliente
                </h3>
                <p className="text-xs text-slate-500">
                  Configure los datos institucionales para la emisión de informes reglamentarios
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Razón Social / Nombre Comercial *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. CLÍNICA ODONTOLÓGICA SONRÍA S.A.S."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">NIT con dígito *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 901.458.789-3"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Clase de Riesgo ARL</label>
                  <select
                    value={claseRiesgo}
                    onChange={(e) => setClaseRiesgo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Riesgo I">Clase I (Mínimo - Oficinas/Educación)</option>
                    <option value="Riesgo II">Clase II (Bajo - Comercio/Salud básica)</option>
                    <option value="Riesgo III">Clase III (Medio - Manufactura)</option>
                    <option value="Riesgo IV">Clase IV (Alto - Transporte/Logística)</option>
                    <option value="Riesgo V">Clase V (Máximo - Minería/Construcción)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actividad Económica (CIIU)</label>
                <input
                  type="text"
                  placeholder="Ej. Práctica médica y odontológica (CIIU 8621)"
                  value={actividadEconomica}
                  onChange={(e) => setActividadEconomica(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Departamento</label>
                  <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Centro de Trabajo / Sede</label>
                  <input
                    type="text"
                    value={centroTrabajo}
                    onChange={(e) => setCentroTrabajo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Responsable SG-SST</label>
                  <input
                    type="text"
                    placeholder="Ej. Ing. Sonia Ramírez"
                    value={responsableSST}
                    onChange={(e) => setResponsableSST(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Registrar y Habilitar Empresa
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
