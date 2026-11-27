import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  PlusCircle, 
  Building2, 
  FileText, 
  BarChart3, 
  Users, 
  Sliders, 
  CreditCard 
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, company, onOpenCreditModal }) {
  const credits = company.saldoCreditosSaaS;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Top Banner: Specialist & SaaS Credits Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Norma Res. 2404/2019 & Res. 2764/2022
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">
              Evaluador: <strong className="text-white">{company.psicologoEvaluador.nombre}</strong> (Lic. SST: {company.psicologoEvaluador.licenciaSST})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Bolsa de Créditos:</span>
              <span className="text-emerald-400 font-bold text-sm">{credits.creditosDisponibles} disp.</span>
              <span className="text-slate-400 text-[11px]">({credits.creditosConsumidos} usados)</span>
            </div>
            <button
              onClick={onOpenCreditModal}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-2.5 py-1 rounded shadow text-xs transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Recargar
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Batería Psicosocial <span className="text-indigo-600">PRO</span>
              </h1>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold px-2 py-0.5 rounded-full">
                SaaS Multi-Empresa
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              Empresa activa: <strong className="text-slate-900 font-semibold">{company.nombre}</strong> (NIT: {company.nit})
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('workers')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'workers'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            Colaboradores ({company.saldoCreditosSaaS.creditosConsumidos})
          </button>

          <button
            onClick={() => setActiveTab('auditor')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'auditor'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Auditor de Fórmulas Javeriana
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'reports'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            Informes Oficiales
          </button>

          <button
            onClick={() => setActiveTab('credits')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'credits'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            Modelo SaaS & Créditos
          </button>
        </nav>
      </div>
    </header>
  );
}
