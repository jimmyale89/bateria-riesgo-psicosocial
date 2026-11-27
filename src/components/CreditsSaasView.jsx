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
  Lock 
} from 'lucide-react';

export default function CreditsSaasView({ company, onRechargeCredits }) {
  const credits = company.saldoCreditosSaaS;
  const [selectedPack, setSelectedPack] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const PACKAGES = [
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
      descripcion: 'Diseñado para consultoras y firmas de seguridad y salud en el trabajo.',
      popular: false
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://bateriapsicosocialpro.com/evaluacion/emp-001?token=eval_7x94b`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePurchase = (pack) => {
    onRechargeCredits(pack.creditos);
    alert(`¡Recarga exitosa! Se han acreditado ${pack.creditos} evaluaciones a la cuenta del especialista.`);
  };

  return (
    <div className="space-y-6">
      {/* SaaS Balance Card */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 text-slate-950 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/15 text-slate-950 border border-slate-950/20 text-xs font-extrabold uppercase tracking-wide">
              <Coins className="w-4 h-4 text-slate-950" />
              SaaS Multi-Tenant para Psicólogos Especialistas SST
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Gestión de Créditos & Negocio
            </h2>
            <p className="text-slate-900 text-xs max-w-xl font-medium">
              Cada crédito equivale a la tabulación, calificación oficial y emisión de diagnósticos de <strong>1 colaborador</strong>. Los créditos no vencen y pueden asignarse a cualquiera de sus empresas clientes.
            </p>
          </div>

          <div className="bg-slate-950 text-white rounded-xl p-5 shadow-2xl space-y-3 min-w-[240px]">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              Saldo de Evaluaciones
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{credits.creditosDisponibles}</span>
              <span className="text-xs text-slate-400 font-semibold">créditos disponibles</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
              <span>Consumidos: <strong className="text-white">{credits.creditosConsumidos}</strong></span>
              <span>Total Comprados: <strong className="text-white">{credits.creditosComprados}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Packages Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Adquisición de Bolsas de Créditos
          </h3>
          <p className="text-xs text-slate-500">
            Seleccione el paquete de créditos que mejor se adapte al volumen de trabajadores de sus clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGES.map((pack) => (
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
                  Más Recomendado
                </span>
              )}

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {pack.titulo}
                  </span>
                  <Coins className="w-5 h-5 text-amber-500" />
                </div>

                <div>
                  <span className="text-3xl font-black text-slate-900">{pack.creditos}</span>
                  <span className="text-xs text-slate-500 font-semibold ml-1">Créditos</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xl font-bold text-slate-900 block">{pack.precioCop}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{pack.precioUnitario}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {pack.descripcion}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handlePurchase(pack)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    pack.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Simular Recarga (+{pack.creditos} Créditos)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Survey Link Generator (Auto-Diligenciamiento con Consentimiento) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Enlace Web de Auto-Diligenciamiento Digital (Res. 2764 de 2022)
            </h3>
            <p className="text-xs text-slate-500">
              Comparta este enlace o código QR con los trabajadores de <strong>{company.nombre}</strong> para responder de forma confidencial.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-700">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis w-full">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="truncate">
              https://bateriapsicosocialpro.com/evaluacion/emp-001?token=eval_7x94b&consent=true
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex-shrink-0 bg-white border border-slate-300 hover:bg-slate-100 font-sans font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            {copiedLink ? (
              <span className="text-emerald-600 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> ¡Copiado!
              </span>
            ) : (
              'Copiar Enlace'
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Incluye <strong>Consentimiento Informado Digital</strong> obligatorio antes de iniciar.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Selección automática entre <strong>Forma A o Forma B</strong> según el cargo.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Descuento de <strong>1 crédito</strong> únicamente al finalizar el cuestionario completo.</span>
          </div>
        </div>
      </div>

      {/* Consumption History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Historial de Consumo por Empresa
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Auditoría en tiempo real</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
            <tr>
              <th className="py-2.5 px-4">Fecha</th>
              <th className="py-2.5 px-4">Empresa Evaluada</th>
              <th className="py-2.5 px-4 text-center">Tipo de Operación</th>
              <th className="py-2.5 px-4 text-center">Créditos</th>
              <th className="py-2.5 px-4 text-center">Saldo Restante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            <tr className="hover:bg-slate-50">
              <td className="py-3 px-4 font-mono text-slate-500">2026-11-20</td>
              <td className="py-3 px-4 font-bold text-slate-900">{company.nombre}</td>
              <td className="py-3 px-4 text-center">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold px-2 py-0.5 rounded">
                  Tabulación Batería (Forma A + B)
                </span>
              </td>
              <td className="py-3 px-4 text-center font-bold text-red-600 font-mono">-7</td>
              <td className="py-3 px-4 text-center font-bold text-slate-900 font-mono">143</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="py-3 px-4 font-mono text-slate-500">2026-11-01</td>
              <td className="py-3 px-4 text-slate-800">Recarga Bolsa Especialista</td>
              <td className="py-3 px-4 text-center">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2 py-0.5 rounded">
                  Compra Paquete Consultor (150)
                </span>
              </td>
              <td className="py-3 px-4 text-center font-bold text-emerald-600 font-mono">+150</td>
              <td className="py-3 px-4 text-center font-bold text-slate-900 font-mono">150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
