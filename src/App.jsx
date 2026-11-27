import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import WorkersView from './components/WorkersView';
import FormulaAuditorView from './components/FormulaAuditorView';
import ReportsView from './components/ReportsView';
import CreditsSaasView from './components/CreditsSaasView';
import WorkerSurveyView from './components/WorkerSurveyView';
import CompanyManagementView from './components/CompanyManagementView';
import PveManagementView from './components/PveManagementView';
import { 
  INITIAL_COMPANIES, 
  INITIAL_COMPANY_DATA_MAP, 
  SPECIALIST_PROFILE 
} from './data/mockData';
import { Coins, X, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('companies'); // Start in companies directory or dashboard
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [activeCompanyId, setActiveCompanyId] = useState('emp-001');
  const [companyDataMap, setCompanyDataMap] = useState(INITIAL_COMPANY_DATA_MAP);
  const [credits, setCredits] = useState(SPECIALIST_PROFILE.saldoCreditosSaaS);

  const [selectedWorkerId, setSelectedWorkerId] = useState('B1');
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isSurveyMode, setIsSurveyMode] = useState(false);
  const [surveyCompanyId, setSurveyCompanyId] = useState('emp-001');

  // Derive active company & its current data
  const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0];
  const activeData = companyDataMap[activeCompanyId] || {
    workers: [],
    stats: {
      totalParticipantes: 0,
      participacionFormaA: 0,
      participacionFormaB: 0,
      factorIntralaboralGlobal: { formaA: 'SIN EVALUAR', formaB: 'SIN EVALUAR' },
      dominios: [],
      factorExtralaboralGlobal: 'SIN EVALUAR',
      estresGlobal: 'SIN EVALUAR',
      dimensionesCriticas: [],
      dimensionesProtectoras: []
    }
  };

  const activeWorkers = activeData.workers || [];

  // Check URL params on load (e.g. ?survey=true or ?companyId=emp-002&survey=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cId = params.get('companyId');
    if (cId && companies.some(c => c.id === cId)) {
      setActiveCompanyId(cId);
      setSurveyCompanyId(cId);
    }
    if (params.get('survey') === 'true') {
      setIsSurveyMode(true);
    }
  }, []);

  // Recharge credits
  const handleRechargeCredits = (amount) => {
    setCredits(prev => ({
      ...prev,
      creditosComprados: prev.creditosComprados + amount,
      creditosDisponibles: prev.creditosDisponibles + amount
    }));
  };

  // Recharge PVE licenses
  const handleRechargePveLicenses = (licenses) => {
    setCredits(prev => ({
      ...prev,
      creditosPveComprados: (prev.creditosPveComprados || 0) + licenses,
      creditosPveDisponibles: (prev.creditosPveDisponibles || 0) + licenses
    }));
  };

  // Unlock PVE module for a company
  const handleUnlockPve = (companyId, tokensToSpend = null) => {
    if (tokensToSpend) {
      setCredits(prev => ({
        ...prev,
        creditosConsumidos: prev.creditosConsumidos + tokensToSpend,
        creditosDisponibles: prev.creditosDisponibles - tokensToSpend
      }));
    } else {
      setCredits(prev => ({
        ...prev,
        creditosPveConsumidos: (prev.creditosPveConsumidos || 0) + 1,
        creditosPveDisponibles: Math.max(0, (prev.creditosPveDisponibles || 1) - 1)
      }));
    }

    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return {
          ...c,
          pveStatus: 'active',
          pveActivadoFecha: new Date().toISOString().split('T')[0],
          pveLicenciaCodigo: `LIC-PVE-2026-${Math.floor(100 + Math.random() * 900)}`
        };
      }
      return c;
    }));

    alert(`¡Módulo PVE activado con éxito para la empresa!`);
  };

  // Add individual worker
  const handleAddWorker = (newWorker) => {
    setCompanyDataMap(prev => {
      const current = prev[activeCompanyId] || { workers: [] };
      return {
        ...prev,
        [activeCompanyId]: {
          ...current,
          workers: [...current.workers, newWorker]
        }
      };
    });

    setCredits(prev => ({
      ...prev,
      creditosConsumidos: prev.creditosConsumidos + 1,
      creditosDisponibles: prev.creditosDisponibles - 1
    }));

    // Update company count
    setCompanies(prev => prev.map(c => {
      if (c.id === activeCompanyId) {
        return {
          ...c,
          totalParticipantes: c.totalParticipantes + 1,
          participacionA: newWorker.formType === 'A' ? c.participacionA + 1 : c.participacionA,
          participacionB: newWorker.formType === 'B' ? c.participacionB + 1 : c.participacionB
        };
      }
      return c;
    }));
  };

  // Import batch of workers (from 1-sheet Excel)
  const handleImportBatchWorkers = (newWorkersList) => {
    const count = newWorkersList.length;
    setCompanyDataMap(prev => {
      const current = prev[activeCompanyId] || { workers: [] };
      return {
        ...prev,
        [activeCompanyId]: {
          ...current,
          workers: [...current.workers, ...newWorkersList]
        }
      };
    });

    setCredits(prev => ({
      ...prev,
      creditosConsumidos: prev.creditosConsumidos + count,
      creditosDisponibles: prev.creditosDisponibles - count
    }));

    const countA = newWorkersList.filter(w => w.formType === 'A').length;
    const countB = newWorkersList.filter(w => w.formType === 'B').length;

    setCompanies(prev => prev.map(c => {
      if (c.id === activeCompanyId) {
        return {
          ...c,
          totalParticipantes: c.totalParticipantes + count,
          participacionA: c.participacionA + countA,
          participacionB: c.participacionB + countB
        };
      }
      return c;
    }));

    alert(`¡Éxito! Se han importado ${count} colaboradores a ${activeCompany.nombre}. Se consumieron ${count} créditos.`);
  };

  // Submit survey from worker survey view
  const handleSubmitSurvey = (newEvaluatedWorker) => {
    const targetCompId = surveyCompanyId || activeCompanyId;
    setCompanyDataMap(prev => {
      const current = prev[targetCompId] || { workers: [] };
      return {
        ...prev,
        [targetCompId]: {
          ...current,
          workers: [...current.workers, newEvaluatedWorker]
        }
      };
    });

    setCredits(prev => ({
      ...prev,
      creditosConsumidos: prev.creditosConsumidos + 1,
      creditosDisponibles: prev.creditosDisponibles - 1
    }));

    setCompanies(prev => prev.map(c => {
      if (c.id === targetCompId) {
        return {
          ...c,
          totalParticipantes: c.totalParticipantes + 1,
          participacionA: newEvaluatedWorker.formType === 'A' ? c.participacionA + 1 : c.participacionA,
          participacionB: newEvaluatedWorker.formType === 'B' ? c.participacionB + 1 : c.participacionB
        };
      }
      return c;
    }));
  };

  // Create new company
  const handleCreateCompany = (newCompany) => {
    setCompanies(prev => [...prev, newCompany]);
    setCompanyDataMap(prev => ({
      ...prev,
      [newCompany.id]: {
        company: newCompany,
        workers: [],
        stats: {
          totalParticipantes: 0,
          participacionFormaA: 0,
          participacionFormaB: 0,
          factorIntralaboralGlobal: { formaA: 'SIN EVALUAR', formaB: 'SIN EVALUAR' },
          dominios: [],
          factorExtralaboralGlobal: 'SIN EVALUAR',
          estresGlobal: 'SIN EVALUAR',
          dimensionesCriticas: [],
          dimensionesProtectoras: []
        }
      }
    }));
    setActiveCompanyId(newCompany.id);
    setActiveTab('dashboard');
    alert(`Empresa "${newCompany.nombre}" registrada con éxito.`);
  };

  // Select company and navigate to dashboard
  const handleSelectCompany = (companyId) => {
    setActiveCompanyId(companyId);
    setActiveTab('dashboard');
  };

  // Open survey for specific company
  const handleOpenSurveyForCompany = (companyId) => {
    setSurveyCompanyId(companyId);
    setIsSurveyMode(true);
  };

  // Open Excel uploader for specific company
  const handleOpenExcelForCompany = (companyId) => {
    setActiveCompanyId(companyId);
    setActiveTab('workers');
  };

  // Select worker for audit
  const handleSelectWorkerForAudit = (workerId) => {
    setSelectedWorkerId(workerId);
    setActiveTab('auditor');
  };

  // If in survey mode, render full screen survey with selected company
  if (isSurveyMode) {
    const surveyComp = companies.find(c => c.id === surveyCompanyId) || activeCompany;
    return (
      <WorkerSurveyView
        company={surveyComp}
        onSubmitSurvey={handleSubmitSurvey}
        onExitSurvey={() => setIsSurveyMode(false)}
      />
    );
  }

  // Inject current specialist, active stats and credits into active company for reports and views
  const companyForViews = {
    ...activeCompany,
    stats: activeData.stats,
    psicologoEvaluador: SPECIALIST_PROFILE,
    saldoCreditosSaaS: credits
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companies={companies}
        activeCompany={activeCompany}
        onSelectCompany={setActiveCompanyId}
        credits={credits}
        onOpenCreditModal={() => setIsCreditModalOpen(true)}
        onOpenSurvey={() => {
          setSurveyCompanyId(activeCompanyId);
          setIsSurveyMode(true);
        }}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Tab 0: Companies Directory */}
        {activeTab === 'companies' && (
          <CompanyManagementView
            companies={companies}
            activeCompanyId={activeCompanyId}
            onSelectCompany={handleSelectCompany}
            onCreateCompany={handleCreateCompany}
            onOpenSurveyForCompany={handleOpenSurveyForCompany}
            onOpenExcelForCompany={handleOpenExcelForCompany}
          />
        )}

        {/* Tab 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            company={companyForViews}
            workers={activeWorkers}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Tab 2: Workers */}
        {activeTab === 'workers' && (
          <WorkersView
            workers={activeWorkers}
            company={companyForViews}
            onAddWorker={handleAddWorker}
            onImportBatchWorkers={handleImportBatchWorkers}
            onSelectWorkerForAudit={handleSelectWorkerForAudit}
          />
        )}

        {/* Tab 3: Formula Auditor */}
        {activeTab === 'auditor' && (
          <FormulaAuditorView
            workers={activeWorkers}
            selectedWorkerId={selectedWorkerId}
            onSelectWorker={setSelectedWorkerId}
          />
        )}

        {/* Tab 4: Official Reports */}
        {activeTab === 'reports' && (
          <ReportsView
            company={companyForViews}
            workers={activeWorkers}
          />
        )}

        {/* Tab 5: PVE / SVE Module */}
        {activeTab === 'pve' && (
          <PveManagementView
            company={companyForViews}
            workers={activeWorkers}
            credits={credits}
            onUnlockPve={handleUnlockPve}
            onRechargeCredits={handleRechargeCredits}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Tab 6: SaaS Credits */}
        {activeTab === 'credits' && (
          <CreditsSaasView
            company={companyForViews}
            onRechargeCredits={handleRechargeCredits}
            onRechargePveLicenses={handleRechargePveLicenses}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Batería de Riesgo Psicosocial Pro • Plataforma Multi-Empresa SaaS SST
          </p>
          <p>
            Desarrollado bajo los lineamientos técnicos de la Resolución 2646 de 2008, 2404 de 2019, 2764 de 2022 y Baremos de la Pontificia Universidad Javeriana.
          </p>
        </div>
      </footer>

      {/* Quick Credit Recharge Modal */}
      {isCreditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recargar Créditos</h3>
                  <p className="text-[11px] text-slate-500">Saldo actual: {credits.creditosDisponibles} disp.</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreditModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  handleRechargeCredits(50);
                  setIsCreditModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all flex justify-between items-center text-xs"
              >
                <div>
                  <strong className="block text-slate-900">+50 Créditos (Evaluaciones)</strong>
                  <span className="text-slate-500 text-[11px]">$750.000 COP</span>
                </div>
                <span className="text-indigo-600 font-bold text-[11px]">Recargar</span>
              </button>

              <button
                onClick={() => {
                  handleRechargeCredits(150);
                  setIsCreditModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 transition-all flex justify-between items-center text-xs"
              >
                <div>
                  <strong className="block text-indigo-950">+150 Créditos (Recomendado)</strong>
                  <span className="text-slate-500 text-[11px]">$1.800.000 COP</span>
                </div>
                <span className="text-indigo-600 font-bold text-[11px]">Recargar</span>
              </button>

              <button
                onClick={() => {
                  handleRechargeCredits(500);
                  setIsCreditModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all flex justify-between items-center text-xs"
              >
                <div>
                  <strong className="block text-slate-900">+500 Créditos Corporativos</strong>
                  <span className="text-slate-500 text-[11px]">$5.000.000 COP</span>
                </div>
                <span className="text-indigo-600 font-bold text-[11px]">Recargar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
