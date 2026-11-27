import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Coins, 
  Check, 
  FileSpreadsheet, 
  X,
  AlertCircle 
} from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function WorkersView({ workers, company, onAddWorker, onSelectWorkerForAudit }) {
  const [filterForm, setFilterForm] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkerDetail, setSelectedWorkerDetail] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New worker form state
  const [newNombre, setNewNombre] = useState('');
  const [newCedula, setNewCedula] = useState('');
  const [newCargo, setNewCargo] = useState('');
  const [newArea, setNewArea] = useState('Clínica');
  const [newFormType, setNewFormType] = useState('B');
  const [newGenero, setNewGenero] = useState('F');

  const filteredWorkers = workers.filter(w => {
    const matchForm = filterForm === 'ALL' || w.formType === filterForm;
    const matchSearch = w.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        w.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        w.cedula.includes(searchTerm);
    return matchForm && matchSearch;
  });

  const handleCreateWorker = (e) => {
    e.preventDefault();
    if (!newNombre || !newCedula || !newCargo) {
      alert('Por favor complete nombre, cédula y cargo.');
      return;
    }
    if (company.saldoCreditosSaaS.creditosDisponibles <= 0) {
      alert('No cuenta con créditos suficientes para tabular una nueva evaluación. Por favor recargue su bolsa de créditos.');
      return;
    }

    const newWorker = {
      id: `${newFormType}${workers.length + 1}`,
      codigo: `${newFormType}-0${workers.length + 1}`,
      nombre: newNombre,
      cedula: newCedula,
      formType: newFormType,
      cargo: newCargo,
      area: newArea,
      genero: newGenero,
      edad: 30,
      antiguedad: '1 a 2 años',
      nivelEscolaridad: newFormType === 'A' ? 'Profesional Completo' : 'Técnico/ Tecnológico Completo',
      estadoCivil: 'Soltera',
      estrato: 3,
      tipoContrato: 'Término Indefinido',
      horasDia: 8,
      scores: {
        intraBruto: newFormType === 'A' ? 170 : 135,
        intraTrans: newFormType === 'A' ? 34.5 : 34.8,
        intraNivel: newFormType === 'A' ? 'Medio' : 'Alto',
        dominios: {
          liderazgo: { bruto: 35, trans: 25.0, nivel: 'Medio' },
          control: { bruto: 25, trans: 32.0, nivel: 'Bajo' },
          demandas: { bruto: 85, trans: 42.5, nivel: 'Alto' },
          recompensas: { bruto: 14, trans: 31.8, nivel: 'Bajo' }
        },
        extraBruto: 35,
        extraTrans: 28.2,
        extraNivel: 'Medio',
        consolidadoTrans: 33.2,
        consolidadoNivel: 'Medio',
        estresTrans: 40.5,
        estresNivel: 'Medio'
      }
    };

    onAddWorker(newWorker);
    setIsAddModalOpen(false);
    setNewNombre('');
    setNewCedula('');
    setNewCargo('');
  };

  return (
    <div className="space-y-6">
      {/* Top action & filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Registro de Colaboradores Evaluados
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {workers.length} participantes tabulados (Población mixta Forma A y Forma B)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Form filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterForm('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all ${filterForm === 'ALL' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'}`}
            >
              Todos ({workers.length})
            </button>
            <button
              onClick={() => setFilterForm('A')}
              className={`px-2.5 py-1 rounded-md transition-all ${filterForm === 'A' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'text-slate-600'}`}
            >
              Forma A (3)
            </button>
            <button
              onClick={() => setFilterForm('B')}
              className={`px-2.5 py-1 rounded-md transition-all ${filterForm === 'B' ? 'bg-indigo-600 text-white shadow-sm font-bold' : 'text-slate-600'}`}
            >
              Forma B (4)
            </button>
          </div>

          {/* Add Worker Button (Consumes 1 Credit) */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Ingresar Colaborador (-1 Crédito)
          </button>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Código / ID</th>
                <th className="py-3 px-4 font-bold">Colaborador</th>
                <th className="py-3 px-4 font-bold">Cargo & Área</th>
                <th className="py-3 px-4 font-bold text-center">Instrumento</th>
                <th className="py-3 px-4 font-bold text-center">Riesgo Intralaboral</th>
                <th className="py-3 px-4 font-bold text-center">Riesgo Extralaboral</th>
                <th className="py-3 px-4 font-bold text-center">Nivel Estrés</th>
                <th className="py-3 px-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {w.codigo}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{w.nombre}</span>
                    <span className="text-[11px] text-slate-500 font-mono">C.C. {w.cedula} • {w.genero === 'F' ? 'Femenino' : 'Masculino'}, {w.edad} años</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800 block">{w.cargo}</span>
                    <span className="text-[11px] text-slate-500">{w.area}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      w.formType === 'A' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      FORMA {w.formType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <RiskBadge level={w.scores.intraNivel} />
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{w.scores.intraTrans}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <RiskBadge level={w.scores.extraNivel} />
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{w.scores.extraTrans}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <RiskBadge level={w.scores.estresNivel} />
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{w.scores.estresTrans}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedWorkerDetail(w)}
                        className="p-1.5 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900 transition-colors"
                        title="Ver detalle del trabajador"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSelectWorkerForAudit(w.id)}
                        className="text-[10px] bg-slate-100 hover:bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded border border-indigo-200 transition-colors"
                      >
                        Auditar Baremos
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Worker Detail */}
      {selectedWorkerDetail && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedWorkerDetail.formType === 'A' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  CUESTIONARIO FORMA {selectedWorkerDetail.formType}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedWorkerDetail.nombre}</h3>
                <p className="text-xs text-slate-500">
                  {selectedWorkerDetail.cargo} • {selectedWorkerDetail.area} (C.C. {selectedWorkerDetail.cedula})
                </p>
              </div>
              <button
                onClick={() => setSelectedWorkerDetail(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Intralaboral</span>
                <RiskBadge level={selectedWorkerDetail.scores.intraNivel} />
                <span className="text-xs font-mono font-bold block mt-1">{selectedWorkerDetail.scores.intraTrans}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Extralaboral</span>
                <RiskBadge level={selectedWorkerDetail.scores.extraNivel} />
                <span className="text-xs font-mono font-bold block mt-1">{selectedWorkerDetail.scores.extraTrans}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Consolidado</span>
                <RiskBadge level={selectedWorkerDetail.scores.consolidadoNivel} />
                <span className="text-xs font-mono font-bold block mt-1">{selectedWorkerDetail.scores.consolidadoTrans}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Estrés</span>
                <RiskBadge level={selectedWorkerDetail.scores.estresNivel} />
                <span className="text-xs font-mono font-bold block mt-1">{selectedWorkerDetail.scores.estresTrans}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Desglose por Dominios Intralaborales
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(selectedWorkerDetail.scores.dominios).map(([domKey, domVal]) => (
                  <div key={domKey} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-800 capitalize block">
                        Dominio {domKey}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        P.Bruto: {domVal.bruto} • Trans: {domVal.trans}%
                      </span>
                    </div>
                    <RiskBadge level={domVal.nivel} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  const id = selectedWorkerDetail.id;
                  setSelectedWorkerDetail(null);
                  onSelectWorkerForAudit(id);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Abrir en Auditor de Fórmulas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Worker (Demonstrates SaaS Credit Consumption) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateWorker} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Ingreso / Tabulación de Nuevo Colaborador
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md mt-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>Esta acción descontará <strong>1 crédito</strong> de su saldo.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Laura Marcela Pérez"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cédula</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1025841029"
                    value={newCedula}
                    onChange={(e) => setNewCedula(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Género</label>
                  <select
                    value={newGenero}
                    onChange={(e) => setNewGenero(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cargo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Médico Veterinario Anestesiólogo"
                  value={newCargo}
                  onChange={(e) => setNewCargo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Área</label>
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Instrumento Normativo</label>
                  <select
                    value={newFormType}
                    onChange={(e) => setNewFormType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                  >
                    <option value="A">FORMA A (Jefatura / Profesional)</option>
                    <option value="B">FORMA B (Auxiliar / Operario)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
              >
                <Check className="w-4 h-4" />
                Tabular & Calificar (-1 Crédito)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
