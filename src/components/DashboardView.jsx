import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  HeartHandshake, 
  Briefcase, 
  Home, 
  Flame, 
  ArrowUpRight, 
  FileDown, 
  CalendarClock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { COMPANY_SUMMARY_STATS } from '../data/mockData';

export default function DashboardView({ company, workers, onNavigateTab }) {
  const stats = company.stats || COMPANY_SUMMARY_STATS;


  return (
    <div className="space-y-6">
      {/* Welcome & Alert Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              Diagnóstico Consolidado Vigencia 2026
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {company.nombre}
            </h2>
            <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
              Población Mixta: <strong>{stats.totalParticipantes} trabajadores evaluados</strong> (3 Jefes/Profesionales Forma A + 4 Auxiliares/Operarios Forma B). Baremos contrastados contra la muestra normativa Javeriana / Ministerio del Trabajo.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3 md:max-w-xs">
            <CalendarClock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300 block">Periodicidad Obligatoria:</span>
              <p className="text-slate-300 mt-0.5">
                Por registrar niveles <strong className="text-amber-300">ALTO y MUY ALTO</strong>, la norma exige intervención PVE y reevaluación con periodicidad <strong className="text-white underline">ANUAL</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Risk Semaphores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Intralaboral Forma A */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <RiskBadge level={stats.factorIntralaboralGlobal.formaA} size="lg" />
          </div>
          <h3 className="text-xs font-medium text-slate-500 mt-3">Intralaboral Forma A (Jefes/Prof.)</h3>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">3 Participantes</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Demanda mental y de responsabilidad crítica.
          </p>
        </div>

        {/* Intralaboral Forma B */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-orange-50 rounded-lg text-orange-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <RiskBadge level={stats.factorIntralaboralGlobal.formaB} size="lg" />
          </div>
          <h3 className="text-xs font-medium text-slate-500 mt-3">Intralaboral Forma B (Auxiliares)</h3>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">4 Participantes</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Sobrecarga cuantitativa, jornada y bajo control.
          </p>
        </div>

        {/* Extralaboral */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
              <Home className="w-5 h-5" />
            </div>
            <RiskBadge level={stats.factorExtralaboralGlobal} size="lg" />
          </div>
          <h3 className="text-xs font-medium text-slate-500 mt-3">Factor Extralaboral Global</h3>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">Nivel Alto</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Afectación en tiempo fuera del trabajo y descanso.
          </p>
        </div>

        {/* Estrés */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-red-50 rounded-lg text-red-600">
              <Flame className="w-5 h-5" />
            </div>
            <RiskBadge level={stats.estresGlobal} size="lg" />
          </div>
          <h3 className="text-xs font-medium text-slate-500 mt-3">Cuestionario de Estrés Global</h3>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">Nivel Alto (PVE)</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Síntomas de tensión muscular, cefaleas y sobrecarga.
          </p>
        </div>
      </div>

      {/* Main Analysis: Dominios Forma A vs Forma B */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Evaluación por Dominios Intralaborales (Forma A vs. Forma B)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparativo de los 4 grandes dominios normativos definidos por el Ministerio de Protección Social
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('auditor')}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Ver fórmulas en el Auditor <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Dominio Intralaboral</th>
                <th className="py-3 px-4 font-bold text-center">Nivel Forma A (Jefatura/Prof.)</th>
                <th className="py-3 px-4 font-bold text-center">Nivel Forma B (Auxiliares/Oper.)</th>
                <th className="py-3 px-4 font-bold">Estado de Criticidad</th>
                <th className="py-3 px-4 font-bold">Acción Sugerida en SG-SST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.dominios.map((dom, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {dom.nombre}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <RiskBadge level={dom.formaA} />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <RiskBadge level={dom.formaB} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 font-medium ${
                      dom.alerta.includes('Crítico') ? 'text-red-600 font-bold' : 'text-slate-600'
                    }`}>
                      {dom.alerta.includes('Crítico') && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                      {dom.alerta}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    {dom.nombre.includes('Demandas') && 'Prioridad 1: Redistribución de turnos, pausas activas y soporte emocional en clínica.'}
                    {dom.nombre.includes('Control') && 'Prioridad 2: Otorgar mayor margen de maniobra en tareas y capacitación técnica.'}
                    {dom.nombre.includes('Liderazgo') && 'Monitoreo: Talleres de comunicación asertiva y retroalimentación de desempeño.'}
                    {dom.nombre.includes('Recompensas') && 'Mantenimiento: Esquemas de reconocimiento no salarial y sentido de pertenencia.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Dimensiones Críticas vs Factores Protectores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Dimensions */}
        <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Dimensiones de Mayor Riesgo (Priorización PVE)
              </h3>
            </div>
            <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
              Atención Inmediata
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Dimensiones que se ubican en niveles <strong>ALTO y MUY ALTO</strong> según los baremos y que deben ser el foco del plan de intervención:
          </p>

          <div className="space-y-2.5">
            {stats.dimensionesCriticas.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-red-50/50 rounded-lg border border-red-100">
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">{item.dimension}</span>
                  <span className="text-[10px] text-slate-500">{item.dominio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">A:</span>
                  <RiskBadge level={item.nivelA} size="sm" showDot={false} />
                  <span className="text-[10px] text-slate-500 ml-1">B:</span>
                  <RiskBadge level={item.nivelB} size="sm" showDot={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protective Dimensions */}
        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Factores Protectores Identificados
              </h3>
            </div>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Puntos Fuertes
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Aspectos de la organización y el entorno que mitigan el impacto de las demandas laborales y deben conservarse:
          </p>

          <div className="space-y-2.5">
            {stats.dimensionesProtectoras.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100">
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">{item.dimension}</span>
                  <span className="text-[10px] text-emerald-700">Fortaleza Organizacional</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">A:</span>
                  <RiskBadge level={item.formaA} size="sm" showDot={false} />
                  <span className="text-[10px] text-slate-500 ml-1">B:</span>
                  <RiskBadge level={item.formaB} size="sm" showDot={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Bar for Reports */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">¿Listo para exportar los informes reglamentarios?</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            El sistema genera automáticamente el <strong>Informe Técnico General</strong> (para el SG-SST) y el <strong>Informe Gerencial Ejecutivo</strong> (para la Dirección).
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('reports')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Ver Informes Oficiales
          </button>
        </div>
      </div>
    </div>
  );
}
