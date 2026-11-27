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
  CreditCard,
  Smartphone,
  ChevronDown,
  Stethoscope,
  ShieldAlert,
  Activity,
  Presentation
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  companies,
  activeCompany, 
  onSelectCompany,
  credits,
  onOpenCreditModal, 
  onOpenSurvey 
}) {
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
              Evaluador: <strong className="text-white">Psic. Especialista Jimmy Martínez</strong> (Lic. SST: LIC-SST-45920-2023)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Open Mobile Survey Button */}
            <button
              onClick={onOpenSurvey}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded text-xs shadow-sm transition-all"
              title="Abrir vista de encuesta digital para el trabajador"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simular</span> Encuesta Móvil
            </button>

            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Bolsa:</span>
              <span className="text-emerald-400 font-bold text-sm">{credits.creditosDisponibles}</span>
              <span className="text-slate-400 text-[11px]">| PVE: <strong className="text-rose-400 font-bold">{credits.creditosPveDisponibles ?? 2} lic.</strong></span>
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

            {/* Quick Company Switcher Dropdown */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-xs text-slate-500">Cliente:</span>
              <select
                value={activeCompany.id}
                onChange={(e) => onSelectCompany(e.target.value)}
                className="text-xs font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} (NIT: {c.nit})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'companies'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Empresas ({companies.length})
          </button>

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
            Colaboradores
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
            Auditor Javeriana
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
            onClick={() => setActiveTab('socializacion')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'socializacion'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Presentation className="w-4 h-4 text-indigo-600" />
            Socialización Web
          </button>

          <button
            onClick={() => setActiveTab('triada')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'triada'
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-600" />
            Tríada Epidemiológica
          </button>

          <button
            onClick={() => setActiveTab('pve')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors relative ${
              activeTab === 'pve'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : activeCompany.pveStatus === 'active'
                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <span>PVE / SVE</span>
            {activeCompany.pveStatus === 'active' ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="PVE Activo" />
            ) : activeCompany.pveStatus === 'locked' ? (
              <span className="text-[9px] bg-rose-100 text-rose-700 px-1 py-0.2 rounded font-black">Requerido</span>
            ) : null}
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
            Créditos SaaS
          </button>
        </nav>
      </div>
    </header>
  );
}
