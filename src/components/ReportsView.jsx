import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
  DollarSign,
  Clock,
  Stethoscope,
  Activity,
  Check,
  ChevronRight,
  TrendingDown,
  Scale,
  Users,
  Briefcase
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { COMPANY_SUMMARY_STATS } from '../data/mockData';
import { evaluateWorkerTriad } from '../data/triadaData';

export default function ReportsView({ 
  company, 
  workers = [], 
  ausentismoRecords = [], 
  incapacidadesRecords = [] 
}) {
  const [reportType, setReportType] = useState('technical'); // 'technical' | 'executive'
  const stats = company.stats || COMPANY_SUMMARY_STATS;

  // Filter records for active company
  const companyAusentismo = useMemo(() => {
    return ausentismoRecords.filter(r => r.companyId === company.id);
  }, [ausentismoRecords, company.id]);

  const companyIncapacidades = useMemo(() => {
    return incapacidadesRecords.filter(r => r.companyId === company.id);
  }, [incapacidadesRecords, company.id]);

  // Evaluate Triad for active company
  const analyzedWorkers = useMemo(() => {
    return workers.map(w => ({
      ...w,
      triad: evaluateWorkerTriad(w, companyAusentismo, companyIncapacidades)
    }));
  }, [workers, companyAusentismo, companyIncapacidades]);

  // Aggregate stats
  const totalTrabajadores = workers.length || stats.totalParticipantes;
  const totalDiasAus = companyAusentismo.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const totalDiasInc = companyIncapacidades.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const totalDiasPerdidos = totalDiasAus + totalDiasInc;

  const criticalWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'CRITICA');
  const somaticWorkers = analyzedWorkers.filter(w => w.triad.triadStatus === 'ALERTA_SOMATICA');

  // Sociodemographic breakdowns
  const formaACount = workers.filter(w => w.formType === 'A').length || stats.participacionFormaA;
  const formaBCount = workers.filter(w => w.formType === 'B').length || stats.participacionFormaB;
  const femaleCount = workers.filter(w => (w.genero || '').toUpperCase() === 'F').length;
  const maleCount = workers.filter(w => (w.genero || '').toUpperCase() === 'M').length;

  const femalePct = totalTrabajadores > 0 ? Math.round((femaleCount / totalTrabajadores) * 100) : 57;
  const malePct = totalTrabajadores > 0 ? Math.round((maleCount / totalTrabajadores) * 100) : 43;

  const avgAge = workers.length > 0
    ? Math.round(workers.reduce((acc, w) => acc + (Number(w.edad) || 35), 0) / workers.length)
    : 38;

  // Estimated economic cost of lost workdays ($120.000 COP avg cost per day lost)
  const estimatedLostCostCop = totalDiasPerdidos * 120000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Report Switcher & Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Emisión de Informes Oficiales de Riesgo Psicosocial
            </h2>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-full">
              Res. 2404 de 2019
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Seleccione el formato requerido según la audiencia (Área de SST vs. Gerencia General)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Switcher Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => setReportType('technical')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                reportType === 'technical'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              1. Informe General (Para SST)
            </button>
            <button
              onClick={() => setReportType('executive')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                reportType === 'executive'
                  ? 'bg-white text-rose-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-rose-600" />
              2. Informe Gerencial (Decisiones)
            </button>
          </div>

          {/* Print/Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Guardar en PDF
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-14 max-w-4xl mx-auto text-slate-800 space-y-10 print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* ============================================================== */}
        {/* REPORT OFFICIAL HEADER & COVER BANNER                          */}
        {/* ============================================================== */}
        <div className="border-b-2 border-slate-900 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <span className={`text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md inline-block mb-2 ${
                reportType === 'technical'
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'bg-rose-100 text-rose-900'
              }`}>
                {reportType === 'technical' 
                  ? 'INFORME DE DIAGNÓSTICO TÉCNICO, PSICOMÉTRICO Y EPIDEMIOLÓGICO' 
                  : 'INFORME GERENCIAL EJECUTIVO & MATRIZ DE TOMA DE DECISIONES'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                EVALUACIÓN DE FACTORES DE RIESGO PSICOSOCIAL
              </h1>
              <p className="text-base font-extrabold text-slate-800 mt-1">
                {company.nombre}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 shrink-0">
              <span className="font-bold text-slate-900 block">Vigencia Oficial: 2026 - 2027</span>
              <span>Fecha de Aplicación: Noviembre de 2026</span>
              <span className="block mt-1 text-[11px] font-mono text-indigo-700 font-bold">
                Batería MinTrabajo / U. Javeriana
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Radicado: RAD-PSICO-2026-{company.id.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Quick Company Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">NIT de la Empresa</span>
              <span className="font-bold text-slate-900">{company.nit}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Clase de Riesgo SG-SST</span>
              <span className="font-bold text-slate-900">{company.claseRiesgo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Actividad Económica</span>
              <span className="font-bold text-slate-900 truncate block">{company.actividadEconomica}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Población Evaluada</span>
              <span className="font-bold text-indigo-700">{totalTrabajadores} Colaboradores (100%)</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DOCUMENT 1: INFORME TÉCNICO GENERAL (ÁREA DE SST & SOPORTE LEGAL) */}
        {/* ============================================================== */}
        {reportType === 'technical' && (
          <div className="space-y-8 text-xs leading-relaxed text-slate-700">
            
            {/* 1. Marco Legal */}
            <section className="space-y-2">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                1. MARCO LEGAL Y SUSTENTO NORMATIVO EN COLOMBIA
              </h3>
              <p className="text-justify">
                El presente informe técnico de diagnóstico psicométrico y epidemiológico ha sido elaborado en estricto cumplimiento de la legislación colombiana en Seguridad y Salud en el Trabajo (SG-SST):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">Resolución 2646 de 2008:</strong>
                  <span className="text-[11px] text-slate-600">Disposiciones y responsabilidades para la identificación, evaluación, prevención, intervención y monitoreo permanente del riesgo psicosocial.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">Resolución 2404 de 2019:</strong>
                  <span className="text-[11px] text-slate-600">Adopta formalmente la Batería del Ministerio del Trabajo e impone evaluación <strong>ANUAL obligatoria</strong> a empresas con riesgo Alto o Muy Alto.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">Resolución 2764 de 2022:</strong>
                  <span className="text-[11px] text-slate-600">Regula la aplicación digital estandarizada, consentimiento informado y protección estricta de datos sensibles bajo Habeas Data.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">Decreto 1072 de 2015 (SG-SST):</strong>
                  <span className="text-[11px] text-slate-600">Artículo 2.2.4.6.21 para la medición obligatoria de indicadores de ausentismo, morbilidad y vigilancia epidemiológica.</span>
                </div>
              </div>
            </section>

            {/* 2. Metodología Psicometría Oficial */}
            <section className="space-y-2">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                2. METODOLOGÍA Y CUESTIONARIOS OFICIALES APLICADOS
              </h3>
              <p className="text-justify">
                Para la captura de datos se aplicaron de forma rigurosa los 4 instrumentos estandarizados y validados por el Ministerio del Trabajo y la <strong>Pontificia Universidad Javeriana</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li><strong>Ficha de Datos Generales:</strong> Variables sociodemográficas y ocupacionales (edad, sexo, escolaridad, estrato, jornada, antigüedad).</li>
                <li><strong>Cuestionario de Factores de Riesgo Intralaboral:</strong> Forma A (123 ítems para personal con personal a cargo o profesional) y Forma B (97 ítems para auxiliares/operarios). Ponderado en 4 dominios y 19 dimensiones.</li>
                <li><strong>Cuestionario de Factores Extralaborales:</strong> 31 ítems distribuidos en 7 dimensiones (tiempo libre, familia, vivienda, traslado).</li>
                <li><strong>Cuestionario de Evaluación del Estrés (Tercera Versión):</strong> 31 síntomas ponderados fisiológicos, psicoemocionales y cognitivos (divisor oficial 61.16).</li>
              </ul>
            </section>

            {/* 3. Caracterización Sociodemográfica */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                3. CARACTERIZACIÓN SOCIODEMOGRÁFICA Y OCUPACIONAL DE LA MUESTRA
              </h3>
              <p>
                La evaluación alcanzó una <strong>cobertura del 100%</strong> de los colaboradores activos ({totalTrabajadores} participantes):
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Población Evaluada</span>
                  <span className="text-2xl font-black text-slate-900">{totalTrabajadores}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">100% Censo Activo</span>
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
                  <span className="text-[10px] text-purple-700 font-bold uppercase block">Forma A (Jefes/Prof.)</span>
                  <span className="text-2xl font-black text-purple-900">{formaACount}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {Math.round((formaACount / totalTrabajadores) * 100)}% de la muestra
                  </span>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">Forma B (Auxiliares)</span>
                  <span className="text-2xl font-black text-blue-900">{formaBCount}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {Math.round((formaBCount / totalTrabajadores) * 100)}% de la muestra
                  </span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                  <span className="text-[10px] text-amber-800 font-bold uppercase block">Edad Promedio</span>
                  <span className="text-2xl font-black text-amber-950">{avgAge} años</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{femalePct}% F / {malePct}% M</span>
                </div>
              </div>
            </section>

            {/* 4. Resultados Globales y Baremos */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                4. RESULTADOS PSICOMÉTRICOS GLOBALES CON BAREMOS OFICIALES
              </h3>
              <p>
                Los puntajes brutos obtenidos se transformaron a la escala normalizada (0 a 100) y se compararon contra las tablas de baremos oficiales de la Resolución 2404 de 2019:
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Componente Evaluado</th>
                      <th className="p-3 text-center">Población Forma A</th>
                      <th className="p-3 text-center">Población Forma B</th>
                      <th className="p-3 text-center">Nivel Consolidado</th>
                      <th className="p-3 text-center">Impacto en la Salud</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Factor Intralaboral Global</td>
                      <td className="p-3 text-center"><RiskBadge level={stats.factorIntralaboralGlobal.formaA} /></td>
                      <td className="p-3 text-center"><RiskBadge level={stats.factorIntralaboralGlobal.formaB} /></td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center text-[11px] font-semibold text-rose-700">Respuesta de Tensión</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Factor Extralaboral Global</td>
                      <td className="p-3 text-center" colSpan={2}><RiskBadge level={stats.factorExtralaboralGlobal} /></td>
                      <td className="p-3 text-center"><RiskBadge level={stats.factorExtralaboralGlobal} /></td>
                      <td className="p-3 text-center text-[11px] font-semibold text-amber-700">Interferencia Moderada</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Nivel General de Estrés</td>
                      <td className="p-3 text-center" colSpan={2}><RiskBadge level={stats.estresGlobal} /></td>
                      <td className="p-3 text-center"><RiskBadge level={stats.estresGlobal} /></td>
                      <td className="p-3 text-center text-[11px] font-semibold text-rose-700">Fatiga Somatizada</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Dominios y Dimensiones Críticas */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                5. DOMINIOS PSICOSOCIALES Y DIMENSIONES CRÍTICAS PRIORIZADAS
              </h3>
              <p>
                El análisis dimensional evidencia que los factores que demandan intervención inmediata en la organización corresponden al dominio <strong>Demandas del Trabajo</strong> y <strong>Control sobre el Trabajo</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stats.dimensionesCriticas.slice(0, 4).map((d, i) => (
                  <div key={i} className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1">
                    <div className="flex justify-between items-start">
                      <strong className="text-rose-950 font-bold text-xs">{d.dimension}</strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-200 text-rose-900">
                        {d.nivelB || d.nivelA}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Dominio: {d.dominio}</span>
                    <p className="text-[11px] text-slate-700 mt-1">
                      Carga mental elevada por atención simultánea de contingencias, concentración prolongada y extensión de jornadas.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Cruce de la Tríada Epidemiológica */}
            <section className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-700" />
                <h3 className="text-sm font-black text-purple-950">
                  6. CRUCE DE LA TRÍADA EPIDEMIOLÓGICA (BATERÍA + AUSENTISMO + INCAPACIDADES CIE-10)
                </h3>
              </div>
              <p className="text-justify text-slate-700">
                Para garantizar rigor probatorio de acuerdo con el Decreto 1072 de 2015 (SG-SST), los puntajes subjetivos de la batería se contrastaron con los registros objetivos de ausentismo e incapacidades médicas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Ausentismo Acumulado</span>
                  <span className="text-lg font-black text-slate-900">{totalDiasAus} días perdidos</span>
                  <span className="text-[10px] text-slate-500 block">Permisos personales y calamidad</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Incapacidades Médicas</span>
                  <span className="text-lg font-black text-rose-700">{totalDiasInc} días certificados</span>
                  <span className="text-[10px] text-slate-500 block">CIE-10 F41 (Ansiedad) y G43 (Migraña)</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-200">
                  <span className="text-[10px] text-purple-900 font-bold uppercase block">Casos Tríada Crítica</span>
                  <span className="text-lg font-black text-purple-700">{criticalWorkers.length} colaborador(es)</span>
                  <span className="text-[10px] text-purple-600 font-semibold block">Intervención PVE Prioritaria</span>
                </div>
              </div>

              <div className="text-[11px] text-purple-900 font-medium bg-purple-100/60 p-2.5 rounded-lg border border-purple-200">
                <strong>Dictamen Epidemiológico:</strong> La correlación positiva entre niveles de estrés Alto y diagnósticos médicos recurrentes (trastorno ansioso y cefalea tensional) confirma la existencia de <em>morbilidad biológica y somática activa</em>, otorgando total sustento para la inclusión de los colaboradores en el Programa de Vigilancia Epidemiológica (PVE).
              </div>
            </section>

            {/* 7. Dictamen Técnico y Periodicidad */}
            <section className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-sm font-black text-slate-900">
                7. DICTAMEN TÉCNICO Y PERIODICIDAD DE VIGILANCIA
              </h3>
              <p className="text-justify">
                De conformidad con el Artículo 3 de la Resolución 2404 de 2019 del Ministerio del Trabajo, dado que <strong>{company.nombre}</strong> presenta factores de riesgo psicosocial en niveles <strong>ALTO y MUY ALTO</strong> en sus factores intralaborales y de estrés, se dictamina:
              </p>
              <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-900">
                <li>Obligación legal perentoria de instaurar el <strong>Programa de Vigilancia Epidemiológica (PVE)</strong> con matrices MT-17 y PG-06.</li>
                <li>Periodicidad de evaluación de seguimiento psicosocial de carácter <strong>ANUAL (Próxima evaluación obligatoria: Noviembre de 2027)</strong>.</li>
                <li>Reporte formal de los indicadores de morbilidad y cobertura en el informe anual de gestión del SG-SST presentado a la ARL y COPASST.</li>
              </ul>
            </section>

            {/* 8. Recomendaciones para el SG-SST */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-indigo-600 pl-2.5">
                8. PLAN DE RECOMENDACIONES TÉCNICAS PARA EL SG-SST
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-600">
                  <strong className="text-slate-900 block font-bold">A Nivel de Organización del Trabajo (Fuente):</strong>
                  <span className="text-slate-600">Revisión de la distribución de turnos clínicos y nocturnos. Instaurar pausas activas cognitivas de 10 minutos cada 3 horas en jornadas de alta concentración.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-600">
                  <strong className="text-slate-900 block font-bold">A Nivel de Relaciones y Clima Laboral (Medio):</strong>
                  <span className="text-slate-600">Capacitación al Comité de Convivencia Laboral en resolución asertiva de conflictos bajo la Ley 1010 de 2006. Desarrollar talleres vivenciales de 10 Habilidades para la Vida (metodología OMS).</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-emerald-600">
                  <strong className="text-slate-900 block font-bold">A Nivel Individual (Individuo / Casos SOS):</strong>
                  <span className="text-slate-600">Atención de orientación psicológica individual (hasta 3 sesiones confidenciales) y cartas de remisión prioritaria a medicina especializada de la EPS para los colaboradores clasificados en la Tríada Crítica.</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* DOCUMENT 2: INFORME GERENCIAL EJECUTIVO (PARA GERENCIA GENERAL)  */}
        {/* ============================================================== */}
        {reportType === 'executive' && (
          <div className="space-y-8 text-xs leading-relaxed text-slate-700">
            
            {/* 1. Resumen Ejecutivo "La Foto en Cifras" */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-rose-600 pl-2.5">
                1. RESUMEN EJECUTIVO: "LA FOTO EN CIFRAS" PARA LA GERENCIA GENERAL
              </h3>
              <p className="text-justify text-slate-800">
                La evaluación de riesgo psicosocial realizada en <strong>{company.nombre}</strong> con una cobertura del <strong>100% del personal ({totalTrabajadores} colaboradores)</strong> permite a la Alta Dirección dimensionar el impacto directo que el bienestar psicológico, las cargas de trabajo y los turnos tienen sobre la productividad, el ausentismo y la estabilidad jurídica de la empresa.
              </p>

              {/* 4 C-Level KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-1">
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">Nivel de Riesgo Global</span>
                  <span className="text-xl font-black text-rose-400 block">{company.resumenRiesgo?.semaforoGeneral || 'ALTO'}</span>
                  <span className="text-[10px] text-slate-400">Exposición crítica</span>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Población en Alerta</span>
                  <span className="text-xl font-black text-white block">
                    {criticalWorkers.length + somaticWorkers.length} <span className="text-xs text-slate-400">trab.</span>
                  </span>
                  <span className="text-[10px] text-amber-300 font-semibold">
                    {Math.round(((criticalWorkers.length + somaticWorkers.length) / totalTrabajadores) * 100)}% de la nómina
                  </span>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-1">
                  <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Días Perdidos Anuales</span>
                  <span className="text-xl font-black text-indigo-300 block">{totalDiasPerdidos} días</span>
                  <span className="text-[10px] text-slate-400">Ausentismo + Incapacidad</span>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Costo Directo Días</span>
                  <span className="text-xl font-black text-emerald-400 block">
                    ~${(estimatedLostCostCop / 1000000).toFixed(1)}M <span className="text-xs font-normal">COP</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Cálculo de reemplazo</span>
                </div>
              </div>
            </section>

            {/* 2. Semáforo Gerencial de los 3 Focos Críticos */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-rose-600 pl-2.5">
                2. SEMÁFORO GERENCIAL: LOS 3 FOCOS CRÍTICOS QUE QUEMAN AL EQUIPO
              </h3>
              <p>
                Los datos revelan con precisión quirúrgica cuáles son las 3 áreas donde la empresa está perdiendo productividad y salud:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200 px-2 py-0.5 rounded">Foco 1</span>
                    <span className="text-xs font-black text-rose-700">RIESGO MUY ALTO</span>
                  </div>
                  <h4 className="font-black text-sm text-rose-950">Sobrecarga y Demandas Emocionales</h4>
                  <p className="text-[11px] text-slate-700">
                    Atención simultánea de urgencias, cirugías continuas y exposición al dolor/contingencia de usuarios sin pausas de descompresión emocional.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded">Foco 2</span>
                    <span className="text-xs font-black text-amber-800">RIESGO ALTO</span>
                  </div>
                  <h4 className="font-black text-sm text-amber-950">Jornada y Horarios de Trabajo</h4>
                  <p className="text-[11px] text-slate-700">
                    Turnos extendidos y rotación con descanso insuficiente. El colaborador percibe interferencia negativa en su vida familiar y personal.
                  </p>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-200 px-2 py-0.5 rounded">Foco 3</span>
                    <span className="text-xs font-black text-indigo-700">RIESGO MEDIO</span>
                  </div>
                  <h4 className="font-black text-sm text-indigo-950">Reconocimiento & Compensación</h4>
                  <p className="text-[11px] text-slate-700">
                    Sensación de que el esfuerzo extraordinario desplegado en emergencias no siempre se ve retribuido con incentivos o reconocimientos verbales.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Costos Ocultos y Exposición Legal */}
            <section className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-rose-600" />
                3. IMPACTO FINANCIERO Y EXPOSICIÓN LEGAL ANTE EL MINISTERIO DEL TRABAJO
              </h3>
              <p className="text-justify text-slate-700">
                La inacción gerencial frente a estos resultados no es gratuita. Representa tres riesgos financieros y jurídicos directos:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="block text-slate-900 font-bold">1. Sanciones Mintrabajo</strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Multas de hasta <strong>500 SMLMV</strong> por omitir el PVE cuando los resultados arrojan nivel Alto (Ley 1562/2012).
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="block text-slate-900 font-bold">2. Fuga de Talento Clave</strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    El costo de reemplazar a un profesional capacitado equivale a entre <strong>3 y 6 meses de salario</strong> en inducción y curva de aprendizaje.
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="block text-slate-900 font-bold">3. Reclamaciones ARL / EPS</strong>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Calificación de origen laboral por patologías psiquiátricas (Burnout o Depresión) que incrementan la cotización de riesgo de la empresa.
                  </span>
                </div>
              </div>
            </section>

            {/* 4. Matriz de Toma de Decisiones Gerenciales */}
            <section className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 border-l-4 border-rose-600 pl-2.5">
                4. MATRIZ DE DECISIÓN GERENCIAL (QUÉ DEBE AUTORIZAR LA GERENCIA)
              </h3>
              <p>
                Acciones puntuales, de bajo costo y alto retorno en productividad que la Gerencia General puede ordenar de inmediato:
              </p>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-black uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Decisión Gerencial</th>
                      <th className="p-3">Plazo</th>
                      <th className="p-3">Inversión Estimada</th>
                      <th className="p-3">Beneficio Directo Esperado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">
                        1. Aprobación y Firma del PVE (MT-17 y PG-06)
                      </td>
                      <td className="p-3 font-semibold text-rose-700">Inmediato (Mes 1)</td>
                      <td className="p-3 text-slate-600">Cero (Incluido en gestión SST)</td>
                      <td className="p-3 text-slate-800">Blindaje legal total ante auditorías del Ministerio de Trabajo y la ARL.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">
                        2. Ajuste de Turnos de Descanso y Desconexión Laboral
                      </td>
                      <td className="p-3 font-semibold text-amber-700">Corto Plazo (Meses 2–3)</td>
                      <td className="p-3 text-slate-600">Baja (Reorganización interna)</td>
                      <td className="p-3 text-slate-800">Reducción inmediata de hasta un 35% en días perdidos por migraña y fatiga.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">
                        3. Programa de Reconocimiento y Bienestar Trimestral
                      </td>
                      <td className="p-3 font-semibold text-indigo-700">Continuo (Meses 3–11)</td>
                      <td className="p-3 text-slate-600">Moderada (Incentivos no salariales)</td>
                      <td className="p-3 text-slate-800">Incremento en compromiso del equipo y disminución de rotación de talento.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">
                        4. Reevaluación Psicosocial Anual de Control
                      </td>
                      <td className="p-3 font-semibold text-slate-700">Mes 12 (Nov 2027)</td>
                      <td className="p-3 text-slate-600">Presupuestada anualmente</td>
                      <td className="p-3 text-slate-800">Medición del retorno de inversión y ajuste del ciclo de mejora continua PHVA.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* REPORT SIGNATURE / FOOTER BLOCK                                */}
        {/* ============================================================== */}
        <div className="pt-8 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
          <div className="space-y-1">
            <div className="w-52 border-b-2 border-slate-900 mb-2"></div>
            <strong className="block text-slate-950 font-black text-sm">
              {company.psicologoEvaluador?.nombre || 'Psic. Especialista Jimmy Martínez B.'}
            </strong>
            <span className="text-slate-700 font-semibold block">
              Psicólogo Especialista en Seguridad y Salud en el Trabajo
            </span>
            <span className="text-slate-500 font-mono block">
              Tarjeta Profesional: {company.psicologoEvaluador?.tarjetaProfesional || 'TP-108523-COLPSIC'}
            </span>
            <span className="text-slate-500 font-mono block">
              Licencia SST Vigente: {company.psicologoEvaluador?.licenciaSST || 'LIC-SST-45920-2023'}
            </span>
            <span className="text-[10px] text-slate-400 italic block mt-1">
              Custodia de historia clínica y resultados bajo estricta reserva profesional (Ley 1090/2006).
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right space-y-1">
            <span className="font-extrabold text-slate-800 block text-xs">
              Validez Jurídica y Probatoria
            </span>
            <span className="text-[10px] text-slate-500 block">
              Resolución 2646 de 2008 / Resolución 2404 de 2019
            </span>
            <span className="text-[10px] text-slate-500 block">
              Ministerio del Trabajo de la República de Colombia
            </span>
            <div className="pt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" /> Dictamen Avalado
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
