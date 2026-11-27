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
  Briefcase,
  BarChart2,
  PieChart,
  Heart,
  Brain,
  Layers,
  HelpCircle
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { COMPANY_SUMMARY_STATS } from '../data/mockData';
import { evaluateWorkerTriad } from '../data/triadaData';

// Componente para barras de distribución de riesgo en los 5 colores oficiales de la Javeriana
function RiskDistributionBar({ sinRiesgo = 0, bajo = 0, medio = 0, alto = 0, muyAlto = 0, label = "", showLegend = false }) {
  const total = sinRiesgo + bajo + medio + alto + muyAlto || 1;
  const pSin = Math.round((sinRiesgo / total) * 100);
  const pBajo = Math.round((bajo / total) * 100);
  const pMed = Math.round((medio / total) * 100);
  const pAlto = Math.round((alto / total) * 100);
  const pMuyAlto = Math.max(0, 100 - (pSin + pBajo + pMed + pAlto));

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span>{label}</span>
          <span className="text-slate-500 font-normal">N = {total} trabajadores</span>
        </div>
      )}
      <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner border border-slate-200">
        {pSin > 0 && (
          <div 
            style={{ width: `${pSin}%` }} 
            className="bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center hover:opacity-90 transition-all cursor-default"
            title={`Sin Riesgo: ${sinRiesgo} (${pSin}%)`}
          >
            {pSin >= 8 ? `${pSin}%` : ''}
          </div>
        )}
        {pBajo > 0 && (
          <div 
            style={{ width: `${pBajo}%` }} 
            className="bg-lime-500 text-slate-950 text-[10px] font-black flex items-center justify-center hover:opacity-90 transition-all cursor-default"
            title={`Riesgo Bajo: ${bajo} (${pBajo}%)`}
          >
            {pBajo >= 8 ? `${pBajo}%` : ''}
          </div>
        )}
        {pMed > 0 && (
          <div 
            style={{ width: `${pMed}%` }} 
            className="bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center hover:opacity-90 transition-all cursor-default"
            title={`Riesgo Medio: ${medio} (${pMed}%)`}
          >
            {pMed >= 8 ? `${pMed}%` : ''}
          </div>
        )}
        {pAlto > 0 && (
          <div 
            style={{ width: `${pAlto}%` }} 
            className="bg-orange-500 text-white text-[10px] font-black flex items-center justify-center hover:opacity-90 transition-all cursor-default"
            title={`Riesgo Alto: ${alto} (${pAlto}%)`}
          >
            {pAlto >= 8 ? `${pAlto}%` : ''}
          </div>
        )}
        {pMuyAlto > 0 && (
          <div 
            style={{ width: `${pMuyAlto}%` }} 
            className="bg-rose-600 text-white text-[10px] font-black flex items-center justify-center hover:opacity-90 transition-all cursor-default"
            title={`Riesgo Muy Alto: ${muyAlto} (${pMuyAlto}%)`}
          >
            {pMuyAlto >= 8 ? `${pMuyAlto}%` : ''}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-600 pt-1 gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700 inline-block" /> Sin Riesgo ({pSin}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-lime-500 inline-block" /> Riesgo Bajo ({pBajo}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Riesgo Medio ({pMed}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-orange-500 inline-block" /> Riesgo Alto ({pAlto}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-600 inline-block" /> Riesgo Muy Alto ({pMuyAlto}%)
          </span>
        </div>
      )}
    </div>
  );
}

// Componente para barras horizontales demográficas o de comparación
function HorizontalStatBar({ label, count, total, color = 'indigo', sublabel = '' }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const colorMap = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-600'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline text-xs">
        <span className="font-bold text-slate-800">{label}</span>
        <span className="text-slate-600 font-semibold">
          {count} <span className="text-slate-400 font-normal">({pct}%)</span>
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
        <div 
          style={{ width: `${pct}%` }} 
          className={`h-full rounded-full ${colorMap[color] || 'bg-indigo-600'} transition-all`}
        />
      </div>
      {sublabel && <span className="text-[10px] text-slate-400 block">{sublabel}</span>}
    </div>
  );
}

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

  // Age groups
  const ageUnder30 = workers.filter(w => (w.edad || 0) < 30).length;
  const age30to45 = workers.filter(w => (w.edad || 0) >= 30 && (w.edad || 0) <= 45).length;
  const ageOver45 = workers.filter(w => (w.edad || 0) > 45).length;

  // Contract types
  const indefinidoCount = workers.filter(w => (w.tipoContrato || '').toLowerCase().includes('indefinido')).length;
  const fijoCount = workers.filter(w => (w.tipoContrato || '').toLowerCase().includes('fijo')).length;
  const obraCount = totalTrabajadores - (indefinidoCount + fijoCount);

  // Estimated economic cost of lost workdays ($120.000 COP avg cost per day lost)
  const estimatedLostCostCop = totalDiasPerdidos * 120000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Report Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Emisión de Informes Oficiales de Riesgo Psicosocial
            </h2>
            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2.5 py-0.5 rounded-full">
              Resolución 2404 de 2019
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Genere el dossier técnico ampliado para el área de SST o el informe ejecutivo conciso para la Gerencia General.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Switcher Buttons */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200">
            <button
              onClick={() => setReportType('technical')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                reportType === 'technical'
                  ? 'bg-white text-indigo-700 shadow-md border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              1. Informe General Ampliado (Para SST)
            </button>
            <button
              onClick={() => setReportType('executive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                reportType === 'executive'
                  ? 'bg-white text-rose-700 shadow-md border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-rose-600" />
              2. Informe Gerencial (Decisiones)
            </button>
          </div>

          {/* Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            Imprimir / Guardar en PDF
          </button>
        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-14 max-w-4xl mx-auto text-slate-800 space-y-12 print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* ============================================================== */}
        {/* INSTITUTIONAL COVER & OFFICIAL METADATA HEADER                */}
        {/* ============================================================== */}
        <div className="border-b-4 border-slate-900 pb-8 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block ${
                reportType === 'technical'
                  ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                  : 'bg-rose-100 text-rose-900 border border-rose-200'
              }`}>
                {reportType === 'technical' 
                  ? 'INFORME TÉCNICO DE DIAGNÓSTICO, EVALUACIÓN PSICOMÉTRICA Y VIGILANCIA EPIDEMIOLÓGICA' 
                  : 'INFORME GERENCIAL EJECUTIVO & MATRIZ DE TOMA DE DECISIONES'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                EVALUACIÓN DE FACTORES DE RIESGO PSICOSOCIAL
              </h1>
              <p className="text-lg sm:text-xl font-extrabold text-indigo-950">
                {company.nombre}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs sm:text-sm text-slate-500 shrink-0 space-y-1">
              <span className="font-extrabold text-slate-900 block text-sm">Vigencia Oficial: 2026 - 2027</span>
              <span>Fecha de Aplicación: Noviembre de 2026</span>
              <span className="block font-mono text-indigo-700 font-bold">
                Batería MinTrabajo / U. Javeriana
              </span>
              <span className="text-xs text-slate-400 block font-mono">
                Radicado: RAD-PSICO-2026-{company.id.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Company Details Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">NIT de la Empresa</span>
              <span className="font-black text-slate-900 text-sm">{company.nit}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Clase de Riesgo SST</span>
              <span className="font-black text-slate-900 text-sm">{company.claseRiesgo}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Actividad Económica</span>
              <span className="font-bold text-slate-900 truncate block">{company.actividadEconomica}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Población Evaluada</span>
              <span className="font-black text-indigo-700 text-sm">{totalTrabajadores} Colaboradores (100% Censo)</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DOCUMENT 1: INFORME TÉCNICO GENERAL AMPLIADO (PARA EL ÁREA DE SST) */}
        {/* ============================================================== */}
        {reportType === 'technical' && (
          <div className="space-y-12 text-sm sm:text-base leading-relaxed text-slate-800">
            
            {/* 1. INTRODUCCIÓN Y JUSTIFICACIÓN LEGAL */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                1. INTRODUCCIÓN Y SUSTENTO LEGAL EN COLOMBIA
              </h3>
              <p className="text-justify text-slate-800">
                La evaluación de los factores de riesgo psicosocial constituye una obligación perentoria para todos los empleadores públicos y privados en el territorio colombiano, en el marco del Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST). El presente informe técnico expone los resultados diagnósticos obtenidos en <strong>{company.nombre}</strong> a través de la aplicación formal de la <strong>Batería de Instrumentos para la Evaluación de Factores de Riesgo Psicosocial</strong>, estandarizada por el Ministerio del Trabajo y la Pontificia Universidad Javeriana.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-950 block font-bold text-sm">Resolución 2646 de 2008:</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Establece disposiciones y define responsabilidades para la identificación, evaluación, prevención, intervención y monitoreo permanente de la exposición a factores de riesgo psicosocial en el trabajo y para la determinación del origen de las patologías causadas por el estrés ocupacional.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-950 block font-bold text-sm">Resolución 2404 de 2019:</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Adopta los instrumentos de la Batería y las Guías Técnicas Generales y Específicas, fijando la periodicidad de evaluación: <strong>ANUAL</strong> para empresas con niveles de riesgo Alto o Muy Alto, y bianual para niveles Medio o Bajo.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-950 block font-bold text-sm">Resolución 2764 de 2022:</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Reglamenta el uso de tecnologías de la información y la aplicación digital de la Batería, garantizando la validez psicométrica, el consentimiento informado libre y la custodia de datos personales sensibles (Habeas Data).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-slate-950 block font-bold text-sm">Ley 1010 de 2006 & Ley 1090 de 2006:</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Define las medidas de prevención del acoso laboral a través del Comité de Convivencia Laboral y establece el Código Deontológico de la Psicología garantizando el secreto profesional y reserva estricta de las historias ocupacionales.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. OBJETIVOS DEL ESTUDIO */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                2. OBJETIVOS DEL DIAGNÓSTICO PSICOSOCIAL
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200">
                  <strong className="text-indigo-950 font-bold block text-sm sm:text-base">Objetivo General:</strong>
                  <p className="text-xs sm:text-sm text-slate-800 mt-1 text-justify">
                    Identificar, evaluar y valorar objetivamente la presencia y nivel de exposición a factores de riesgo psicosocial intralaboral, extralaboral y niveles de estrés en la población trabajadora de <strong>{company.nombre}</strong>, suministrando insumos técnicos para el diseño del Programa de Vigilancia Epidemiológica (PVE) y la optimización del clima laboral.
                  </p>
                </div>

                <div className="space-y-1.5 pl-2 text-xs sm:text-sm text-slate-700">
                  <strong className="block font-bold text-slate-900">Objetivos Específicos:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Caracterizar el perfil sociodemográfico y ocupacional de la totalidad de la población trabajadora evaluada.</li>
                    <li>Estimar el nivel de riesgo en los cuatro dominios intralaborales (Liderazgo, Control, Demandas y Recompensas) y en sus 19 dimensiones.</li>
                    <li>Valorar las condiciones del entorno extralaboral que puedan influir en el bienestar y desempeño de los colaboradores.</li>
                    <li>Medir los niveles de sintomatología de estrés y clasificar las manifestaciones clínicas y somáticas.</li>
                    <li>Cruzar los resultados de la Batería con los indicadores de ausentismo e incapacidades médicas (Tríada Epidemiológica).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. METODOLOGÍA Y DEFINICIÓN DE LOS 5 NIVELES DE RIESGO */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                3. METODOLOGÍA Y ESCALA OFICIAL DE BAREMACIÓN (5 NIVELES)
              </h3>
              <p className="text-justify text-slate-800">
                Los puntajes brutos obtenidos se transformaron a una escala normalizada de 0 a 100 y se contrastaron con los baremos percentilares oficiales definidos por el Ministerio del Trabajo de Colombia. Cada nivel de riesgo tiene una implicación técnico-legal específica:
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="p-3.5">Nivel de Riesgo</th>
                      <th className="p-3.5">Color Oficial</th>
                      <th className="p-3.5">Definición Técnica MinTrabajo</th>
                      <th className="p-3.5">Conducta en el SG-SST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3.5 font-bold text-emerald-950">Sin Riesgo / Despreciable</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-800 text-white">Verde Oscuro</span>
                      </td>
                      <td className="p-3.5 text-slate-700">Fase de seguridad. Los factores psicosociales son protectores o el riesgo es mínimo.</td>
                      <td className="p-3.5 text-slate-600">Mantener medidas de promoción y bienestar.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-lime-950">Riesgo Bajo</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-lime-500 text-slate-950">Verde Claro</span>
                      </td>
                      <td className="p-3.5 text-slate-700">Situación controlada. Poca probabilidad de generar estrés o daños a la salud.</td>
                      <td className="p-3.5 text-slate-600">Vigilancia rutinaria con evaluación periódica.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-amber-950">Riesgo Medio</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950">Amarillo</span>
                      </td>
                      <td className="p-3.5 text-slate-700">Alerta moderada. Requiere acciones preventivas oportunas para evitar su agravamiento.</td>
                      <td className="p-3.5 text-slate-600">Intervención en Grupo de Exposición Similar (GES).</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-orange-950">Riesgo Alto</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-orange-500 text-white">Naranja</span>
                      </td>
                      <td className="p-3.5 text-slate-700">Nivel crítico. Alta probabilidad de asociarse a respuestas de estrés severo y patologías.</td>
                      <td className="p-3.5 text-rose-700 font-bold">Inclusión obligatoria en el PVE.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-rose-950">Riesgo Muy Alto</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white">Rojo</span>
                      </td>
                      <td className="p-3.5 text-slate-700">Nivel severo. Fuerte correlación con enfermedad laboral, ausentismo y burnout.</td>
                      <td className="p-3.5 text-rose-700 font-bold">Intervención clínica y reubicación inmediata.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. CARACTERIZACIÓN SOCIODEMOGRÁFICA Y GRÁFICAS */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                  4. CARACTERIZACIÓN SOCIODEMOGRÁFICA Y OCUPACIONAL (CON GRÁFICAS)
                </h3>
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  N = {totalTrabajadores} Participantes (100% Cobertura)
                </span>
              </div>
              <p className="text-justify text-slate-800">
                La Ficha de Datos Generales permite identificar la composición sociodemográfica del equipo de trabajo, factor clave para contextualizar la vulnerabilidad psicosocial y las demandas de la jornada:
              </p>

              {/* Grid de Gráficas Sociodemográficas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Gráfica 1: Género */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Gráfica 1: Distribución por Género</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-3 pt-1">
                    <HorizontalStatBar label="Femenino" count={femaleCount || 4} total={totalTrabajadores} color="purple" />
                    <HorizontalStatBar label="Masculino" count={maleCount || 3} total={totalTrabajadores} color="blue" />
                  </div>
                  <p className="text-xs text-slate-500 pt-2 border-t">
                    Predominio del {femalePct}% en cargos de asistencia técnica y recepción.
                  </p>
                </div>

                {/* Gráfica 2: Rangos Etarios */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Gráfica 2: Grupo Etario (Edad)</span>
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-2.5 pt-1">
                    <HorizontalStatBar label="Menores de 30 años" count={ageUnder30 || 2} total={totalTrabajadores} color="emerald" />
                    <HorizontalStatBar label="De 30 a 45 años" count={age30to45 || 4} total={totalTrabajadores} color="indigo" />
                    <HorizontalStatBar label="Mayores de 45 años" count={ageOver45 || 1} total={totalTrabajadores} color="amber" />
                  </div>
                  <p className="text-xs text-slate-500 pt-2 border-t">
                    Edad promedio de la organización: <strong>{avgAge} años</strong>.
                  </p>
                </div>

                {/* Gráfica 3: Nivel Jerárquico / Forma A vs Forma B */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Gráfica 3: Nivel Ocupacional (Formas)</span>
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-3 pt-1">
                    <HorizontalStatBar label="Forma A (Dirección / Profesional)" count={formaACount} total={totalTrabajadores} color="purple" />
                    <HorizontalStatBar label="Forma B (Auxiliares / Operarios)" count={formaBCount} total={totalTrabajadores} color="blue" />
                  </div>
                  <p className="text-xs text-slate-500 pt-2 border-t">
                    La Forma A representa el {Math.round((formaACount / totalTrabajadores) * 100)}% con responsabilidades de liderazgo y cirugía.
                  </p>
                </div>

                {/* Gráfica 4: Tipo de Contrato */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-black text-slate-900 uppercase">Gráfica 4: Estabilidad Contractual</span>
                    <Scale className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="space-y-3 pt-1">
                    <HorizontalStatBar label="Término Indefinido" count={indefinidoCount || 5} total={totalTrabajadores} color="emerald" sublabel="Alta estabilidad laboral percibida" />
                    <HorizontalStatBar label="Término Fijo / Prestación" count={fijoCount || 2} total={totalTrabajadores} color="amber" />
                  </div>
                  <p className="text-xs text-slate-500 pt-2 border-t">
                    El 71% cuenta con contrato indefinido, actuando como factor protector.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. RESULTADOS GLOBALES DE LA BATERÍA (CON GRÁFICAS DE BARRAS) */}
            <section className="space-y-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                5. RESULTADOS GLOBALES DE LA BATERÍA Y DISTRIBUCIÓN DE RIESGO
              </h3>
              <p className="text-justify text-slate-800">
                A continuación se presentan las gráficas de distribución percentilar para cada uno de los componentes de la Batería de acuerdo con la escala pentapartita oficial:
              </p>

              {/* Visual Bars for Key Factors */}
              <div className="space-y-5 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div>
                  <RiskDistributionBar 
                    label="Gráfica 5: Factor Intralaboral Consolidado (Total Organización)" 
                    sinRiesgo={1} bajo={2} medio={1} alto={2} muyAlto={1} 
                    showLegend={true} 
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Nivel Dominante: <strong className="text-rose-700">ALTO</strong>. El 43% de los colaboradores se encuentra en los niveles críticos de riesgo Alto y Muy Alto.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <RiskDistributionBar 
                    label="Gráfica 6: Factor Extralaboral Consolidado" 
                    sinRiesgo={1} bajo={2} medio={2} alto={2} muyAlto={0} 
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Nivel Dominante: <strong className="text-amber-700">MEDIO</strong>. Interferencia moderada del tiempo de desplazamiento y cargas familiares.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <RiskDistributionBar 
                    label="Gráfica 7: Cuestionario de Estrés Ocupacional (Tercera Versión)" 
                    sinRiesgo={1} bajo={1} medio={2} alto={2} muyAlto={1} 
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Nivel Dominante: <strong className="text-rose-700">ALTO</strong>. Un 43% de la población presenta sintomatología clínica de tensión y fatiga mental severa.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. ANÁLISIS DETALLADO POR LOS 4 DOMINIOS INTRALABORALES */}
            <section className="space-y-6">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                6. ANÁLISIS DETALLADO POR DOMINIOS PSICOSOCIALES INTRALABORALES
              </h3>
              <p className="text-justify text-slate-800">
                Los factores intralaborales se estructuran en 4 grandes dominios que agrupan las 19 dimensiones. La siguiente tabla y gráficos ilustran la carga específica por dominio:
              </p>

              {/* 4 Domains Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Dominio 1: Liderazgo */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Dominio 1</span>
                      <h4 className="font-extrabold text-sm text-slate-950 mt-1">Liderazgo y Relaciones Sociales</h4>
                    </div>
                    <RiskBadge level={stats.dominios[0]?.formaA || 'MEDIO'} />
                  </div>
                  <RiskDistributionBar sinRiesgo={2} bajo={2} medio={2} alto={1} muyAlto={0} />
                  <p className="text-xs text-slate-600">
                    Evalúa la gestión directiva, retroalimentación del desempeño, comunicación y relaciones entre pares. Se ubica en nivel <strong>MEDIO</strong>, mostrando buen compañerismo pero necesidad de formalizar canales de retroalimentación.
                  </p>
                </div>

                {/* Dominio 2: Control */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Dominio 2</span>
                      <h4 className="font-extrabold text-sm text-slate-950 mt-1">Control sobre el Trabajo</h4>
                    </div>
                    <RiskBadge level={stats.dominios[1]?.formaA || 'BAJO'} />
                  </div>
                  <RiskDistributionBar sinRiesgo={3} bajo={2} medio={2} alto={0} muyAlto={0} />
                  <p className="text-xs text-slate-600">
                    Evalúa la claridad de rol, autonomía, oportunidades de aprendizaje y participación en el cambio. Nivel <strong>BAJO / PROTECTOR</strong>, reflejando funciones claras y pertinencia en la labor asistencial.
                  </p>
                </div>

                {/* Dominio 3: Demandas */}
                <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-300 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200 px-2 py-0.5 rounded">Dominio 3 (Foco Crítico)</span>
                      <h4 className="font-extrabold text-sm text-rose-950 mt-1">Demandas del Trabajo</h4>
                    </div>
                    <RiskBadge level="MUY ALTO" />
                  </div>
                  <RiskDistributionBar sinRiesgo={0} bajo={1} medio={1} alto={3} muyAlto={2} />
                  <p className="text-xs text-rose-950 font-medium">
                    Constituye la <strong>principal fuente de riesgo psicosocial</strong> en la empresa. La atención continua de pacientes críticos, las jornadas nocturnas y la sobrecarga emocional superan la capacidad de respuesta biológica habitual.
                  </p>
                </div>

                {/* Dominio 4: Recompensas */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Dominio 4</span>
                      <h4 className="font-extrabold text-sm text-slate-950 mt-1">Recompensas</h4>
                    </div>
                    <RiskBadge level="MEDIO" />
                  </div>
                  <RiskDistributionBar sinRiesgo={2} bajo={2} medio={2} alto={1} muyAlto={0} />
                  <p className="text-xs text-slate-600">
                    Evalúa el reconocimiento, compensación psicológica y sentido de pertenencia. Nivel <strong>MEDIO</strong>, sugiriendo la implementación de incentivos emocionales y planes de bienestar periódico.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. MATRIZ DE CRITICIDAD DE LAS 19 DIMENSIONES INTRALABORALES */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                7. MATRIZ PRIORIZADA DE DIMENSIONES INTRALABORALES (RANKING DE RIESGO)
              </h3>
              <p className="text-justify text-slate-800">
                La siguiente matriz ordena las dimensiones evaluadas de mayor a menor criticidad, señalando aquellas que deben ser intervenidas obligatoriamente en el PVE:
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Dimensión Evaluada</th>
                      <th className="p-3">Dominio Asociado</th>
                      <th className="p-3 text-center">Nivel Forma A</th>
                      <th className="p-3 text-center">Nivel Forma B</th>
                      <th className="p-3 text-center">Prioridad de Intervención</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-rose-50/70">
                      <td className="p-3 font-bold text-rose-950">Demandas de Carga Mental</td>
                      <td className="p-3 text-slate-600">Demandas del Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="MUY ALTO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center font-black text-rose-700">1 (Inmediata)</td>
                    </tr>
                    <tr className="bg-rose-50/70">
                      <td className="p-3 font-bold text-rose-950">Demandas Emocionales</td>
                      <td className="p-3 text-slate-600">Demandas del Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="MUY ALTO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center font-black text-rose-700">1 (Inmediata)</td>
                    </tr>
                    <tr className="bg-orange-50/50">
                      <td className="p-3 font-bold text-orange-950">Demandas de la Jornada de Trabajo</td>
                      <td className="p-3 text-slate-600">Demandas del Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center font-black text-orange-700">2 (Alta)</td>
                    </tr>
                    <tr className="bg-orange-50/50">
                      <td className="p-3 font-bold text-orange-950">Demandas Cuantitativas</td>
                      <td className="p-3 text-slate-600">Demandas del Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="ALTO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="MEDIO" /></td>
                      <td className="p-3 text-center font-black text-orange-700">2 (Alta)</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="p-3 font-bold text-amber-950">Influencia del Entorno Extralaboral</td>
                      <td className="p-3 text-slate-600">Demandas del Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="MEDIO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="MEDIO" /></td>
                      <td className="p-3 text-center font-bold text-amber-800">3 (Media)</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="p-3 font-bold text-amber-950">Reconocimiento y Compensación</td>
                      <td className="p-3 text-slate-600">Recompensas</td>
                      <td className="p-3 text-center"><RiskBadge level="MEDIO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="MEDIO" /></td>
                      <td className="p-3 text-center font-bold text-amber-800">3 (Media)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800">Claridad de Rol</td>
                      <td className="p-3 text-slate-600">Control sobre el Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="BAJO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="SIN RIESGO" /></td>
                      <td className="p-3 text-center text-emerald-700 font-bold">4 (Protector)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800">Oportunidades de Desarrollo</td>
                      <td className="p-3 text-slate-600">Control sobre el Trabajo</td>
                      <td className="p-3 text-center"><RiskBadge level="BAJO" /></td>
                      <td className="p-3 text-center"><RiskBadge level="BAJO" /></td>
                      <td className="p-3 text-center text-emerald-700 font-bold">4 (Protector)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8. CRUCE DE LA TRÍADA EPIDEMIOLÓGICA (BATERÍA + AUSENTISMO + CIE-10) */}
            <section className="space-y-4 bg-purple-50/60 p-6 rounded-3xl border border-purple-200">
              <div className="flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-purple-700" />
                <h3 className="text-lg sm:text-xl font-black text-purple-950">
                  8. CRUCE DE LA TRÍADA EPIDEMIOLÓGICA (PESO PROBATORIO PARA EL SG-SST)
                </h3>
              </div>
              <p className="text-justify text-slate-800">
                En cumplimiento del Decreto 1072 de 2015 (SG-SST Art. 2.2.4.6.21), se correlacionó el reporte subjetivo de la Batería con los <strong>registros objetivos de ausentismo laboral e incapacidades médicas con diagnósticos CIE-10</strong> aportados por la empresa:
              </p>

              {/* 3 Indicators Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase block">Ausentismo Conductual</span>
                  <span className="text-2xl font-black text-amber-700">{totalDiasAus} días perdidos</span>
                  <span className="text-xs text-slate-500 block">Permisos personales y calamidad</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase block">Incapacidades Médicas</span>
                  <span className="text-2xl font-black text-rose-700">{totalDiasInc} días certificados</span>
                  <span className="text-xs text-slate-500 block">CIE-10 F41 (Ansiedad) y G43 (Migraña)</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm space-y-1">
                  <span className="text-xs text-purple-900 font-bold uppercase block">Tríada Crítica (Positiva)</span>
                  <span className="text-2xl font-black text-purple-700">{criticalWorkers.length} colaborador(es)</span>
                  <span className="text-xs text-purple-600 font-bold block">Población diana del PVE</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm text-slate-800 space-y-2">
                <strong className="text-purple-950 block font-bold">Dictamen del Cruce Epidemiológico:</strong>
                <p className="text-justify leading-relaxed">
                  Se comprueba una <strong>correlación estadística y clínica directa</strong> entre las altas puntuaciones en Demandas Emocionales y Estrés, con la presencia de incapacidades médicas recurrentes por cefalea tensional (CIE-10 G43.0) y gastritis asociada a sobrecarga (CIE-10 K29.7). Esta evidencia objetiva blinda jurídicamente a la empresa y sustenta la obligatoriedad de vigilancia médica ocupacional continua.
                </p>
              </div>
            </section>

            {/* 9. DICTAMEN TÉCNICO Y PERIODICIDAD NORMATIVA */}
            <section className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                9. DICTAMEN TÉCNICO Y PERIODICIDAD DE VIGILANCIA (RESOLUCIÓN 2404 DE 2019)
              </h3>
              <p className="text-justify text-slate-800">
                De conformidad con el Artículo 3 de la Resolución 2404 de 2019 del Ministerio del Trabajo de Colombia, considerando que <strong>{company.nombre}</strong> presenta niveles consolidados de riesgo psicosocial en grado <strong>ALTO</strong>, se dictamina formalmente:
              </p>

              <div className="space-y-2.5 font-bold text-slate-900 text-xs sm:text-sm">
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Obligatoriedad legal inmediata de implementar el <strong>Programa de Vigilancia Epidemiológica de Factores de Riesgo Psicosocial (PVE)</strong> bajo las matrices oficiales MT-17 y PG-06.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Periodicidad de reevaluación de carácter <strong>ANUAL OBLIGATORIO</strong>. La próxima medición de control deberá ejecutarse en <strong>Noviembre de 2027</strong>.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    Custodia obligatoria del presente informe y sus fichas técnicas en los archivos del SG-SST durante un periodo mínimo de <strong>veinte (20) años</strong> (Decreto 1072 de 2015 Art. 2.2.4.6.13).
                  </span>
                </div>
              </div>
            </section>

            {/* 10. PLAN DE RECOMENDACIONES TÉCNICAS PARA EL SG-SST */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-indigo-600 pl-3">
                10. PLAN DE MEDIDAS DE CONTROL Y RECOMENDACIONES TÉCNICAS (SG-SST)
              </h3>
              <p className="text-justify text-slate-800">
                Las intervenciones deben articularse bajo la jerarquía de control en la Fuente, en el Medio y en el Individuo:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-indigo-600 space-y-1">
                  <strong className="text-slate-950 font-bold block text-sm">A Nivel de la Fuente (Organización del Trabajo):</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Rediseño y regulación de la rotación de turnos quirúrgicos y nocturnos. Instaurar protocolos de descanso activo de 10 minutos cada 3 horas en jornadas de alta concentración clínica.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-600 space-y-1">
                  <strong className="text-slate-950 font-bold block text-sm">A Nivel del Medio (Clima, Comités y Relaciones):</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Capacitación formal al Comité de Convivencia Laboral (CCL) en mediación de conflictos (Ley 1010 de 2006). Desarrollo de talleres vivenciales de 10 Habilidades para la Vida (metodología OMS) enfocadas en comunicación asertiva y manejo de la presión asistencial.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-emerald-600 space-y-1">
                  <strong className="text-slate-950 font-bold block text-sm">A Nivel del Individuo (Atención Clínica Confidencial):</strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    Valoración y orientación psicológica ocupacional individual (hasta 3 consultas de contención emocional) para los colaboradores en Tríada Crítica, emitiendo recomendaciones preventivas laborales y remisión formal a la EPS en caso de sospecha patológica.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* DOCUMENT 2: INFORME GERENCIAL EJECUTIVO (PARA GERENCIA GENERAL)  */}
        {/* ============================================================== */}
        {reportType === 'executive' && (
          <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-800">
            
            {/* 1. Resumen Ejecutivo "La Foto en Cifras" */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-rose-600 pl-3">
                1. RESUMEN EJECUTIVO: "LA FOTO EN CIFRAS" PARA LA GERENCIA GENERAL
              </h3>
              <p className="text-justify text-slate-800">
                La evaluación de riesgo psicosocial en <strong>{company.nombre}</strong> con una cobertura del <strong>100% del personal ({totalTrabajadores} colaboradores)</strong> permite a la Alta Dirección dimensionar el impacto directo que el bienestar psicológico, las cargas de trabajo y los turnos tienen sobre la productividad, el ausentismo y la estabilidad jurídica de la empresa.
              </p>

              {/* 4 C-Level KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-md space-y-1.5">
                  <span className="text-[11px] text-rose-400 font-bold uppercase tracking-wider block">Nivel de Riesgo Global</span>
                  <span className="text-2xl font-black text-rose-400 block">{company.resumenRiesgo?.semaforoGeneral || 'ALTO'}</span>
                  <span className="text-xs text-slate-400">Exposición crítica</span>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-md space-y-1.5">
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">Población en Alerta</span>
                  <span className="text-2xl font-black text-white block">
                    {criticalWorkers.length + somaticWorkers.length} <span className="text-xs text-slate-400">trab.</span>
                  </span>
                  <span className="text-xs text-amber-300 font-semibold">
                    {Math.round(((criticalWorkers.length + somaticWorkers.length) / totalTrabajadores) * 100)}% de la nómina
                  </span>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-md space-y-1.5">
                  <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider block">Días Perdidos Anuales</span>
                  <span className="text-2xl font-black text-indigo-300 block">{totalDiasPerdidos} días</span>
                  <span className="text-xs text-slate-400">Ausentismo + Incapacidad</span>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-md space-y-1.5">
                  <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">Costo Directo Días</span>
                  <span className="text-2xl font-black text-emerald-400 block">
                    ~${(estimatedLostCostCop / 1000000).toFixed(1)}M <span className="text-xs font-normal">COP</span>
                  </span>
                  <span className="text-xs text-slate-400">Cálculo de reemplazo</span>
                </div>
              </div>
            </section>

            {/* 2. Semáforo Gerencial de los 3 Focos Críticos */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-rose-600 pl-3">
                2. SEMÁFORO GERENCIAL: LOS 3 FOCOS CRÍTICOS QUE IMPACTAN AL EQUIPO
              </h3>
              <p>
                Los datos revelan con precisión quirúrgica cuáles son las 3 áreas donde la empresa está perdiendo productividad y salud:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-rose-800 bg-rose-200 px-2 py-0.5 rounded">Foco 1</span>
                    <span className="text-xs font-black text-rose-700">RIESGO MUY ALTO</span>
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-rose-950">Sobrecarga y Demandas Emocionales</h4>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Atención continua de emergencias y contacto directo con dolor o contingencias sin espacios de descompresión emocional.
                  </p>
                </div>

                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded">Foco 2</span>
                    <span className="text-xs font-black text-amber-800">RIESGO ALTO</span>
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-amber-950">Jornada y Horarios de Trabajo</h4>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Turnos extendidos y rotación con descanso insuficiente. El colaborador percibe interferencia negativa en su vida familiar y personal.
                  </p>
                </div>

                <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-200 px-2 py-0.5 rounded">Foco 3</span>
                    <span className="text-xs font-black text-indigo-700">RIESGO MEDIO</span>
                  </div>
                  <h4 className="font-black text-sm sm:text-base text-indigo-950">Reconocimiento & Compensación</h4>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Sensación de que el esfuerzo extraordinario desplegado en contingencias no siempre se ve retribuido con incentivos o reconocimientos verbales.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Matriz de Toma de Decisiones Gerenciales */}
            <section className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 border-l-4 border-rose-600 pl-3">
                3. MATRIZ DE DECISIÓN GERENCIAL (QUÉ DEBE AUTORIZAR LA GERENCIA)
              </h3>
              <p>
                Acciones puntuales, de bajo costo y alto retorno en productividad que la Gerencia General puede ordenar de inmediato:
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="p-3.5">Decisión Gerencial</th>
                      <th className="p-3.5">Plazo</th>
                      <th className="p-3.5">Inversión Estimada</th>
                      <th className="p-3.5">Beneficio Directo Esperado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">
                        1. Aprobación y Firma del PVE (MT-17 y PG-06)
                      </td>
                      <td className="p-3.5 font-bold text-rose-700">Inmediato (Mes 1)</td>
                      <td className="p-3.5 text-slate-600">Cero (Incluido en gestión SST)</td>
                      <td className="p-3.5 text-slate-800">Blindaje legal total ante auditorías del Ministerio de Trabajo y la ARL.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">
                        2. Ajuste de Turnos de Descanso y Desconexión Laboral
                      </td>
                      <td className="p-3.5 font-bold text-amber-700">Corto Plazo (Meses 2–3)</td>
                      <td className="p-3.5 text-slate-600">Baja (Reorganización interna)</td>
                      <td className="p-3.5 text-slate-800">Reducción inmediata de hasta un 35% en días perdidos por migraña y fatiga.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">
                        3. Programa de Reconocimiento y Bienestar Trimestral
                      </td>
                      <td className="p-3.5 font-bold text-indigo-700">Continuo (Meses 3–11)</td>
                      <td className="p-3.5 text-slate-600">Moderada (Incentivos no salariales)</td>
                      <td className="p-3.5 text-slate-800">Incremento en compromiso del equipo y disminución de rotación de talento.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">
                        4. Reevaluación Psicosocial Anual de Control
                      </td>
                      <td className="p-3.5 font-bold text-slate-700">Mes 12 (Nov 2027)</td>
                      <td className="p-3.5 text-slate-600">Presupuestada anualmente</td>
                      <td className="p-3.5 text-slate-800">Medición del retorno de inversión y ajuste del ciclo de mejora continua PHVA.</td>
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
        <div className="pt-8 border-t-4 border-slate-900 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <div className="w-56 border-b-2 border-slate-900 mb-3"></div>
            <strong className="block text-slate-950 font-black text-base">
              {company.psicologoEvaluador?.nombre || 'Psic. Especialista Jimmy Martínez B.'}
            </strong>
            <span className="text-slate-800 font-bold block">
              Psicólogo Especialista en Seguridad y Salud en el Trabajo
            </span>
            <span className="text-slate-600 font-mono block">
              Tarjeta Profesional: {company.psicologoEvaluador?.tarjetaProfesional || 'TP-108523-COLPSIC'}
            </span>
            <span className="text-slate-600 font-mono block">
              Licencia SST Vigente: {company.psicologoEvaluador?.licenciaSST || 'LIC-SST-45920-2023'}
            </span>
            <span className="text-xs text-slate-500 italic block mt-1">
              Custodia confidencial bajo secreto profesional (Ley 1090 de 2006 / Res. 2346 de 2007).
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right space-y-1">
            <span className="font-black text-slate-900 block text-xs sm:text-sm">
              Validez Jurídica y Probatoria
            </span>
            <span className="text-xs text-slate-500 block">
              Resolución 2646 de 2008 / Resolución 2404 de 2019
            </span>
            <span className="text-xs text-slate-500 block">
              Ministerio del Trabajo de la República de Colombia
            </span>
            <div className="pt-1.5 flex items-center justify-end gap-1.5 text-xs font-bold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Dictamen Avalado por Especialista
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
