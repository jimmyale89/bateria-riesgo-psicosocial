import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  X, 
  Coins, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { calculateIndividualEvaluation } from '../engine/psychometricEngineES';

export default function ExcelUploaderModal({ isOpen, onClose, onImportWorkers, availableCredits }) {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Normalizador de respuestas (números o texto)
  const parseVal = (v) => {
    if (v === undefined || v === null || v === '') return 0;
    if (typeof v === 'number') return v;
    const s = String(v).trim().toLowerCase();
    if (s === 'siempre') return 4;
    if (s === 'casi siempre') return 3;
    if (s === 'algunas veces' || s === 'a veces') return 2;
    if (s === 'casi nunca') return 1;
    if (s === 'nunca') return 0;
    const num = Number(s);
    return isNaN(num) ? 0 : num;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setErrorMsg('');
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Se lee la primera y única hoja
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (rows.length < 2) {
          setErrorMsg('El archivo no contiene filas de datos para tabular.');
          setIsProcessing(false);
          return;
        }

        // Fila 0 son encabezados
        const headers = rows[0];
        const dataRows = rows.slice(1);

        const evaluatedWorkers = [];

        dataRows.forEach((row, idx) => {
          if (!row || row.length < 3 || !row[1] || !row[2]) {
            // Fila vacía o sin identificación/nombre
            return;
          }

          const rawForm = String(row[0] || 'B').trim().toUpperCase();
          const formType = rawForm.includes('A') ? 'A' : 'B';
          const cedula = String(row[1] || '').trim();
          const nombre = String(row[2] || '').trim();
          const cargo = String(row[3] || 'Colaborador').trim();
          const area = String(row[4] || 'General').trim();
          const genero = String(row[5] || 'F').trim().toUpperCase();
          const edad = Number(row[6] || 30);
          const estadoCivil = String(row[7] || 'Soltero(a)').trim();
          const nivelEscolaridad = String(row[8] || 'Técnico').trim();
          const antiguedad = String(row[9] || '1 a 2 años').trim();
          const tipoContrato = String(row[10] || 'Término Indefinido').trim();
          const horasDia = Number(row[11] || 8);

          // Extraer ítems intralaborales (columnas 12 a 134)
          const rawIntraScores = {};
          const maxIntra = formType === 'A' ? 123 : 97;
          for (let i = 1; i <= maxIntra; i++) {
            const colIdx = 11 + i;
            rawIntraScores[i] = parseVal(row[colIdx]);
          }

          // Extraer ítems extralaborales (columnas 135 a 165)
          const rawExtraScores = {};
          for (let i = 1; i <= 31; i++) {
            const colIdx = 134 + i;
            rawExtraScores[i] = parseVal(row[colIdx]);
          }

          // Extraer ítems de estrés (columnas 166 a 196)
          const rawStressScores = {};
          for (let i = 1; i <= 31; i++) {
            const colIdx = 165 + i;
            rawStressScores[i] = parseVal(row[colIdx]);
          }

          // Ejecutar motor psicométrico normativo en vivo
          const evaluation = calculateIndividualEvaluation({
            id: `${formType}_imp_${idx + 1}`,
            nombre,
            cedula,
            formType,
            cargo,
            area,
            genero,
            edad,
            antiguedad,
            rawIntraScores,
            rawExtraScores,
            rawStressScores
          });

          evaluatedWorkers.push({
            id: `${formType}_imp_${idx + 1}`,
            codigo: `${formType}-0${idx + 1}`,
            nombre,
            cedula,
            formType,
            cargo,
            area,
            genero,
            edad,
            antiguedad,
            nivelEscolaridad,
            estadoCivil,
            tipoContrato,
            horasDia,
            scores: {
              intraBruto: evaluation.intralaboral.total.bruto,
              intraTrans: evaluation.intralaboral.total.transformado,
              intraNivel: evaluation.intralaboral.total.nivel,
              dominios: {
                liderazgo: {
                  bruto: evaluation.intralaboral.dominios.liderazgo.bruto,
                  trans: evaluation.intralaboral.dominios.liderazgo.transformado,
                  nivel: evaluation.intralaboral.dominios.liderazgo.nivel
                },
                control: {
                  bruto: evaluation.intralaboral.dominios.control.bruto,
                  trans: evaluation.intralaboral.dominios.control.transformado,
                  nivel: evaluation.intralaboral.dominios.control.nivel
                },
                demandas: {
                  bruto: evaluation.intralaboral.dominios.demandas.bruto,
                  trans: evaluation.intralaboral.dominios.demandas.transformado,
                  nivel: evaluation.intralaboral.dominios.demandas.nivel
                },
                recompensas: {
                  bruto: evaluation.intralaboral.dominios.recompensas.bruto,
                  trans: evaluation.intralaboral.dominios.recompensas.transformado,
                  nivel: evaluation.intralaboral.dominios.recompensas.nivel
                }
              },
              extraBruto: evaluation.extralaboral.total.bruto,
              extraTrans: evaluation.extralaboral.total.transformado,
              extraNivel: evaluation.extralaboral.total.nivel,
              consolidadoTrans: evaluation.consolidado.transformado,
              consolidadoNivel: evaluation.consolidado.nivel,
              estresTrans: evaluation.estres.transformado,
              estresNivel: evaluation.estres.nivel
            }
          });
        });

        if (evaluatedWorkers.length === 0) {
          setErrorMsg('No se detectaron registros válidos de colaboradores en la hoja.');
        } else {
          setParsedData(evaluatedWorkers);
        }
        setIsProcessing(false);
      } catch (err) {
        console.error(err);
        setErrorMsg('Error al procesar el archivo Excel: ' + err.message);
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleConfirmImport = () => {
    if (parsedData.length > availableCredits) {
      alert(`No tiene suficientes créditos disponibles (${availableCredits} disp.) para calificar a ${parsedData.length} colaboradores. Por favor recargue su bolsa.`);
      return;
    }
    onImportWorkers(parsedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              Formato Inteligente de 1 Sola Hoja
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Carga Masiva de Baterías de Riesgo Psicosocial
            </h3>
            <p className="text-xs text-slate-500">
              Sube el archivo Excel con las respuestas y el sistema calculará todas las dimensiones y baremos oficiales al instante.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download Template Banner */}
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div>
              <span className="font-bold text-indigo-950 block">¿No tienes el formato oficial de 1 hoja?</span>
              <span className="text-indigo-800 text-[11px]">Descárgalo aquí con los encabezados normalizados listos para diligenciar.</span>
            </div>
          </div>
          <a
            href="./PLANTILLA_UNICA_BATERIA_RIESGO_PSICOSOCIAL.xlsx"
            download="PLANTILLA_UNICA_BATERIA_RIESGO_PSICOSOCIAL.xlsx"
            className="flex-shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar Plantilla Excel
          </a>
        </div>

        {/* Upload Dropzone */}
        {!parsedData.length && (
          <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-8 text-center transition-colors bg-slate-50/50 flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <label className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer underline">
                Selecciona tu archivo Excel (.xlsx o .xlsb)
                <input
                  type="file"
                  accept=".xlsx, .xlsb, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-500 block mt-1">o arrastra y suelta el documento aquí</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Formato de 1 sola hoja: 12 datos generales + 123 intralaboral + 31 extra + 31 estrés
            </span>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="py-8 text-center text-xs text-slate-500 space-y-2">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-semibold text-slate-700">Analizando respuestas y aplicando baremos Javeriana...</p>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Parsed Preview Table */}
        {parsedData.length > 0 && (
          <div className="flex-1 overflow-hidden flex flex-col space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                Vista previa: <strong className="text-indigo-600">{parsedData.length} colaboradores detectados</strong>
              </span>
              <button
                onClick={() => {
                  setParsedData([]);
                  setFile(null);
                }}
                className="text-xs text-red-600 hover:text-red-800 font-semibold"
              >
                Cambiar archivo
              </button>
            </div>

            <div className="overflow-y-auto max-h-60 border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="p-2.5">Forma</th>
                    <th className="p-2.5">Cédula</th>
                    <th className="p-2.5">Colaborador</th>
                    <th className="p-2.5">Cargo</th>
                    <th className="p-2.5 text-center">Intralaboral</th>
                    <th className="p-2.5 text-center">Extralaboral</th>
                    <th className="p-2.5 text-center">Estrés</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedData.map((w, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          w.formType === 'A' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {w.formType}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-slate-500">{w.cedula}</td>
                      <td className="p-2.5 font-bold text-slate-900">{w.nombre}</td>
                      <td className="p-2.5 text-slate-600">{w.cargo}</td>
                      <td className="p-2.5 text-center">
                        <RiskBadge level={w.scores.intraNivel} size="sm" />
                      </td>
                      <td className="p-2.5 text-center">
                        <RiskBadge level={w.scores.extraNivel} size="sm" />
                      </td>
                      <td className="p-2.5 text-center">
                        <RiskBadge level={w.scores.estresNivel} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Credit deduction summary */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex justify-between items-center text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Esta importación consumirá <strong>{parsedData.length} créditos</strong> de su saldo actual (<strong>{availableCredits} disp.</strong>).
                </span>
              </div>
              <span className="font-bold text-amber-950 font-mono">
                Saldo restante: {availableCredits - parsedData.length}
              </span>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancelar
          </button>
          {parsedData.length > 0 && (
            <button
              onClick={handleConfirmImport}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirmar e Importar {parsedData.length} Evaluaciones
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
