import React, { useState } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import WorkersView from './components/WorkersView';
import FormulaAuditorView from './components/FormulaAuditorView';
import ReportsView from './components/ReportsView';
import CreditsSaasView from './components/CreditsSaasView';
import { INITIAL_COMPANY, INITIAL_WORKERS } from './data/mockData';
import { Coins, X, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [company, setCompany] = useState(INITIAL_COMPANY);
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [selectedWorkerId, setSelectedWorkerId] = useState('B1'); // defaults to B1
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  // Recharge credits handler
  const handleRechargeCredits = (amount) => {
    setCompany(prev => ({
      ...prev,
      saldoCreditosSaaS: {
        ...prev.saldoCreditosSaaS,
        creditosComprados: prev.saldoCreditosSaaS.creditosComprados + amount,
        creditosDisponibles: prev.saldoCreditosSaaS.creditosDisponibles + amount
      }
    }));
  };

  // Add individual worker handler (consumes 1 credit)
  const handleAddWorker = (newWorker) => {
    setWorkers(prev => [...prev, newWorker]);
    setCompany(prev => ({
      ...prev,
      saldoCreditosSaaS: {
        ...prev.saldoCreditosSaaS,
        creditosConsumidos: prev.saldoCreditosSaaS.creditosConsumidos + 1,
        creditosDisponibles: prev.saldoCreditosSaaS.creditosDisponibles - 1
      }
    }));
  };

  // Batch import workers from 1-sheet Excel
  const handleImportBatchWorkers = (newWorkersList) => {
    const count = newWorkersList.length;
    setWorkers(prev => [...prev, ...newWorkersList]);
    setCompany(prev => ({
      ...prev,
      saldoCreditosSaaS: {
        ...prev.saldoCreditosSaaS,
        creditosConsumidos: prev.saldoCreditosSaaS.creditosConsumidos + count,
        creditosDisponibles: prev.saldoCreditosSaaS.creditosDisponibles - count
      }
    }));
    alert(`¡Éxito! Se han importado y calificado ${count} colaboradores. Se consumieron ${count} créditos.`);
  };

  // Select worker for audit
  const handleSelectWorkerForAudit = (workerId) => {
    setSelectedWorkerId(workerId);
    setActiveTab('auditor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        company={company}
        onOpenCreditModal={() => setIsCreditModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            company={company}
            workers={workers}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'workers' && (
          <WorkersView
            workers={workers}
            company={company}
            onAddWorker={handleAddWorker}
            onImportBatchWorkers={handleImportBatchWorkers}
            onSelectWorkerForAudit={handleSelectWorkerForAudit}
          />
        )}

        {activeTab === 'auditor' && (
          <FormulaAuditorView
            workers={workers}
            selectedWorkerId={selectedWorkerId}
            onSelectWorker={setSelectedWorkerId}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            company={company}
            workers={workers}
          />
        )}

        {activeTab === 'credits' && (
          <CreditsSaasView
            company={company}
            onRechargeCredits={handleRechargeCredits}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Batería de Riesgo Psicosocial Pro • Plataforma Especializada SST
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
                  <p className="text-[11px] text-slate-500">Saldo actual: {company.saldoCreditosSaaS.creditosDisponibles} disp.</p>
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
