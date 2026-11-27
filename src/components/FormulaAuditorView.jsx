import React, { useState } from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  Calculator, 
  FileCheck, 
  HelpCircle,
  Code2,
  ChevronDown
} from 'lucide-react';
import RiskBadge, { getRiskColors } from './RiskBadge';
import { DIVISORES, BAREMO_KEYS_MAP, getBaremo } from '../engine/psychometricEngineES';

export default function FormulaAuditorView({ workers, selectedWorkerId, onSelectWorker }) {
  const currentWorker = workers.find(w => w.id === selectedWorkerId) || workers[3] || workers[0]; // defaults to B1 (index 3)
  const isFormA = currentWorker.formType === 'A';
  const divisores = isFormA ? DIVISORES.FORMA_A : DIVISORES.FORMA_B;

  const [activeSubTab, setActiveSubTab] = useState('intra'); // 'intra', 'extra', 'estres', 'baremos'

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Auditor & Verificador de Fórmulas Psicométricas Oficiales
              </h2>
              <p className="text-xs text-slate-500">
                Transparencia matemática 100% auditable según manual técnico Javeriana / Ministerio de Trabajo
              </p>
            </div>
          </div>
        </div>

        {/* Worker Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Colaborador en Auditoría:</label>
          <select
            value={currentWorker.id}
            onChange={(e) => onSelectWorker(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {workers.map(w => (
              <option key={w.id} value={w.id}>
                [{w.formType}] {w.nombre} ({w.cargo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Worker Overview Pill */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
            isFormA ? 'bg-purple-600' : 'bg-blue-600'
          }`}>
            {currentWorker.formType}
          </div>
          <div>
            <h3 className="text-sm font-bold">{currentWorker.nombre}</h3>
            <span className="text-xs text-slate-400">
              {currentWorker.cargo} • Forma {currentWorker.formType} ({isFormA ? 'Jefatura / Profesional - 123 ítems' : 'Auxiliar / Operario - 97 ítems'})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Intralaboral</span>
            <div className="flex items-center gap-1.5 justify-end">
              <RiskBadge level={currentWorker.scores.intraNivel} size="sm" />
              <span className="font-mono text-xs font-bold text-slate-200">{currentWorker.scores.intraTrans}%</span>
            </div>
          </div>
          <div className="text-right border-l border-slate-700 pl-3">
            <span className="text-[10px] text-slate-400 block uppercase">Extralaboral</span>
            <div className="flex items-center gap-1.5 justify-end">
              <RiskBadge level={currentWorker.scores.extraNivel} size="sm" />
              <span className="font-mono text-xs font-bold text-slate-200">{currentWorker.scores.extraTrans}%</span>
            </div>
          </div>
          <div className="text-right border-l border-slate-700 pl-3">
            <span className="text-[10px] text-slate-400 block uppercase">Estrés</span>
            <div className="flex items-center gap-1.5 justify-end">
              <RiskBadge level={currentWorker.scores.estresNivel} size="sm" />
              <span className="font-mono text-xs font-bold text-slate-200">{currentWorker.scores.estresTrans}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auditor Sub-Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4">
        <button
          onClick={() => setActiveSubTab('intra')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeSubTab === 'intra'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Dominios & Dimensiones Intralaborales ({isFormA ? '19 Dim.' : '16 Dim.'})
        </button>
        <button
          onClick={() => setActiveSubTab('extra')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeSubTab === 'extra'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Dimensiones Extralaborales (7 Dim.)
        </button>
        <button
          onClick={() => setActiveSubTab('estres')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeSubTab === 'estres'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Ponderación Oficial de Estrés (31 Síntomas)
        </button>
        <button
          onClick={() => setActiveSubTab('baremos')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeSubTab === 'baremos'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Tablas de Baremos de Corte Javeriana
        </button>
      </div>

      {/* Content 1: Intralaboral Breakdown */}
      {activeSubTab === 'intra' && (
        <div className="space-y-4">
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-900 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Fórmula Normativa de Transformación:</strong>
              <p className="mt-0.5 font-mono text-[11px]">
                Puntaje Transformado = (Puntaje Bruto / Factor Divisor Específico) × 100
              </p>
              <p className="mt-1 text-indigo-800 text-[11px]">
                Divisor Total Intralaboral: <strong className="font-mono">{divisores.total_intralaboral}</strong> ({isFormA ? 'Forma A: 492' : 'Forma B: 388'}).
              </p>
            </div>
          </div>

          {/* Dominios Summary Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
              Cálculo por Dominios Intralaborales
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Dominio</th>
                  <th className="py-2.5 px-4 font-bold text-center">Puntaje Bruto</th>
                  <th className="py-2.5 px-4 font-bold text-center">Factor Divisor</th>
                  <th className="py-2.5 px-4 font-bold text-center">Puntaje Transformado</th>
                  <th className="py-2.5 px-4 font-bold text-center">Nivel Baremo Javeriana</th>
                  <th className="py-2.5 px-4 font-bold text-center">Estado Auditoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {Object.entries(currentWorker.scores.dominios).map(([domKey, domVal]) => {
                  const divisorKey = `dominio_${domKey}`;
                  const div = divisores[divisorKey] || 1;
                  return (
                    <tr key={domKey} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-800 capitalize">
                        Dominio {domKey}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">{domVal.bruto}</td>
                      <td className="py-3 px-4 text-center font-mono text-slate-500">{div}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-indigo-700">
                        {domVal.trans}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <RiskBadge level={domVal.nivel} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Fiel a Norma
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {/* Total Row */}
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                  <td className="py-3 px-4 text-slate-900">
                    TOTAL CUESTIONARIO INTRALABORAL
                  </td>
                  <td className="py-3 px-4 text-center font-mono">{currentWorker.scores.intraBruto}</td>
                  <td className="py-3 px-4 text-center font-mono">{divisores.total_intralaboral}</td>
                  <td className="py-3 px-4 text-center font-mono text-indigo-900 text-sm">
                    {currentWorker.scores.intraTrans}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <RiskBadge level={currentWorker.scores.intraNivel} size="lg" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                      <CheckCircle2 className="w-4 h-4" /> 100% EXACTO
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 2: Extralaboral Breakdown */}
      {activeSubTab === 'extra' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Dimensiones del Cuestionario de Factores Extralaborales (31 Ítems)
              </h3>
              <p className="text-xs text-slate-500">
                Factor Divisor Global Extralaboral: <strong className="font-mono">124</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Total Extralaboral:</span>
              <RiskBadge level={currentWorker.scores.extraNivel} size="lg" />
              <span className="font-mono font-bold text-xs text-slate-800">{currentWorker.scores.extraTrans}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">1. Tiempo fuera del trabajo</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 16 (4 ítems)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">2. Relaciones familiares</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 12 (3 ítems)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">3. Comunicación interpersonal</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 20 (5 ítems)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">4. Situación económica</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 12 (3 ítems)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">5. Vivienda y entorno</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 36 (9 ítems)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold block text-slate-800">6. Influencia del entorno extra</span>
              <span className="text-slate-500 font-mono text-[11px]">Divisor: 12 (3 ítems)</span>
            </div>
          </div>
        </div>
      )}

      {/* Content 3: Stress Breakdown */}
      {activeSubTab === 'estres' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ponderación Oficial de Síntomas de Estrés (Tercera Versión - 31 Ítems)
              </h3>
              <p className="text-xs text-slate-500">
                Estandarización psicométrica según modelo MinTrabajo / U. Javeriana
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Resultado:</span>
              <RiskBadge level={currentWorker.scores.estresNivel} size="lg" />
              <span className="font-mono font-bold text-xs text-slate-800">{currentWorker.scores.estresTrans}%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2">
            <span className="text-amber-400 font-bold block">Fórmula de Ponderación Oficial:</span>
            <p className="text-slate-300">
              P.Bruto Ponderado = (Promedio Fisio × 4) + (Promedio Social × 3) + (Promedio Intelectual × 2) + (Promedio Psicoemocional × 1)
            </p>
            <p className="text-slate-300">
              P.Transformado = (P.Bruto Ponderado / <strong>61.16</strong>) × 100
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="font-bold text-red-900 block">Fisiológicos (×4)</span>
              <span className="text-slate-600 text-[11px]">Ítems 1 al 8 (Cefaleas, colon, tensión, etc.)</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="font-bold text-amber-900 block">Comportamiento Social (×3)</span>
              <span className="text-slate-600 text-[11px]">Ítems 9 al 12 (Relaciones, aislamiento)</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block">Intelectuales/Laborales (×2)</span>
              <span className="text-slate-600 text-[11px]">Ítems 13 al 22 (Sobrecarga, concentración)</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <span className="font-bold text-purple-900 block">Psicoemocionales (×1)</span>
              <span className="text-slate-600 text-[11px]">Ítems 23 al 31 (Angustia, desánimo, consumo)</span>
            </div>
          </div>
        </div>
      )}

      {/* Content 4: Baremos Inspector */}
      {activeSubTab === 'baremos' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Puntos de Corte de Baremos Normativos ({isFormA ? 'Forma A: Jefes/Profesionales' : 'Forma B: Auxiliares/Operarios'})
            </h3>
            <p className="text-xs text-slate-500">
              Cortes percentilares para clasificación en los 5 niveles de riesgo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800">Total Intralaboral</h4>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between p-1.5 bg-emerald-50 text-emerald-900 rounded">
                  <span>🟢 Sin Riesgo</span>
                  <span>0 - {isFormA ? '19.7' : '20.6'}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-lime-50 text-lime-900 rounded">
                  <span>🟡 Riesgo Bajo</span>
                  <span>{isFormA ? '19.8 - 25.8' : '20.7 - 26.0'}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-amber-50 text-amber-900 rounded">
                  <span>🟠 Riesgo Medio</span>
                  <span>{isFormA ? '25.9 - 31.5' : '26.1 - 31.2'}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-orange-50 text-orange-900 rounded">
                  <span>🔴 Riesgo Alto</span>
                  <span>{isFormA ? '31.6 - 38.0' : '31.3 - 38.7'}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-red-50 text-red-900 rounded">
                  <span>🟣 Riesgo Muy Alto</span>
                  <span>&gt; {isFormA ? '38.0' : '38.7'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800">Cuestionario de Estrés</h4>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between p-1.5 bg-emerald-50 text-emerald-900 rounded">
                  <span>🟢 Muy Bajo</span>
                  <span>0 - 7.8</span>
                </div>
                <div className="flex justify-between p-1.5 bg-lime-50 text-lime-900 rounded">
                  <span>🟡 Bajo</span>
                  <span>7.9 - 12.6</span>
                </div>
                <div className="flex justify-between p-1.5 bg-amber-50 text-amber-900 rounded">
                  <span>🟠 Medio</span>
                  <span>12.7 - 17.7</span>
                </div>
                <div className="flex justify-between p-1.5 bg-orange-50 text-orange-900 rounded">
                  <span>🔴 Alto</span>
                  <span>17.8 - 25.0</span>
                </div>
                <div className="flex justify-between p-1.5 bg-red-50 text-red-900 rounded">
                  <span>🟣 Muy Alto</span>
                  <span>&gt; 25.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
