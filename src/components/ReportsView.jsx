import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { COMPANY_SUMMARY_STATS } from '../data/mockData';

export default function ReportsView({ company, workers }) {
  const [reportType, setReportType] = useState('technical'); // 'technical' | 'executive'
  const stats = COMPANY_SUMMARY_STATS;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Report Switcher & Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Módulo de Emisión de Informes Reglamentarios
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Documentos oficiales exigidos por el Ministerio del Trabajo de Colombia (Resolución 2404 de 2019)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Switcher Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold">
            <button
              onClick={() => setReportType('technical')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                reportType === 'technical'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              1. Informe Técnico General
            </button>
            <button
              onClick={() => setReportType('executive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                reportType === 'executive'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              2. Informe Gerencial Ejecutivo
            </button>
          </div>

          {/* Print/Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Guardar en PDF
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-12 max-w-4xl mx-auto text-slate-800 space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* REPORT HEADER */}
        <div className="border-b-2 border-slate-900 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-600 block mb-1">
                {reportType === 'technical' 
                  ? 'INFORME DE DIAGNÓSTICO TÉCNICO Y EPIDEMIOLÓGICO' 
                  : 'INFORME GERENCIAL EJECUTIVO & PLAN DE INTERVENCIÓN'}
              </span>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight">
                EVALUACIÓN DE FACTORES DE RIESGO PSICOSOCIAL
              </h1>
              <p className="text-sm font-bold text-slate-700 mt-1">
                {company.nombre} (NIT: {company.nit})
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-semibold block text-slate-700">Vigencia: 2026</span>
              <span>Fecha de Aplicación: Noviembre 2026</span>
              <span className="block mt-1 text-[11px] font-mono text-indigo-700 font-bold">
                Batería Res. 2404 / Javeriana
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Actividad Económica</span>
              <span className="font-semibold text-slate-800">{company.actividadEconomica}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Clase de Riesgo</span>
              <span className="font-semibold text-slate-800">{company.claseRiesgo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Centro de Trabajo</span>
              <span className="font-semibold text-slate-800">{company.centroTrabajo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Población Muestra</span>
              <span className="font-semibold text-slate-800">{stats.totalParticipantes} Trabajadores (100%)</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* OPTION A: INFORME TÉCNICO GENERAL */}
        {/* ------------------------------------------------------------- */}
        {reportType === 'technical' && (
          <div className="space-y-6 text-xs leading-relaxed text-slate-700">
            {/* 1. Marco Normativo */}
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                1. MARCO LEGAL Y METODOLÓGICO
              </h3>
              <p>
                El presente diagnóstico técnico ha sido elaborado en estricto cumplimiento de la <strong>Resolución 2646 de 2008</strong>, la <strong>Resolución 2404 de 2019</strong> y la <strong>Resolución 2764 de 2022</strong> expedidas por el Ministerio del Trabajo de Colombia. Para la recolección, codificación y ponderación psicométrica se utilizaron los instrumentos estandarizados por la <strong>Pontificia Universidad Javeriana</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Ficha de Datos Generales (Variables sociodemográficas y ocupacionales).</li>
                <li>Cuestionario de Factores de Riesgo Psicosocial Intralaboral (Forma A para jefaturas/profesionales y Forma B para auxiliares/operarios).</li>
                <li>Cuestionario de Factores de Riesgo Psicosocial Extralaboral (31 ítems en 7 dimensiones).</li>
                <li>Cuestionario para la Evaluación del Estrés (Tercera versión - 31 síntomas ponderados).</li>
              </ul>
            </section>

            {/* 2. Muestra y Participación */}
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                2. CARACTERIZACIÓN DE LA POBLACIÓN PARTICIPANTE
              </h3>
              <div className="grid grid-cols-3 gap-3 my-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Evaluados</span>
                  <span className="text-lg font-black text-slate-900">{stats.totalParticipantes}</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <span className="text-[10px] text-purple-700 uppercase font-bold block">Forma A (Jefes/Prof.)</span>
                  <span className="text-lg font-black text-purple-900">{stats.participacionFormaA}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <span className="text-[10px] text-blue-700 uppercase font-bold block">Forma B (Auxiliares)</span>
                  <span className="text-lg font-black text-blue-900">{stats.participacionFormaB}</span>
                </div>
              </div>
            </section>

            {/* 3. Resultados Globales */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                3. RESULTADOS DEL DIAGNÓSTICO EPIDEMIOLÓGICO
              </h3>
              <p>
                Los puntajes brutos obtenidos fueron transformados a una escala estandarizada de 0 a 100 y comparados con los baremos percentilares oficiales:
              </p>

              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Componente Evaluado</th>
                    <th className="p-2.5 text-center">Población Forma A</th>
                    <th className="p-2.5 text-center">Población Forma B</th>
                    <th className="p-2.5 text-center">Nivel Consolidado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-semibold">Factor Intralaboral Total</td>
                    <td className="p-2.5 text-center"><RiskBadge level={stats.factorIntralaboralGlobal.formaA} /></td>
                    <td className="p-2.5 text-center"><RiskBadge level={stats.factorIntralaboralGlobal.formaB} /></td>
                    <td className="p-2.5 text-center"><RiskBadge level="ALTO" /></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">Factor Extralaboral Total</td>
                    <td className="p-2.5 text-center" colSpan="2"><RiskBadge level={stats.factorExtralaboralGlobal} /></td>
                    <td className="p-2.5 text-center"><RiskBadge level={stats.factorExtralaboralGlobal} /></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">Cuestionario de Estrés</td>
                    <td className="p-2.5 text-center" colSpan="2"><RiskBadge level={stats.estresGlobal} /></td>
                    <td className="p-2.5 text-center"><RiskBadge level={stats.estresGlobal} /></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 4. Dominios y Dimensiones Críticas */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                4. ANÁLISIS DE DOMINIOS Y PRIORIZACIÓN
              </h3>
              <p>
                El <strong>Dominio Demandas del Trabajo</strong> presenta la mayor carga de riesgo psicosocial en la organización:
              </p>
              <div className="space-y-2">
                {stats.dimensionesCriticas.slice(0, 4).map((d, i) => (
                  <div key={i} className="p-2.5 bg-red-50/60 rounded border border-red-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900">{d.dimension}</span>
                      <span className="text-[10px] text-slate-500 block">{d.dominio}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-semibold text-slate-600">Forma A: {d.nivelA}</span>
                      <span className="text-[10px] font-semibold text-slate-600">| Forma B: {d.nivelB}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Concepto y Dictamen */}
            <section className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                5. CONCEPTO TÉCNICO Y PERIODICIDAD
              </h3>
              <p>
                De acuerdo con el Artículo 3 de la Resolución 2404 de 2019, cuando una empresa presente factores de riesgo psicosocial en niveles <strong>ALTO o MUY ALTO</strong>, debe implementar de forma obligatoria el <em>Programa de Vigilancia Epidemiológica de Factores de Riesgo Psicosocial (PVE)</em> y realizar la evaluación de seguimiento con una periodicidad <strong>ANUAL</strong>.
              </p>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* OPTION B: INFORME GERENCIAL EJECUTIVO */}
        {/* ------------------------------------------------------------- */}
        {reportType === 'executive' && (
          <div className="space-y-6 text-xs leading-relaxed text-slate-700">
            {/* 1. Resumen Ejecutivo */}
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                1. RESUMEN EJECUTIVO PARA LA GERENCIA
              </h3>
              <p className="text-slate-800 text-justify">
                Durante el mes de noviembre de 2026 se llevó a cabo la evaluación de la Batería de Riesgo Psicosocial en <strong>{company.nombre}</strong> con una cobertura del <strong>100% del personal activo (7 colaboradores)</strong>. El objetivo de este informe es brindar a la Dirección una lectura clara, estratégica y orientada a la toma de decisiones sobre el clima laboral, la productividad, la retención de talento y el cumplimiento legal del SG-SST.
              </p>
            </section>

            {/* 2. Semáforo Gerencial de Criticidad */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                2. SEMÁFORO GERENCIAL DE IMPACTO
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                  <span className="text-[10px] text-red-700 font-bold uppercase block">Demandas Laborales</span>
                  <span className="text-base font-black text-red-900 mt-1 block">MUY ALTO</span>
                  <span className="text-[10px] text-slate-500">Carga mental & turnos</span>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-center">
                  <span className="text-[10px] text-orange-700 font-bold uppercase block">Estrés Global</span>
                  <span className="text-base font-black text-orange-900 mt-1 block">ALTO</span>
                  <span className="text-[10px] text-slate-500">Fatiga & tensión</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block">Control / Autonomía</span>
                  <span className="text-base font-black text-amber-900 mt-1 block">MEDIO</span>
                  <span className="text-[10px] text-slate-500">Margen de decisión</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">Claridad de Rol</span>
                  <span className="text-base font-black text-emerald-900 mt-1 block">SIN RIESGO</span>
                  <span className="text-[10px] text-slate-500">Funciones claras</span>
                </div>
              </div>
            </section>

            {/* 3. Matriz de Riesgo y Costos Ocultos */}
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                3. IMPACTO EN PRODUCTIVIDAD Y COSTOS OCULTOS
              </h3>
              <p>
                Los hallazgos reflejan que la intensidad de la atención médico-veterinaria, las emergencias clínicas y la extensión de las jornadas generan una sobrecarga emocional y física importante. La falta de intervención preventiva puede derivar en:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="block text-slate-900">Ausentismo Médico</strong>
                  <span className="text-slate-500 text-[11px]">Incapacidades por fatiga, migrañas y trastornos osteomusculares.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="block text-slate-900">Rotación de Personal</strong>
                  <span className="text-slate-500 text-[11px]">Desgaste precoz en auxiliares y médicos veterinarios de turno.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="block text-slate-900">Riesgo de Sanción</strong>
                  <span className="text-slate-500 text-[11px]">Multas del Ministerio del Trabajo por incumplimiento de la Res. 2404.</span>
                </div>
              </div>
            </section>

            {/* 4. Plan de Acción en Ciclo PHVA */}
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                4. PLAN DE INTERVENCIÓN PRIORIZADO (CICLO PHVA)
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-indigo-600">
                  <span className="font-bold text-indigo-900 block">PLANEAR (Mes 1):</span>
                  <span className="text-slate-600">Diseñar el Programa de Vigilancia Epidemiológica Psicosocial (PVE) enfocado en Demandas Emocionales y Jornada Laboral.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-600">
                  <span className="font-bold text-blue-900 block">HACER (Meses 2 al 10):</span>
                  <span className="text-slate-600">Implementar protocolo de debriefing emocional tras casos críticos en clínica, ajustar cronograma de turnos de descanso y realizar talleres de manejo de estrés.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-600">
                  <span className="font-bold text-amber-900 block">VERIFICAR (Mes 11):</span>
                  <span className="text-slate-600">Medir indicadores de ausentismo, rotación y encuesta de satisfacción de clima laboral.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-emerald-600">
                  <span className="font-bold text-emerald-900 block">ACTUAR (Mes 12):</span>
                  <span className="text-slate-600">Reevaluación anual de la Batería de Riesgo Psicosocial y ajuste de medidas de mejora continua.</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* REPORT SIGNATURE / FOOTER */}
        <div className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
          <div className="space-y-1">
            <div className="w-48 border-b-2 border-slate-900 mb-2"></div>
            <strong className="block text-slate-950 font-bold">{company.psicologoEvaluador.nombre}</strong>
            <span className="text-slate-600 block">Psicólogo Especialista en Seguridad y Salud en el Trabajo</span>
            <span className="text-slate-500 font-mono block">Tarjeta Profesional: {company.psicologoEvaluador.tarjetaProfesional}</span>
            <span className="text-slate-500 font-mono block">Licencia SST: {company.psicologoEvaluador.licenciaSST}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-right">
            <span className="font-bold text-slate-700 block">Validez Jurídica y Normativa</span>
            <span className="text-[10px] text-slate-500 block">Resolución 2646 de 2008 / 2404 de 2019</span>
            <span className="text-[10px] text-slate-500 block">Ministerio del Trabajo de Colombia</span>
          </div>
        </div>

      </div>
    </div>
  );
}
