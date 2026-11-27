import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Upload, 
  Download, 
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  Clock, 
  ShieldCheck, 
  Users, 
  Building2, 
  HelpCircle, 
  PlusCircle, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Search,
  Filter,
  Flame,
  ArrowRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { 
  CIE10_PSYCHOSOCIAL_CATALOG, 
  evaluateWorkerTriad 
} from '../data/triadaData';

export default function TriadaEpidemiologicaView({ 
  company, 
  workers = [], 
  ausentismoRecords = [], 
  incapacidadesRecords = [], 
  onAddAusentismo, 
  onAddIncapacidad,
  onBatchImportAusentismo,
  onBatchImportIncapacidades,
  onNavigateTab
}) {
  const [activeTab, setActiveTab] = useState('matriz'); // 'matriz' | 'ausentismo' | 'incapacidades'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualRecordType, setManualRecordType] = useState('incapacidad'); // 'incapacidad' | 'ausentismo'

  // Manual Form States
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualDays, setManualDays] = useState(2);
  const [manualHours, setManualHours] = useState(16);
  const [manualReason, setManualReason] = useState('');
  const [manualCie10, setManualCie10] = useState('F41.2');
  const [manualOrigin, setManualOrigin] = useState('Enfermedad General');
  const [manualProrroga, setManualProrroga] = useState('NO');

  // Filter records for active company
  const companyAusentismo = useMemo(() => {
    return ausentismoRecords.filter(r => r.companyId === company.id);
  }, [ausentismoRecords, company.id]);

  const companyIncapacidades = useMemo(() => {
    return incapacidadesRecords.filter(r => r.companyId === company.id);
  }, [incapacidadesRecords, company.id]);

  // Evaluate Triad for every worker in the active company
  const analyzedWorkers = useMemo(() => {
    return workers.map(worker => {
      const evaluation = evaluateWorkerTriad(worker, companyAusentismo, companyIncapacidades);
      return {
        ...worker,
        triad: evaluation
      };
    });
  }, [workers, companyAusentismo, companyIncapacidades]);

  // Summary Metrics
  const totalDiasAusentismo = companyAusentismo.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const totalDiasIncapacidad = companyIncapacidades.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const totalDiasPerdidos = totalDiasAusentismo + totalDiasIncapacidad;

  const criticalTriadWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'CRITICA');
  const somaticAlertWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'ALERTA_SOMATICA');
  const latentRiskWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'RIESGO_LATENTE');
  const controlledWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'CONTROLADA' || w.triad.triadStatus === 'OBSERVACION_MEDICA');

  // Handle Excel upload for Ausentismo
  const handleUploadAusentismo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

        const imported = data.map((row, idx) => ({
          id: `aus-imp-${Date.now()}-${idx}`,
          companyId: company.id,
          cedula: String(row.CEDULA || row.cedula || row.Cedula || '').trim(),
          nombre: String(row.NOMBRE_TRABAJADOR || row.NOMBRE || row.nombre || 'Colaborador'),
          area: String(row.AREA_SEDE || row.AREA || row.area || 'Operaciones'),
          cargo: String(row.CARGO || row.cargo || 'Cargo'),
          fecha: String(row.FECHA_AUSENCIA || row.FECHA || new Date().toISOString().split('T')[0]),
          dias: Number(row.DIAS_AUSENCIA || row.DIAS || 1),
          horas: Number(row.HORAS_AUSENCIA || row.HORAS || 8),
          tipo: String(row.TIPO_AUSENCIA || row.TIPO || 'Permiso Personal'),
          motivo: String(row.MOTIVO_OBSERVACION || row.MOTIVO || 'Cargado vía Excel')
        })).filter(r => r.cedula);

        if (imported.length > 0) {
          onBatchImportAusentismo(imported);
          alert(`¡Éxito! Se importaron ${imported.length} registros de ausentismo para ${company.nombre}.`);
        } else {
          alert('No se detectaron registros válidos. Verifique que la columna "CEDULA" esté presente.');
        }
      } catch (err) {
        console.error(err);
        alert('Error al leer el archivo Excel de ausentismo: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  // Handle Excel upload for Incapacidades
  const handleUploadIncapacidades = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

        const imported = data.map((row, idx) => {
          const cieCode = String(row.CODIGO_CIE10 || row.CIE10 || row.cie10 || '').toUpperCase().trim();
          const isMental = cieCode.startsWith('F') || cieCode.startsWith('Z73');
          const isSomatic = cieCode.startsWith('G') || cieCode.startsWith('K') || cieCode.startsWith('M');

          return {
            id: `inc-imp-${Date.now()}-${idx}`,
            companyId: company.id,
            cedula: String(row.CEDULA || row.cedula || row.Cedula || '').trim(),
            nombre: String(row.NOMBRE_TRABAJADOR || row.NOMBRE || row.nombre || 'Colaborador'),
            area: String(row.AREA_SEDE || row.AREA || row.area || 'Operaciones'),
            cargo: String(row.CARGO || row.cargo || 'Cargo'),
            fechaInicio: String(row.FECHA_INICIO || row.FECHA || new Date().toISOString().split('T')[0]),
            fechaFin: String(row.FECHA_FIN || row.FECHA_INICIO || new Date().toISOString().split('T')[0]),
            dias: Number(row.DIAS_INCAPACIDAD || row.DIAS || 1),
            cie10: cieCode || 'F41.2',
            diagnostico: String(row.DIAGNOSTICO_CIE10 || row.DIAGNOSTICO || 'Diagnóstico médico reportado'),
            categoria: isMental ? 'Salud Mental' : isSomatic ? 'Somatización' : 'Enfermedad General Común',
            origen: String(row.ORIGEN || 'Enfermedad General'),
            prorroga: String(row.PRORROGA || 'NO').toUpperCase()
          };
        }).filter(r => r.cedula);

        if (imported.length > 0) {
          onBatchImportIncapacidades(imported);
          alert(`¡Éxito! Se importaron ${imported.length} registros de incapacidades médicas con CIE-10 para ${company.nombre}.`);
        } else {
          alert('No se detectaron registros válidos. Verifique que la columna "CEDULA" y "CODIGO_CIE10" estén presentes.');
        }
      } catch (err) {
        console.error(err);
        alert('Error al leer el archivo Excel de incapacidades: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  // Submit Manual Record
  const handleSaveManualRecord = (e) => {
    e.preventDefault();
    const targetWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];
    if (!targetWorker) {
      alert('Seleccione un trabajador válido');
      return;
    }

    if (manualRecordType === 'ausentismo') {
      const newAus = {
        id: `aus-man-${Date.now()}`,
        companyId: company.id,
        cedula: targetWorker.cedula,
        nombre: targetWorker.nombre,
        area: targetWorker.area,
        cargo: targetWorker.cargo,
        fecha: manualDate,
        dias: Number(manualDays),
        horas: Number(manualHours),
        tipo: 'Permiso / Calamidad',
        motivo: manualReason || 'Reporte manual de ausentismo'
      };
      onAddAusentismo(newAus);
      alert(`Ausentismo registrado para ${targetWorker.nombre}.`);
    } else {
      const catDef = CIE10_PSYCHOSOCIAL_CATALOG.find(c => c.codigo === manualCie10);
      const isMental = manualCie10.startsWith('F') || manualCie10.startsWith('Z73');
      const newInc = {
        id: `inc-man-${Date.now()}`,
        companyId: company.id,
        cedula: targetWorker.cedula,
        nombre: targetWorker.nombre,
        area: targetWorker.area,
        cargo: targetWorker.cargo,
        fechaInicio: manualDate,
        fechaFin: manualDate,
        dias: Number(manualDays),
        cie10: manualCie10,
        diagnostico: catDef?.diagnostico || manualReason || 'Diagnóstico médico reportado',
        categoria: isMental ? 'Salud Mental' : 'Somatización',
        origen: manualOrigin,
        prorroga: manualProrroga
      };
      onAddIncapacidad(newInc);
      alert(`Incapacidad médica (${manualCie10}) registrada para ${targetWorker.nombre}.`);
    }

    setIsManualModalOpen(false);
  };

  // Filtered workers list
  const filteredWorkers = analyzedWorkers.filter(w => {
    const matchesSearch = 
      w.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(w.cedula).includes(searchTerm) ||
      w.cargo.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'ALL') return true;
    return w.triad.triadStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Epidemiological Rationale */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                <Activity className="w-4 h-4 text-indigo-400" />
                Tríada Epidemiológica Ocupacional (PVE de Riesgo Psicosocial)
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-300">
                Sustento: <strong>Dec. 1072/2015 Art. 2.2.4.6.21</strong> & <strong>Res. 2404/2019</strong>
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Cruce Científico: Batería Psicosocial + Ausentismo + Incapacidades CIE-10
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              La evaluación de riesgo psicosocial por sí sola representa la <em>percepción subjetiva</em> del colaborador. Al contrastarla con los <strong>registros de ausentismo laboral</strong> y las <strong>incapacidades médicas (CIE-10 de Salud Mental y Somatización)</strong>, el Programa de Vigilancia Epidemiológica adquiere rigor científico, peso probatorio indiscutible y pertinencia legal ante el Ministerio del Trabajo y las ARL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedWorkerId(workers[0]?.id || '');
                setIsManualModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Registrar Novedad Manual
            </button>
          </div>
        </div>

        {/* 4 Quick Triad Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Total Días Perdidos</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-rose-400">{totalDiasPerdidos}</span>
              <span className="text-[10px] text-slate-400">días en el año</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {totalDiasAusentismo}d ausentismo + {totalDiasIncapacidad}d incapacidad
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Tríada Crítica (Positiva)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-purple-400">{criticalTriadWorkers.length}</span>
              <span className="text-[10px] text-slate-400">casos prioritarios</span>
            </div>
            <span className="text-[10px] text-purple-300 font-semibold block mt-0.5">
              Estrés Alto + CIE-10 Mental
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Alertas de Somatización</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-rose-400">{somaticAlertWorkers.length}</span>
              <span className="text-[10px] text-slate-400">colaboradores</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Gastritis / Cefalea / Espasmos
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Riesgo Perceptual Latente</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-amber-400">{latentRiskWorkers.length}</span>
              <span className="text-[10px] text-slate-400">sin quiebre biológico</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
              Foco Prevención Primaria
            </span>
          </div>
        </div>
      </div>

      {/* Upload and Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Ausentismo Laboral */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  1. Registro de Ausentismo Laboral
                </h4>
                <p className="text-xs text-slate-500">
                  Permisos personales, calamidad, ausencias injustificadas
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
              {companyAusentismo.length} registros
            </span>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <strong>Parámetro Normativo:</strong> Mide el impacto conductual de la sobrecarga y el clima laboral mediante el total de horas no laboradas reportadas por Talento Humano.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <a
              href="./PLANTILLA_REPORTE_AUSENTISMO.xlsx"
              download="PLANTILLA_REPORTE_AUSENTISMO.xlsx"
              className="flex-1 w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs transition-all border border-slate-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              Descargar Plantilla Excel
            </a>

            <label className="flex-1 w-full flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-sm cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              Subir Excel de Ausentismo
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleUploadAusentismo}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Card 2: Incapacidades Médicas CIE-10 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  2. Reporte de Incapacidades Médicas (CIE-10)
                </h4>
                <p className="text-xs text-slate-500">
                  Diagnósticos F (Salud Mental), G/K/M (Somatizaciones)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-200">
              {companyIncapacidades.length} registros
            </span>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <strong>Parámetro Clínico:</strong> Identifica morbilidad acumulada mediante diagnósticos CIE-10 de salud mental (F32, F41, F43, Z73) y alteraciones psicosomáticas (gastritis, migraña, dorsalgia).
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <a
              href="./PLANTILLA_REPORTE_INCAPACIDADES.xlsx"
              download="PLANTILLA_REPORTE_INCAPACIDADES.xlsx"
              className="flex-1 w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs transition-all border border-slate-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              Descargar Plantilla Excel
            </a>

            <label className="flex-1 w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-sm cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              Subir Excel Incapacidades
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleUploadIncapacidades}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Subtabs: Matriz de la Tríada vs. Listados Detallados */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('matriz')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'matriz'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          Matriz de Cruce y Semáforo de la Tríada ({analyzedWorkers.length} Colaboradores)
        </button>

        <button
          onClick={() => setActiveTab('ausentismo')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'ausentismo'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          Libro de Ausentismo ({companyAusentismo.length})
        </button>

        <button
          onClick={() => setActiveTab('incapacidades')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'incapacidades'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-rose-500" />
          Libro de Incapacidades CIE-10 ({companyIncapacidades.length})
        </button>
      </div>

      {/* ==========================================
          TAB 1: MATRIZ DE CRUCE DE LA TRÍADA
          ========================================== */}
      {activeTab === 'matriz' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, cédula o cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-600 font-semibold">Estado de Tríada:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="ALL">Todos los Estados ({analyzedWorkers.length})</option>
                <option value="CRITICA">Tríada Crítica Positiva ({criticalTriadWorkers.length})</option>
                <option value="ALERTA_SOMATICA">Alerta de Somatización ({somaticAlertWorkers.length})</option>
                <option value="RIESGO_LATENTE">Riesgo Perceptual Latente ({latentRiskWorkers.length})</option>
                <option value="CONTROLADA">Tríada Controlada ({controlledWorkers.length})</option>
              </select>
            </div>
          </div>

          {/* Triad Cross Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Colaborador / Área</th>
                    <th className="px-4 py-3">Pilar 1: Batería Psicosocial</th>
                    <th className="px-4 py-3">Pilar 2: Ausentismo</th>
                    <th className="px-4 py-3">Pilar 3: Incapacidades (CIE-10)</th>
                    <th className="px-4 py-3">Semáforo de la Tríada</th>
                    <th className="px-4 py-3">Dictamen Clínico / Acción PVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWorkers.map(w => {
                    const t = w.triad;
                    const estresNivel = w.scores?.estresNivel || 'Sin evaluar';
                    const intraNivel = w.scores?.intraNivel || 'Sin evaluar';

                    return (
                      <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{w.nombre}</div>
                          <div className="text-[11px] text-slate-500">C.C. {w.cedula}</div>
                          <div className="text-[10px] text-indigo-600 font-medium">{w.cargo}</div>
                        </td>

                        {/* Pilar 1: Batería */}
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-slate-500">Estrés:</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                estresNivel.toLowerCase().includes('alto')
                                  ? 'bg-rose-100 text-rose-800'
                                  : estresNivel.toLowerCase().includes('medio')
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {estresNivel} ({w.scores?.estresTrans ? w.scores.estresTrans.toFixed(1) : 'N/A'})
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-600">
                              Intralaboral: <strong>{intraNivel}</strong>
                            </div>
                          </div>
                        </td>

                        {/* Pilar 2: Ausentismo */}
                        <td className="px-4 py-3">
                          {t.totalDiasAus > 0 ? (
                            <div>
                              <div className="font-black text-amber-700 text-xs">
                                {t.totalDiasAus} día(s) ({t.totalHorasAus}h)
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {t.userAus.length} evento(s) reportado(s)
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px] font-medium">0 días (Asistencia regular)</span>
                          )}
                        </td>

                        {/* Pilar 3: Incapacidades CIE-10 */}
                        <td className="px-4 py-3">
                          {t.totalDiasInc > 0 ? (
                            <div className="space-y-1">
                              <div className="font-black text-rose-700 text-xs">
                                {t.totalDiasInc} día(s) acumulado(s)
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {t.userInc.map((inc, i) => (
                                  <span
                                    key={i}
                                    title={inc.diagnostico}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-black border ${
                                      inc.categoria === 'Salud Mental'
                                        ? 'bg-purple-100 text-purple-800 border-purple-300'
                                        : 'bg-rose-100 text-rose-800 border-rose-300'
                                    }`}
                                  >
                                    {inc.cie10}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px] font-medium">0 incapacidades registradas</span>
                          )}
                        </td>

                        {/* Semáforo de la Tríada */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                            t.triadStatus === 'CRITICA'
                              ? 'bg-purple-100 text-purple-900 border-purple-300 animate-pulse'
                              : t.triadStatus === 'ALERTA_SOMATICA'
                              ? 'bg-rose-100 text-rose-900 border-rose-300'
                              : t.triadStatus === 'RIESGO_LATENTE'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              t.triadStatus === 'CRITICA' ? 'bg-purple-600' :
                              t.triadStatus === 'ALERTA_SOMATICA' ? 'bg-rose-600' :
                              t.triadStatus === 'RIESGO_LATENTE' ? 'bg-amber-600' : 'bg-emerald-600'
                            }`} />
                            {t.badgeText}
                          </span>
                        </td>

                        {/* Dictamen Clínico / Acción PVE */}
                        <td className="px-4 py-3 max-w-xs">
                          <p className="text-[11px] text-slate-700 leading-snug">
                            {t.clinicalVerdict}
                          </p>
                          {t.triadStatus === 'CRITICA' && (
                            <button
                              onClick={() => onNavigateTab('pve')}
                              className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-700 hover:text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200"
                            >
                              Ver en Caso Clínico PVE <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: LIBRO DE AUSENTISMO DETALLADO
          ========================================== */}
      {activeTab === 'ausentismo' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Registro Consolidado de Ausentismo — {company.nombre}
            </h4>
            <span className="text-xs text-slate-500 font-semibold">
              Total Días: <strong className="text-amber-700">{totalDiasAusentismo} días</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Cédula</th>
                  <th className="px-4 py-3">Colaborador</th>
                  <th className="px-4 py-3">Área / Cargo</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Días / Horas</th>
                  <th className="px-4 py-3">Tipo de Ausencia</th>
                  <th className="px-4 py-3">Motivo Reportado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companyAusentismo.map(aus => (
                  <tr key={aus.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-slate-600">{aus.cedula}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{aus.nombre}</td>
                    <td className="px-4 py-3 text-slate-700">{aus.cargo} ({aus.area})</td>
                    <td className="px-4 py-3 text-slate-600">{aus.fecha}</td>
                    <td className="px-4 py-3 font-black text-amber-700">
                      {aus.dias} día(s) ({aus.horas}h)
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">
                        {aus.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs">{aus.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: LIBRO DE INCAPACIDADES CIE-10
          ========================================== */}
      {activeTab === 'incapacidades' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Registro de Incapacidades Médicas y Morbilidad (CIE-10) — {company.nombre}
            </h4>
            <span className="text-xs text-slate-500 font-semibold">
              Total Días: <strong className="text-rose-700">{totalDiasIncapacidad} días</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Cédula</th>
                  <th className="px-4 py-3">Colaborador</th>
                  <th className="px-4 py-3">Fecha Inicio / Fin</th>
                  <th className="px-4 py-3">Días</th>
                  <th className="px-4 py-3">CIE-10 & Diagnóstico</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Origen / Prórroga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companyIncapacidades.map(inc => (
                  <tr key={inc.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono text-slate-600">{inc.cedula}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{inc.nombre}</td>
                    <td className="px-4 py-3 text-slate-600">{inc.fechaInicio} a {inc.fechaFin}</td>
                    <td className="px-4 py-3 font-black text-rose-700">{inc.dias} día(s)</td>
                    <td className="px-4 py-3">
                      <div className="font-black text-slate-900">{inc.cie10}</div>
                      <div className="text-[11px] text-slate-600">{inc.diagnostico}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                        inc.categoria === 'Salud Mental'
                          ? 'bg-purple-100 text-purple-900 border-purple-200'
                          : 'bg-rose-100 text-rose-900 border-rose-200'
                      }`}>
                        {inc.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{inc.origen}</div>
                      <div className="text-[10px] text-slate-400">Prórroga: {inc.prorroga}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: REGISTRO MANUAL DE NOVEDAD
          ========================================== */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Alimentar Tríada Epidemiológica
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Registrar Novedad en {company.nombre}
                </h3>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveManualRecord} className="space-y-4 text-xs">
              {/* Type Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setManualRecordType('incapacidad')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    manualRecordType === 'incapacidad'
                      ? 'bg-white text-rose-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Incapacidad Médica (CIE-10)
                </button>
                <button
                  type="button"
                  onClick={() => setManualRecordType('ausentismo')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    manualRecordType === 'ausentismo'
                      ? 'bg-white text-amber-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ausentismo Laboral
                </button>
              </div>

              {/* Worker Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Seleccionar Colaborador:
                </label>
                <select
                  value={selectedWorkerId}
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.nombre} — C.C. {w.cedula} ({w.cargo})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Days */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Fecha del Evento:
                  </label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Días Totales:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={manualDays}
                    onChange={(e) => setManualDays(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Incapacity Fields */}
              {manualRecordType === 'incapacidad' ? (
                <>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Diagnóstico CIE-10 Asociado:
                    </label>
                    <select
                      value={manualCie10}
                      onChange={(e) => setManualCie10(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      {CIE10_PSYCHOSOCIAL_CATALOG.map(c => (
                        <option key={c.codigo} value={c.codigo}>
                          {c.codigo} — {c.diagnostico} ({c.categoria})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Origen:
                      </label>
                      <select
                        value={manualOrigin}
                        onChange={(e) => setManualOrigin(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Enfermedad General">Enfermedad General (EPS)</option>
                        <option value="Accidente de Trabajo">Accidente de Trabajo (ARL)</option>
                        <option value="Enfermedad Laboral">Enfermedad Laboral Calificada</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        ¿Es Prórroga?:
                      </label>
                      <select
                        value={manualProrroga}
                        onChange={(e) => setManualProrroga(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="NO">NO (Evento inicial)</option>
                        <option value="SI">SI (Prórroga acumulada)</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                /* Absenteeism Fields */
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Motivo / Observación del Ausentismo:
                  </label>
                  <textarea
                    rows={2}
                    value={manualReason}
                    onChange={(e) => setManualReason(e.target.value)}
                    placeholder="Ej: Ausencia no justificada tras jornada intensa, permiso personal..."
                    className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                >
                  Guardar Novedad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
