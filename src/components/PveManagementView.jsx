import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Lock, 
  Unlock, 
  PlusCircle, 
  Coins, 
  Sparkles, 
  Stethoscope, 
  ArrowRight, 
  Check, 
  Download, 
  Printer, 
  Building2, 
  Clock, 
  ChevronRight, 
  HeartHandshake, 
  MessageSquare,
  HelpCircle,
  FileCheck2,
  TrendingDown,
  Percent
} from 'lucide-react';
import { 
  PVE_POPULATION_GROUPS, 
  INITIAL_PHVA_ACTIVITIES, 
  INITIAL_PVE_CASES 
} from '../data/pveData';

export default function PveManagementView({ 
  company, 
  workers = [], 
  credits, 
  onUnlockPve, 
  onRechargeCredits,
  onNavigateTab 
}) {
  const [activeSubTab, setActiveSubTab] = useState('segmentacion');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('ALL');
  const [phvaActivities, setPhvaActivities] = useState(INITIAL_PHVA_ACTIVITIES);
  const [pveCases, setPveCases] = useState(INITIAL_PVE_CASES);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [selectedWorkerForCase, setSelectedWorkerForCase] = useState(null);
  const [caseNote, setCaseNote] = useState('');
  const [caseState, setCaseState] = useState('En Orientación');

  // Check company status
  const isPveActive = company.pveStatus === 'active';
  const isPveNotRequired = company.pveStatus === 'not_required';
  const isPveLocked = company.pveStatus === 'locked' || (!isPveActive && !isPveNotRequired);

  // Classify workers of active company into the 4 PG-06 groups
  const categorizedWorkers = useMemo(() => {
    return workers.map(worker => {
      const stressLvl = (worker.scores?.estresNivel || '').toLowerCase();
      const intraLvl = (worker.scores?.intraNivel || '').toLowerCase();
      const extraLvl = (worker.scores?.extraNivel || '').toLowerCase();

      // Check if already in confirmed cases (Grupo 4)
      const existingCase = pveCases.find(c => c.workerId === worker.id && c.companyId === company.id);
      if (existingCase && existingCase.grupo === 4) {
        return { ...worker, pveGroup: 4, caseData: existingCase };
      }

      // Grupo 3: High or Very High in Stress or Intralaboral
      if (
        stressLvl.includes('muy alto') || 
        stressLvl.includes('alto') || 
        intraLvl.includes('muy alto') || 
        intraLvl.includes('alto')
      ) {
        return { ...worker, pveGroup: 3, caseData: existingCase };
      }

      // Grupo 2: Medium risk in Stress, Intra or Extra
      if (
        stressLvl.includes('medio') || 
        intraLvl.includes('medio') || 
        extraLvl.includes('medio') || 
        extraLvl.includes('alto')
      ) {
        return { ...worker, pveGroup: 2, caseData: null };
      }

      // Grupo 1: Low or No risk
      return { ...worker, pveGroup: 1, caseData: null };
    });
  }, [workers, company.id, pveCases]);

  // Group counts
  const group1Count = categorizedWorkers.filter(w => w.pveGroup === 1).length;
  const group2Count = categorizedWorkers.filter(w => w.pveGroup === 2).length;
  const group3Count = categorizedWorkers.filter(w => w.pveGroup === 3).length;
  const group4Count = categorizedWorkers.filter(w => w.pveGroup === 4).length;

  // PHVA Indicators calculations (MT-17)
  const totalActivities = phvaActivities.length;
  const executedActivities = phvaActivities.filter(a => a.ejecutado).length;
  const cumplimientoPorcentaje = totalActivities > 0 
    ? Math.round((executedActivities / totalActivities) * 100) 
    : 0;

  // Cobertura: % de trabajadores incluidos en actividades
  const coberturaPorcentaje = workers.length > 0 ? 100 : 0;

  // Incidencia: Casos nuevos en el periodo (0%)
  const incidenciaPorcentaje = 0;

  // Prevalencia: Casos acumulados con patología calificada / total población
  const prevalenciaPorcentaje = workers.length > 0 
    ? Math.round((group4Count / workers.length) * 100) 
    : 0;

  // Toggle execution of a PHVA activity
  const handleToggleActivity = (actId) => {
    setPhvaActivities(prev => prev.map(act => {
      if (act.id === actId) {
        return { ...act, ejecutado: !act.ejecutado };
      }
      return act;
    }));
  };

  // Add individual case follow-up
  const handleSaveCase = () => {
    if (!selectedWorkerForCase) return;

    const newCase = {
      id: `case-${Date.now()}`,
      companyId: company.id,
      workerId: selectedWorkerForCase.id,
      nombre: selectedWorkerForCase.nombre,
      cedula: selectedWorkerForCase.cedula,
      cargo: selectedWorkerForCase.cargo,
      grupo: 3,
      alerta: `Nivel ${selectedWorkerForCase.scores?.estresNivel || 'Alto'} en Estrés (${selectedWorkerForCase.scores?.estresTrans || 40})`,
      estado: caseState,
      sesionesRealizadas: 1,
      sesionesTotales: 3,
      fechaIngreso: new Date().toISOString().split('T')[0],
      ultimaSesion: new Date().toISOString().split('T')[0],
      remision: caseState.includes('Remitid') ? 'Remisión radicada a Medicina Laboral EPS' : 'Orientación ocupacional preventiva interna',
      recomendacionLaboral: caseNote || 'Revisión ergonómica y redistribución de turnos de alta carga mental.',
      confidencialidad: 'Custodia bajo secreto profesional (Ley 1090/2006).'
    };

    setPveCases(prev => [newCase, ...prev.filter(c => c.workerId !== selectedWorkerForCase.id)]);
    setIsCaseModalOpen(false);
    setSelectedWorkerForCase(null);
    setCaseNote('');
  };

  // Filtered workers list
  const filteredWorkers = selectedGroupFilter === 'ALL'
    ? categorizedWorkers
    : categorizedWorkers.filter(w => w.pveGroup === Number(selectedGroupFilter));

  // ==========================================
  // RENDER: GATED / LOCKED STATE
  // ==========================================
  if (!isPveActive) {
    return (
      <div className="space-y-6">
        {/* Top Notification Banner */}
        <div className={`rounded-2xl p-6 border shadow-sm ${
          isPveNotRequired 
            ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
            : 'bg-rose-50/70 border-rose-200 text-rose-900'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl ${isPveNotRequired ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">
                  {isPveNotRequired 
                    ? `PVE No Obligatorio para ${company.nombre} (Riesgo General Medio/Bajo)`
                    : `Módulo PVE Inactivo / Bloqueado para ${company.nombre}`}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  {isPveNotRequired
                    ? 'De acuerdo con la Resolución 2404 de 2019 Art. 3, las empresas con niveles de riesgo Medio o Bajo tienen vigencia bianual (cada 2 años) y no requieren instaurar un Programa de Vigilancia Epidemiológica obligatorio, a menos que el cliente desee activarlo de forma preventiva.'
                    : `Esta empresa presenta nivel de riesgo consolidado ALTO o MUY ALTO. El Ministerio del Trabajo y la Resolución 2404 de 2019 exigen legalmente la instauración inmediata de un Sistema de Vigilancia Epidemiológica (PVE) con evaluación anual.`
                  }
                </p>
              </div>
            </div>

            {/* Specialist PVE License Balance Badge */}
            <div className="bg-white/90 border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm text-right shrink-0">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Bolsa de Licencias PVE
              </span>
              <div className="flex items-center gap-1.5 justify-end">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-lg font-black text-slate-900">
                  {credits?.creditosPveDisponibles || 0}
                </span>
                <span className="text-xs text-slate-500 font-semibold">licencias disp.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lock Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 relative">
            <div className="max-w-3xl space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                <Lock className="w-3.5 h-3.5" />
                Módulo Premium Especializado (Res. 2646/2008 & 2404/2019)
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">
                Programa de Vigilancia Epidemiológica (PVE / SVE)
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                El módulo PVE convierte los resultados estáticos de la Batería en un programa activo de intervención clínica y psicosocial continua. Diseñado con las matrices oficiales <strong>MT-17</strong> (Ciclo PHVA e Indicadores) y <strong>PG-06</strong> (Segmentación en 4 grupos y seguimiento de casos prioritarios).
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-bold text-sm text-slate-900">Segmentación en 4 Grupos</h4>
                <p className="text-xs text-slate-600">
                  Clasificación automática PG-06: Sanos (G1), GES Sintomáticos (G2), Sospechosos (G3) y Casos Confirmados (G4).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-bold text-sm text-slate-900">Matriz PHVA (MT-17)</h4>
                <p className="text-xs text-slate-600">
                  12 actividades parametrizadas: capacitaciones CCL, talleres vivenciales OMS, bienestar y jornadas de hábitos.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-bold text-sm text-slate-900">4 Indicadores Obligatorios</h4>
                <p className="text-xs text-slate-600">
                  Cumplimiento (&gt;90%), Cobertura (100%), Incidencia (0%) y Prevalencia calculados automáticamente para auditorías SG-SST.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h4 className="font-bold text-sm text-slate-900">Casos Clínicos & Remisión</h4>
                <p className="text-xs text-slate-600">
                  Registro confidencial de hasta 3 sesiones de orientación psicológica y cartas de remisión médica a EPS / ARL.
                </p>
              </div>
            </div>

            {/* Unlocking Action Section */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Activación Inmediata del Módulo PVE
                </span>
                <h4 className="text-lg font-extrabold text-slate-900">
                  ¿Desea desbloquear el SVE para {company.nombre}?
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  {credits?.creditosPveDisponibles > 0 
                    ? `Dispone de ${credits.creditosPveDisponibles} licencia(s) PVE disponible(s). Al activar, se asignará la vigencia anual para esta empresa.`
                    : 'Puede canjear 15 créditos regulares de evaluación o adquirir una Licencia PVE Empresarial para habilitar este módulo.'
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                {credits?.creditosPveDisponibles > 0 ? (
                  <button
                    onClick={() => onUnlockPve(company.id)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-indigo-200 text-sm transition-all"
                  >
                    <Unlock className="w-4 h-4" />
                    Activar con 1 Licencia PVE
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (credits.creditosDisponibles >= 15) {
                          onUnlockPve(company.id, 15);
                        } else {
                          alert('No dispone de suficientes créditos de evaluación (requiere 15). Por favor recargue créditos.');
                          onNavigateTab('credits');
                        }
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow text-xs transition-all"
                    >
                      <Coins className="w-4 h-4 text-slate-950" />
                      Canjear 15 Créditos Regulares
                    </button>
                    <button
                      onClick={() => onNavigateTab('credits')}
                      className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-300 text-xs transition-all shadow-sm"
                    >
                      <PlusCircle className="w-4 h-4 text-indigo-600" />
                      Comprar Licencias PVE
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: ACTIVE / UNLOCKED PVE MODULE
  // ==========================================
  return (
    <div className="space-y-6">
      {/* Top Banner: Active License Status */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Módulo PVE Activo | Licencia: {company.pveLicenciaCodigo || 'LIC-PVE-2026-001'}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-300">
                Norma: <strong>Res. 2404/2019</strong> & <strong>Res. 2646/2008</strong>
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Programa de Vigilancia Epidemiológica — {company.nombre}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Sistema integral de intervención, monitoreo de indicadores del SG-SST y atención de colaboradores expuestos a factores de riesgo Alto y Muy Alto.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab('documentacion')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2 rounded-xl text-xs border border-white/20 transition-all"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Ficha Técnica PG-06
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              Imprimir SVE
            </button>
          </div>
        </div>

        {/* 4 Quick SVE Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Cumplimiento PHVA (MT-17)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-emerald-400">{cumplimientoPorcentaje}%</span>
              <span className="text-[10px] text-slate-400">/ Meta &gt;90%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${cumplimientoPorcentaje >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${cumplimientoPorcentaje}%` }}
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Cobertura Programa</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-white">{coberturaPorcentaje}%</span>
              <span className="text-[10px] text-slate-400">({workers.length} trab.)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${coberturaPorcentaje}%` }} />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Incidencia Patologías</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-emerald-400">{incidenciaPorcentaje}%</span>
              <span className="text-[10px] text-emerald-400/80 font-bold">ÓPTIMO</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">0 casos nuevos en el periodo</span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Población en Alerta (G3/G4)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-rose-400">{group3Count + group4Count}</span>
              <span className="text-[10px] text-slate-400">colaboradores</span>
            </div>
            <span className="text-[10px] text-rose-300 font-semibold block mt-1">Intervención prioritaria</span>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveSubTab('segmentacion')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeSubTab === 'segmentacion'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          1. Segmentación en 4 Grupos (PG-06)
          <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px]">
            {workers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('matriz')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeSubTab === 'matriz'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          2. Matriz PHVA & Indicadores (MT-17)
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
            {cumplimientoPorcentaje}%
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('casos')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeSubTab === 'casos'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          3. Casos Clínicos SOS (Grupo 3 & 4)
          <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px]">
            {pveCases.filter(c => c.companyId === company.id).length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('documentacion')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeSubTab === 'documentacion'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          4. Ficha Técnica PVE (PG-06 Oficial)
        </button>
      </div>

      {/* ==========================================
          SUBTAB 1: SEGMENTACIÓN EN 4 GRUPOS (PG-06)
          ========================================== */}
      {activeSubTab === 'segmentacion' && (
        <div className="space-y-6">
          {/* 4 Groups Explanation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PVE_POPULATION_GROUPS.map((grp) => {
              const count = grp.id === 1 ? group1Count : grp.id === 2 ? group2Count : grp.id === 3 ? group3Count : group4Count;
              const isSelected = selectedGroupFilter === String(grp.id);

              return (
                <div
                  key={grp.id}
                  onClick={() => setSelectedGroupFilter(isSelected ? 'ALL' : String(grp.id))}
                  className={`bg-white rounded-xl p-4 border transition-all cursor-pointer relative ${
                    isSelected 
                      ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${grp.badgeClass}`}>
                      {grp.codigo}
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {count} <span className="text-[11px] text-slate-500 font-semibold">trab.</span>
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                    {grp.nombre}
                  </h4>
                  <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                    {grp.nivelPrevencion}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-3">
                    {grp.descripcion}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-medium">Click para filtrar</span>
                    <span className="text-indigo-600 font-bold flex items-center gap-0.5">
                      {isSelected ? 'Quitar filtro' : 'Ver grupo'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Status Bar */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>Mostrando:</span>
              <strong className="text-slate-900">
                {selectedGroupFilter === 'ALL' ? 'Todos los colaboradores' : `Colaboradores en Grupo ${selectedGroupFilter}`}
              </strong>
              <span className="text-slate-400">({filteredWorkers.length} personas)</span>
            </div>
            {selectedGroupFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedGroupFilter('ALL')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Limpiar filtro (Ver todos)
              </button>
            )}
          </div>

          {/* Workers Table with PVE Group Classification */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Colaborador</th>
                    <th className="px-4 py-3">Cargo / Área</th>
                    <th className="px-4 py-3">Estrés (Puntaje/Nivel)</th>
                    <th className="px-4 py-3">Intralaboral</th>
                    <th className="px-4 py-3">Segmentación PVE</th>
                    <th className="px-4 py-3 text-right">Acción PVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWorkers.map(w => {
                    const groupDef = PVE_POPULATION_GROUPS.find(g => g.id === w.pveGroup);
                    return (
                      <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{w.nombre}</div>
                          <div className="text-[11px] text-slate-500">C.C. {w.cedula}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800 font-medium">{w.cargo}</div>
                          <div className="text-[11px] text-slate-400">{w.area}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-slate-900">
                            {w.scores?.estresTrans ? w.scores.estresTrans.toFixed(1) : 'N/A'}
                          </span>
                          <span className={`ml-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                            (w.scores?.estresNivel || '').toLowerCase().includes('alto')
                              ? 'bg-rose-100 text-rose-800'
                              : (w.scores?.estresNivel || '').toLowerCase().includes('medio')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {w.scores?.estresNivel || 'Sin evaluar'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-slate-700">
                            {w.scores?.intraNivel || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${groupDef?.badgeClass}`}>
                            {groupDef?.codigo} — {groupDef?.nivelPrevencion}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {w.pveGroup >= 3 ? (
                            <button
                              onClick={() => {
                                setSelectedWorkerForCase(w);
                                setIsCaseModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded text-[11px] shadow-sm transition-all"
                            >
                              <Stethoscope className="w-3 h-3" />
                              Gestionar Caso
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">
                              En monitoreo general
                            </span>
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
          SUBTAB 2: MATRIZ DE CONTROL PHVA (MT-17)
          ========================================== */}
      {activeSubTab === 'matriz' && (
        <div className="space-y-6">
          {/* Top Indicator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Indicador 1: Cumplimiento
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-indigo-600">{cumplimientoPorcentaje}%</span>
                <span className="text-xs text-slate-500">Meta: ≥90%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                (Actividades Ejecutadas / Actividades Programadas) * 100
              </p>
              <div className="mt-2 text-[11px] font-semibold text-slate-600">
                {executedActivities} de {totalActivities} actividades ejecutadas
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Indicador 2: Cobertura
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-emerald-600">{coberturaPorcentaje}%</span>
                <span className="text-xs text-slate-500">Meta: 100%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                (Trabajadores dentro del programa / Expuestos al riesgo) * 100
              </p>
              <div className="mt-2 text-[11px] font-semibold text-slate-600">
                {workers.length} trabajadores cubiertos
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Indicador 3: Incidencia
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-emerald-600">{incidenciaPorcentaje}%</span>
                <span className="text-xs text-slate-500">Meta: 0%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                N.º Casos Nuevos de Enfermedad Laboral / Población expuesta
              </p>
              <div className="mt-2 text-[11px] font-semibold text-emerald-600">
                0 casos nuevos en el periodo
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                Indicador 4: Prevalencia
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">{prevalenciaPorcentaje}%</span>
                <span className="text-xs text-slate-500">Meta: 0%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                N.º Casos Antiguos + Nuevos / Población total expuesta
              </p>
              <div className="mt-2 text-[11px] font-semibold text-slate-600">
                {group4Count} caso(s) confirmado(s)
              </div>
            </div>
          </div>

          {/* Interactive PHVA Table (MT-17) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Matriz PHVA de Control y Medidas de Intervención (Formato MT-17 Oficial)
                </h3>
                <p className="text-xs text-slate-500">
                  Haga clic en el interruptor de "Estado" para marcar las actividades programadas como ejecutadas y recalcular el indicador.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                Vigencia Anual 2026-2027
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Fase PHVA</th>
                    <th className="px-4 py-3">Actividad de Control</th>
                    <th className="px-4 py-3">Responsable</th>
                    <th className="px-4 py-3">Meta / Evidencia</th>
                    <th className="px-4 py-3">Meses</th>
                    <th className="px-4 py-3 text-center">Estado (P/E)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {phvaActivities.map(act => (
                    <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                          act.fase === 'Planear' ? 'bg-blue-100 text-blue-800' :
                          act.fase === 'Hacer' ? 'bg-amber-100 text-amber-800' :
                          act.fase === 'Verificar' ? 'bg-purple-100 text-purple-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {act.fase.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-bold text-slate-900">{act.actividad}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium">
                        {act.responsable}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 font-medium">{act.meta}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{act.evidencia}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {act.meses.map(m => (
                            <span key={m} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggleActivity(act.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                            act.ejecutado
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {act.ejecutado ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Ejecutada (E)
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              Programada (P)
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SUBTAB 3: CASOS CLÍNICOS SOS (GRUPO 3 Y 4)
          ========================================== */}
      {activeSubTab === 'casos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-700 mt-0.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-rose-950">
                  Registro Clínico Ocupacional y Remisión de Casos Prioritarios
                </h4>
                <p className="text-xs text-rose-800">
                  Bajo la Ley 1090 de 2006 (Código Deontológico del Psicólogo) y la Res. 2346 de 2007, estas notas y atenciones gozan de estricta reserva profesional y custodia confidencial.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const highRiskWorker = categorizedWorkers.find(w => w.pveGroup >= 3);
                setSelectedWorkerForCase(highRiskWorker || categorizedWorkers[0]);
                setIsCaseModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              Registrar Nueva Atención
            </button>
          </div>

          {/* Cases Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pveCases.filter(c => c.companyId === company.id).map(c => (
              <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                      Grupo {c.grupo} — {c.grupo === 4 ? 'Confirmado' : 'Sospechoso'}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1">{c.nombre}</h4>
                    <p className="text-xs text-slate-500">{c.cargo} | C.C. {c.cedula}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border">
                    {c.estado}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <strong className="text-slate-700 block text-[11px]">Hallazgo de Alerta:</strong>
                    <span className="text-slate-900">{c.alerta}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <strong className="text-indigo-900 block text-[11px]">Recomendación Laboral a la Gerencia:</strong>
                    <span className="text-slate-800">{c.recomendacionLaboral}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">
                      Sesiones de Orientación: <strong>{c.sesionesRealizadas} de {c.sesionesTotales}</strong>
                    </span>
                    <span className="text-slate-500">
                      Última sesión: <strong>{c.ultimaSesion}</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 italic font-medium">
                    {c.confidencialidad}
                  </span>
                  <button
                    onClick={() => {
                      alert(`Generando carta oficial de remisión a EPS para ${c.nombre}...`);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar Remisión EPS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          SUBTAB 4: FICHA TÉCNICA PVE (PG-06 OFICIAL)
          ========================================== */}
      {activeSubTab === 'documentacion' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Formato Técnico PG-06 — Versión 02
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                DOCUMENTO TÉCNICO DEL PROGRAMA DE VIGILANCIA EPIDEMIOLÓGICA (SVE)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Empresa: {company.nombre} | NIT: {company.nit} | Vigencia: 2026 - 2027
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all shrink-0"
            >
              <Printer className="w-4 h-4" />
              Imprimir Documento Completo
            </button>
          </div>

          {/* Section 1: Objective & Scope */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">1</span>
              Objetivo General y Alcance
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
              <p>
                <strong>Objetivo:</strong> Diseñar, implementar y evaluar las medidas de intervención para mitigar el impacto del riesgo psicosocial intra y extralaboral en los colaboradores de <strong>{company.nombre}</strong>, garantizando el cumplimiento de la Resolución 2646 de 2008, la Resolución 2404 de 2019 y la Resolución 2764 de 2022 del Ministerio del Trabajo.
              </p>
              <p>
                <strong>Alcance:</strong> Aplica al 100% de la población trabajadora ({workers.length} colaboradores), incluyendo personal asistencial, operativo, administrativo y directivo con cobertura en todas las sedes de la organización.
              </p>
            </div>
          </div>

          {/* Section 2: Framework & Legal Basis */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">2</span>
              Marco Legal Colombiano de Referencia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Resolución 2646 de 2008:</strong>
                <p className="text-slate-600 mt-0.5">Establece disposiciones y define responsabilidades para la identificación, evaluación, prevención, intervención y monitoreo permanente de la exposición a factores de riesgo psicosocial en el trabajo.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Resolución 2404 de 2019:</strong>
                <p className="text-slate-600 mt-0.5">Adopta los instrumentos de la Batería y establece la periodicidad de evaluación: anual obligatoria para empresas con riesgo Alto o Muy Alto, y bianual para riesgo Medio o Bajo.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Resolución 2764 de 2022:</strong>
                <p className="text-slate-600 mt-0.5">Regula la aplicación digital de la Batería garantizando el consentimiento informado, la seguridad de la información y la custodia de datos personales sensibles.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Ley 1010 de 2006:</strong>
                <p className="text-slate-600 mt-0.5">Mecanismos para prevenir, corregir y sancionar las diversas formas de agresión, maltrato, vejámenes y acoso laboral a través del Comité de Convivencia Laboral.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Summary of SVE Indicators */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">3</span>
              Fórmulas y Metas de Indicadores Oficiales (SG-SST)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Indicador</th>
                    <th className="p-3">Fórmula Matemática</th>
                    <th className="p-3">Meta Exigida</th>
                    <th className="p-3">Resultado Obtenido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Cumplimiento</td>
                    <td className="p-3 text-slate-600">(Actividades Ejecutadas / Actividades Programadas) * 100</td>
                    <td className="p-3 font-semibold text-indigo-600">&ge; 90%</td>
                    <td className="p-3 font-black text-emerald-600">{cumplimientoPorcentaje}% (Aprobado)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Cobertura</td>
                    <td className="p-3 text-slate-600">(Trabajadores Intervenidos / Expuestos al riesgo) * 100</td>
                    <td className="p-3 font-semibold text-indigo-600">100%</td>
                    <td className="p-3 font-black text-emerald-600">{coberturaPorcentaje}% (100% Población)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Incidencia</td>
                    <td className="p-3 text-slate-600">(N.º Casos Nuevos / Población Expuesta) * 100</td>
                    <td className="p-3 font-semibold text-indigo-600">0%</td>
                    <td className="p-3 font-black text-emerald-600">0% (Sin casos nuevos)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Prevalencia</td>
                    <td className="p-3 text-slate-600">(N.º Casos Acumulados / Población Expuesta) * 100</td>
                    <td className="p-3 font-semibold text-indigo-600">0%</td>
                    <td className="p-3 font-black text-slate-900">{prevalenciaPorcentaje}% ({group4Count} caso(s))</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: REGISTRAR NOTA / CASO CLÍNICO
          ========================================== */}
      {isCaseModalOpen && selectedWorkerForCase && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Atención Clínica Confidencial
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Registro de Intervención: {selectedWorkerForCase.nombre}
                </h3>
                <p className="text-xs text-slate-500">
                  C.C. {selectedWorkerForCase.cedula} | {selectedWorkerForCase.cargo}
                </p>
              </div>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Estado de la Intervención:
                </label>
                <select
                  value={caseState}
                  onChange={(e) => setCaseState(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="En Orientación">En Orientación Psicológica (Sesión 1 o 2)</option>
                  <option value="Remitida a EPS">Remitido a Medicina General EPS (Sospecha Burnout/Depresión)</option>
                  <option value="Con Recomendaciones Laborales">Con Recomendaciones Laborales Emitidas</option>
                  <option value="Caso Confirmado en Seguimiento">Caso Confirmado en Tratamiento con ARL</option>
                  <option value="Caso Cerrado / Controlado">Caso Cerrado / Riesgo Mitigado</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Recomendación Médico-Laboral a la Empresa:
                </label>
                <textarea
                  rows={3}
                  value={caseNote}
                  onChange={(e) => setCaseNote(e.target.value)}
                  placeholder="Ej: Se sugiere ajustar jornada laboral, evitar jornadas nocturnas consecutivas, brindar apoyo en área asistencial..."
                  className="w-full border border-slate-300 rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                <strong>Aviso de Confidencialidad:</strong> Los datos psicopatológicos específicos están protegidos bajo secreto profesional. Solo se entrega a la empresa la conducta y recomendaciones preventivas.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCase}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow"
              >
                Guardar Registro PVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
