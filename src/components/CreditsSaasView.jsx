import React, { useState } from 'react';
import { 
  Coins, 
  CreditCard, 
  Sparkles, 
  Building2, 
  Link2, 
  QrCode, 
  CheckCircle2, 
  TrendingUp, 
  History, 
  ShieldCheck, 
  Users, 
  Lock,
  Stethoscope,
  Activity,
  Calculator,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';

export default function CreditsSaasView({ company, onRechargeCredits, onRechargePveLicenses }) {
  const credits = company.saldoCreditosSaaS;
  const [activeCreditTab, setActiveCreditTab] = useState('bateria'); // 'bateria' | 'pve' | 'benchmark'
  const [calculatorWorkers, setCalculatorWorkers] = useState(50);
  const [copiedLink, setCopiedLink] = useState(false);

  // Evaluation Packages
  const BATERIA_PACKAGES = [
    {
      id: 'pack-50',
      creditos: 50,
      titulo: 'Paquete Inicial Mipyme',
      precioCop: '$750.000 COP',
      precioUnitario: '$15.000 COP / evaluación',
      descripcion: 'Ideal para psicólogos independientes que evalúan 1 o 2 empresas pequeñas.',
      popular: false
    },
    {
      id: 'pack-150',
      creditos: 150,
      titulo: 'Paquete Consultor Profesional',
      precioCop: '$1.800.000 COP',
      precioUnitario: '$12.000 COP / evaluación',
      descripcion: 'El más solicitado por consultores SST con varias empresas en cartera.',
      popular: true
    },
    {
      id: 'pack-500',
      creditos: 500,
      titulo: 'Paquete Corporativo Mayorista',
      precioCop: '$5.000.000 COP',
      precioUnitario: '$10.000 COP / evaluación',
      descripcion: 'Diseñado para consultoras y firmas líderes de seguridad y salud en el trabajo.',
      popular: false
    }
  ];

  // PVE License Packages
  const PVE_PACKAGES = [
    {
      id: 'pve-1',
      licencias: 1,
      titulo: '1 Licencia PVE Anual',
      precioCop: '$450.000 COP',
      precioUnitario: '$450.000 COP / empresa / año',
      descripcion: 'Habilita el módulo PVE completo (MT-17, PG-06, 4 Indicadores, Casos Clínicos) para 1 empresa con riesgo Alto o Muy Alto.',
      popular: false
    },
    {
      id: 'pve-3',
      licencias: 3,
      titulo: 'Pack 3 Licencias PVE Consultor',
      precioCop: '$1.200.000 COP',
      precioUnitario: '$400.000 COP / empresa / año',
      descripcion: 'Ahorro de $150.000 COP. Diseñado para psicólogos con cartera de empresas en riesgo alto.',
      popular: true
    },
    {
      id: 'pve-10',
      licencias: 10,
      titulo: 'Pack 10 Licencias PVE Corporativo',
      precioCop: '$3.500.000 COP',
      precioUnitario: '$350.000 COP / empresa / año',
      descripcion: 'Tarifa preferencial para consultoras HSEQ que gestionan vigilancia epidemiológica anual.',
      popular: false
    }
  ];

  const handlePurchaseBateria = (pack) => {
    onRechargeCredits(pack.creditos);
    alert(`¡Recarga exitosa! Se han acreditado ${pack.creditos} evaluaciones a la cuenta del especialista.`);
  };

  const handlePurchasePve = (pack) => {
    if (onRechargePveLicenses) {
      onRechargePveLicenses(pack.licencias);
    } else {
      onRechargeCredits(pack.licencias * 15);
    }
    alert(`¡Licencia PVE adquirida! Se han acreditado ${pack.licencias} licencia(s) SVE a su cuenta.`);
  };

  // ROI Calculator estimations in Colombia
  const saasCost = calculatorWorkers * 12000;
  const clientMinPrice = calculatorWorkers * 45000;
  const clientAvgPrice = calculatorWorkers * 65000;
  const pveAdditionalRevenue = 2500000; // Average price charged to company for SVE in Colombia
  const pveSaasCost = 450000;

  return (
    <div className="space-y-6">
      {/* SaaS Balance Dual Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase tracking-wide">
              <Coins className="w-4 h-4 text-amber-400" />
              Billetera de Negocio SaaS — Psicólogos Especialistas SST
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Gestión de Créditos & Licenciamiento PVE
            </h2>
            <p className="text-slate-300 text-xs max-w-xl font-medium">
              Controle sus evaluaciones de la Batería de Riesgo Psicosocial y sus licencias para el Módulo de Vigilancia Epidemiológica (PVE) bajo la Resolución 2404 de 2019.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Evaluations Balance */}
            <div className="bg-slate-800/90 border border-slate-700 text-white rounded-xl p-4 shadow-xl space-y-2 min-w-[200px]">
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                Evaluaciones Batería
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{credits.creditosDisponibles}</span>
                <span className="text-xs text-slate-400 font-semibold">disp.</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Usados: <strong className="text-white">{credits.creditosConsumidos}</strong> | Total: {credits.creditosComprados}
              </div>
            </div>

            {/* PVE Licenses Balance */}
            <div className="bg-indigo-900/50 border border-indigo-700/60 text-white rounded-xl p-4 shadow-xl space-y-2 min-w-[200px]">
              <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider block">
                Licencias PVE / SVE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">{credits.creditosPveDisponibles ?? 2}</span>
                <span className="text-xs text-slate-300 font-semibold">empresas disp.</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Usadas: <strong className="text-white">{credits.creditosPveConsumidos ?? 1}</strong> | Total: {(credits.creditosPveComprados ?? 3)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveCreditTab('bateria')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeCreditTab === 'bateria'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-500" />
          Paquetes de Evaluaciones (Batería)
        </button>

        <button
          onClick={() => setActiveCreditTab('pve')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeCreditTab === 'pve'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-rose-500" />
          Licencias del Módulo PVE / SVE
        </button>

        <button
          onClick={() => setActiveCreditTab('benchmark')}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs border-b-2 transition-all ${
            activeCreditTab === 'benchmark'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-600" />
          Análisis de Mercado & Calculadora de Rentabilidad (Colombia)
        </button>
      </div>

      {/* ==========================================
          TAB 1: BATERIA PACKAGES
          ========================================== */}
      {activeCreditTab === 'bateria' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Bolsas de Evaluaciones de la Batería
            </h3>
            <p className="text-xs text-slate-500">
              Cada crédito permite la recolección digital de consentimientos, aplicación de las 4 pruebas, calificación con baremos oficiales y emisión de informes individuales y consolidados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BATERIA_PACKAGES.map((pack) => (
              <div
                key={pack.id}
                className={`bg-white rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                  pack.popular
                    ? 'border-indigo-500 shadow-lg shadow-indigo-100 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                    Más Elegido
                  </span>
                )}

                <div className="space-y-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                    {pack.titulo}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">{pack.precioCop}</span>
                  </div>
                  <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {pack.precioUnitario}
                  </span>
                  <p className="text-xs text-slate-500">{pack.descripcion}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{pack.creditos} evaluaciones completas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Vigencia ilimitada (sin vencimiento)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Distribuible en múltiples empresas</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchaseBateria(pack)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      pack.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    Comprar Bolsa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: PVE / SVE LICENSES
          ========================================== */}
      {activeCreditTab === 'pve' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Licencias del Módulo PVE / SVE (Vigilancia Epidemiológica)
            </h3>
            <p className="text-xs text-slate-500">
              Se adquieren de forma independiente para las empresas que obtienen nivel de riesgo Alto o Muy Alto en la Batería, o aquellas que desean instaurar vigilancia preventiva formal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PVE_PACKAGES.map((pack) => (
              <div
                key={pack.id}
                className={`bg-white rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                  pack.popular
                    ? 'border-rose-500 shadow-lg shadow-rose-100 ring-2 ring-rose-500/20'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                    Mejor Relación Costo-Beneficio
                  </span>
                )}

                <div className="space-y-3">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                    {pack.titulo}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">{pack.precioCop}</span>
                  </div>
                  <span className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {pack.precioUnitario}
                  </span>
                  <p className="text-xs text-slate-500">{pack.descripcion}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-rose-600" />
                      <span>Segmentación en los 4 Grupos PG-06</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-rose-600" />
                      <span>Matriz PHVA MT-17 con 12 medidas de control</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-rose-600" />
                      <span>Cálculo automático de los 4 indicadores SG-SST</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-rose-600" />
                      <span>Registro clínico y remisiones confidenciales EPS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchasePve(pack)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      pack.popular
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    Adquirir Licencia PVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: MARKET BENCHMARK & ROI CALCULATOR
          ========================================== */}
      {activeCreditTab === 'benchmark' && (
        <div className="space-y-6">
          {/* Market Overview Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Estudio de Mercado Colombia (2026)
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Panorama de Competencia & Estructura de Precios en Colombia
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Datos de mercado sobre tarifas de software SaaS vs. honorarios profesionales de psicólogos especialistas en SST.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Software SaaS (Tokens)</span>
                <div className="text-lg font-black text-slate-900">$9.000 — $18.000 COP</div>
                <p className="text-[11px] text-slate-600">
                  Costo de plataformas (Prax, Cuestionarios Digitales, Psicosoft) por trabajador evaluado. No incluye interpretación ni aval legal.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                <span className="text-[10px] text-indigo-700 font-bold uppercase">Servicio Integral Especialista</span>
                <div className="text-lg font-black text-indigo-700">$45.000 — $85.000 COP</div>
                <p className="text-[11px] text-slate-600">
                  Tarifa que cobra el psicólogo con licencia SST a empresas medianas/pequeñas por persona evaluada, con informe firmado.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <span className="text-[10px] text-rose-700 font-bold uppercase">Módulo PVE / SVE Anual</span>
                <div className="text-lg font-black text-rose-700">$1.800.000 — $4.500.000 COP</div>
                <p className="text-[11px] text-slate-600">
                  Cobro por diseño, instauración del SVE y seguimiento epidemiológico anual a empresas en riesgo Alto o Muy Alto.
                </p>
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                Simulador de Ingresos y Rentabilidad para el Especialista
              </h4>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700">
                    Número de colaboradores a evaluar en la empresa cliente:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="5"
                      max="1000"
                      value={calculatorWorkers}
                      onChange={(e) => setCalculatorWorkers(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-bold text-center focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-500 font-medium">trabajadores</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Costo Plataforma SaaS (Tokens):</span>
                    <strong className="text-sm font-bold text-slate-900">
                      ${saasCost.toLocaleString('es-CO')} COP
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">Cobro al Cliente (Batería):</span>
                    <strong className="text-sm font-bold text-indigo-700">
                      ${clientAvgPrice.toLocaleString('es-CO')} COP
                    </strong>
                    <span className="text-[10px] text-slate-400 block">(a $65.000 COP / trab.)</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">+ Venta de Add-on PVE Anual:</span>
                    <strong className="text-sm font-bold text-rose-700">
                      +${pveAdditionalRevenue.toLocaleString('es-CO')} COP
                    </strong>
                    <span className="text-[10px] text-slate-400 block">(Costo SaaS: $450.000 COP)</span>
                  </div>

                  <div className="bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">
                      Ganancia Neta Especialista:
                    </span>
                    <strong className="text-base font-black text-emerald-900">
                      ${((clientAvgPrice - saasCost) + (pveAdditionalRevenue - pveSaasCost)).toLocaleString('es-CO')} COP
                    </strong>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      Margen Superior al 80%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
