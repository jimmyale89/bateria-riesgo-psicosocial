import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Building2, 
  User, 
  FileText, 
  Lock, 
  Sparkles,
  HelpCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import catalogData from '../data/questionCatalogs.json';
import stressWeights from '../data/stressWeights.json';
import { calculateIndividualEvaluation } from '../engine/psychometricEngineES';

export default function WorkerSurveyView({ company, onSubmitSurvey, onExitSurvey }) {
  // Survey steps: 0: Consent, 1: Ficha General, 2: Intralaboral, 3: Extralaboral, 4: Estrés, 5: Exitoso
  const [step, setStep] = useState(0);

  // Consent state
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Ficha General state
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    genero: 'F',
    edad: 28,
    estadoCivil: 'Soltera',
    escolaridad: 'Técnico/ Tecnológico Completo',
    cargo: '',
    tipoCargo: 'auxiliar', // 'jefatura', 'profesional', 'auxiliar', 'operativo'
    area: 'Clínica',
    antiguedad: '1 a 2 años',
    tipoContrato: 'Término Indefinido',
    horasDia: 8
  });

  // Determined form: 'A' or 'B'
  const isFormA = formData.tipoCargo === 'jefatura' || formData.tipoCargo === 'profesional';
  const formType = isFormA ? 'A' : 'B';

  const questionsCatalog = isFormA ? catalogData.catalogA : catalogData.catalogB;
  const intraQuestions = questionsCatalog.questionsIntra; // 123 (A) or 97 (B)
  const extraQuestions = questionsCatalog.questionsExtra; // 31
  const stressQuestions = questionsCatalog.questionsStress; // 31

  // Responses state (indexed 1..N)
  const [intraAnswers, setIntraAnswers] = useState({});
  const [extraAnswers, setExtraAnswers] = useState({});
  const [stressAnswers, setStressAnswers] = useState({});

  // Paginación interna por secciones (10 preguntas por página)
  const [pageIndex, setPageIndex] = useState(0);
  const PAGE_SIZE = 10;

  // Respuestas intralaborales y extralaborales:
  // 4: Siempre, 3: Casi siempre, 2: A veces, 1: Casi nunca, 0: Nunca
  const INTRA_OPTIONS = [
    { label: 'Siempre', value: 4 },
    { label: 'Casi siempre', value: 3 },
    { label: 'A veces', value: 2 },
    { label: 'Casi nunca', value: 1 },
    { label: 'Nunca', value: 0 }
  ];

  // Estrés:
  // Siempre, Casi siempre, A veces, Nunca
  const STRESS_OPTIONS = [
    { label: 'Siempre', value: 3 },
    { label: 'Casi siempre', value: 2 },
    { label: 'A veces', value: 1 },
    { label: 'Nunca', value: 0 }
  ];

  // Helper para responder
  const handleAnswerIntra = (qId, val) => {
    setIntraAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleAnswerExtra = (qId, val) => {
    setExtraAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleAnswerStress = (qId, val) => {
    setStressAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // Autollenar de prueba para agilizar testeo
  const handleAutofillDemo = () => {
    setFormData({
      nombre: 'Claudia Patricia Méndez',
      cedula: '1020458963',
      genero: 'F',
      edad: 32,
      estadoCivil: 'Unión Libre',
      escolaridad: 'Profesional Completo',
      cargo: 'Médica Veterinaria Asistencial',
      tipoCargo: 'profesional',
      area: 'Hospitalización y Cirugía',
      antiguedad: '3 a 5 años',
      tipoContrato: 'Término Indefinido',
      horasDia: 9
    });

    const newIntra = {};
    for (let i = 1; i <= 123; i++) {
      newIntra[i] = (i % 5);
    }
    setIntraAnswers(newIntra);

    const newExtra = {};
    for (let i = 1; i <= 31; i++) {
      newExtra[i] = (i % 4);
    }
    setExtraAnswers(newExtra);

    const newStress = {};
    for (let i = 1; i <= 31; i++) {
      newStress[i] = (i % 4);
    }
    setStressAnswers(newStress);
    setConsentAccepted(true);
    setStep(1);
  };

  // Submit final
  const handleSubmitSurvey = () => {
    // Convertir respuestas de estrés al formato con ponderación
    // o procesar mediante motor psicométrico
    // Para intralaboral y extralaboral, convertir a puntajes directos/inversos
    const rawIntraScores = {};
    intraQuestions.forEach((q, idx) => {
      const userVal = intraAnswers[q.id] !== undefined ? intraAnswers[q.id] : 0;
      // Si la pregunta es inversa, el puntaje se invierte: 4 -> 0, 3 -> 1, 2 -> 2, 1 -> 3, 0 -> 4
      rawIntraScores[q.id] = q.polarity === 'inverse' ? (4 - userVal) : userVal;
    });

    const rawExtraScores = {};
    extraQuestions.forEach((q, idx) => {
      const userVal = extraAnswers[q.id] !== undefined ? extraAnswers[q.id] : 0;
      rawExtraScores[q.id] = q.polarity === 'inverse' ? (4 - userVal) : userVal;
    });

    const rawStressScores = {};
    stressQuestions.forEach((q, idx) => {
      const userVal = stressAnswers[q.id] !== undefined ? stressAnswers[q.id] : 0;
      // Extraer multiplicador oficial desde formula
      // Ejemplo: +C161*9+D161*6+E161*3+G161*0
      const weightObj = stressWeights[idx];
      let multiplier = 3;
      if (weightObj && weightObj.formula) {
        if (weightObj.formula.includes('*9')) multiplier = 3; // base 3 -> *9, *6, *3, 0
        else if (weightObj.formula.includes('*6')) multiplier = 2; // base 2 -> *6, *4, *2, 0
        else multiplier = 1; // base 1 -> *3, *2, *1, 0
      }
      rawStressScores[q.id] = userVal * multiplier;
    });

    // Calcular con motor psicométrico
    const evaluation = calculateIndividualEvaluation({
      id: `${formType}_web_${Date.now()}`,
      nombre: formData.nombre,
      cedula: formData.cedula,
      formType: formType,
      cargo: formData.cargo,
      area: formData.area,
      genero: formData.genero,
      edad: formData.edad,
      antiguedad: formData.antiguedad,
      rawIntraScores,
      rawExtraScores,
      rawStressScores
    });

    const workerResult = {
      id: `${formType}_web_${Date.now()}`,
      codigo: `${formType}-09`,
      nombre: formData.nombre,
      cedula: formData.cedula,
      formType: formType,
      cargo: formData.cargo,
      area: formData.area,
      genero: formData.genero,
      edad: formData.edad,
      antiguedad: formData.antiguedad,
      nivelEscolaridad: formData.escolaridad,
      estadoCivil: formData.estadoCivil,
      tipoContrato: formData.tipoContrato,
      horasDia: formData.horasDia,
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
    };

    onSubmitSurvey(workerResult);
    setStep(5);
  };

  // Scroll to top when step or page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, pageIndex]);

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-3 sm:px-6 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                Evaluación Confidencial Digital
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                {company.nombre}
              </h1>
            </div>
          </div>

          <button
            onClick={onExitSurvey}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Volver al Panel
          </button>
        </div>

        {/* Global Progress Bar (Steps 1 to 4) */}
        {step >= 1 && step <= 4 && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 mb-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>
                {step === 1 && 'Paso 1 de 4: Información General'}
                {step === 2 && `Paso 2 de 4: Factores Intralaborales (Forma ${formType})`}
                {step === 3 && 'Paso 3 de 4: Factores Extralaborales'}
                {step === 4 && 'Paso 4 de 4: Evaluación de Estrés'}
              </span>
              <span className="text-indigo-600 font-mono">
                {step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '95%'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '95%' }}
              ></div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 0: CONSENTIMIENTO INFORMADO DIGITAL (Res. 2764 de 2022) */}
        {/* ------------------------------------------------------------- */}
        {step === 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Consentimiento Informado Digital
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Conforme a la Resolución 2404 de 2019 y la Resolución 2764 de 2022 del Ministerio del Trabajo de Colombia
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-700 space-y-3 max-h-72 overflow-y-auto">
              <p>
                <strong>Estimado(a) colaborador(a):</strong> La empresa <strong>{company.nombre}</strong> está llevando a cabo la evaluación periódica de factores de riesgo psicosocial en el marco del Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST).
              </p>
              <p>
                <strong>1. Confidencialidad y Secreto Profesional:</strong> Toda la información que usted suministre tiene carácter estrictamente confidencial y está amparada bajo el secreto profesional del psicólogo evaluador (<strong>{company.psicologoEvaluador.nombre}</strong>, Licencia SST: {company.psicologoEvaluador.licenciaSST}) según lo dispuesto en la <strong>Ley 1090 de 2006</strong>.
              </p>
              <p>
                <strong>2. Uso de la Información:</strong> Los resultados serán tratados de forma agregada y estadística para diseñar programas de bienestar, prevención y mejora del clima laboral. Bajo ninguna circunstancia se entregarán respuestas individuales a sus superiores ni a la gerencia, ni tendrán consecuencias sancionatorias o laborales.
              </p>
              <p>
                <strong>3. Voluntariedad:</strong> Su participación es voluntaria, pero de vital importancia para identificar las condiciones que impactan su salud y bienestar en el trabajo.
              </p>
            </div>

            <label className="flex items-start gap-3 p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 mt-0.5"
              />
              <span className="text-xs font-semibold text-indigo-950">
                He leído, comprendido y autorizo voluntariamente el diligenciamiento confidencial de la Batería de Riesgo Psicosocial.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleAutofillDemo}
                className="text-xs text-slate-500 hover:text-indigo-600 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Cargar datos de prueba (Simulación Rápida)
              </button>

              <button
                disabled={!consentAccepted}
                onClick={() => setStep(1)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  consentAccepted
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Iniciar Evaluación <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 1: FICHA DE DATOS GENERALES */}
        {/* ------------------------------------------------------------- */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Ficha de Datos Generales
              </h2>
              <p className="text-xs text-slate-500">
                Información sociodemográfica y ocupacional requerida por la norma
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Erika Marcela Vásquez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Cédula de Ciudadanía *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1036629941"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Género</label>
                  <select
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Edad (Años)</label>
                  <input
                    type="number"
                    value={formData.edad}
                    onChange={(e) => setFormData({ ...formData, edad: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estado Civil</label>
                  <select
                    value={formData.estadoCivil}
                    onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Soltero(a)">Soltero(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Unión Libre">Unión Libre</option>
                    <option value="Divorciado(a) o Separado(a)">Divorciado(a) o Separado(a)</option>
                    <option value="Viudo(a)">Viudo(a)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cargo Actual *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Auxiliar de Veterinaria y Hospitalización"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* SELECCIÓN AUTOMÁTICA DE INSTRUMENTO SEGÚN EL CARGO */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 block">
                  Tipo de Cargo (Define automáticamente si aplica Forma A o Forma B):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCargo: 'jefatura' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.tipoCargo === 'jefatura'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="block font-semibold">Jefatura / Mando</span>
                    <span className="text-[11px] text-slate-500">Con personal a cargo (Forma A)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCargo: 'profesional' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.tipoCargo === 'profesional'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="block font-semibold">Profesional / Técnico</span>
                    <span className="text-[11px] text-slate-500">Especialista o analista (Forma A)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCargo: 'auxiliar' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.tipoCargo === 'auxiliar'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="block font-semibold">Auxiliar / Asistente</span>
                    <span className="text-[11px] text-slate-500">Administrativo o soporte (Forma B)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoCargo: 'operativo' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.tipoCargo === 'operativo'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="block font-semibold">Operario / Servicios</span>
                    <span className="text-[11px] text-slate-500">Mantenimiento, aseo, campo (Forma B)</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Instrumento asignado: <strong>FORMA {formType}</strong> ({isFormA ? '123 ítems' : '97 ítems'})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Área o Sección</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Antigüedad en la Empresa</label>
                  <select
                    value={formData.antiguedad}
                    onChange={(e) => setFormData({ ...formData, antiguedad: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Menor de 1 año">Menor de 1 año</option>
                    <option value="1 a 2 años">1 a 2 años</option>
                    <option value="3 a 5 años">3 a 5 años</option>
                    <option value="6 a 10 años">6 a 10 años</option>
                    <option value="11 o más años">11 o más años</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>
              <button
                type="button"
                disabled={!formData.nombre || !formData.cedula || !formData.cargo}
                onClick={() => {
                  setPageIndex(0);
                  setStep(2);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  formData.nombre && formData.cedula && formData.cargo
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continuar a Cuestionario Intralaboral <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 2: CUESTIONARIO INTRALABORAL (Paginado de 10 en 10) */}
        {/* ------------------------------------------------------------- */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  Cuestionario Intralaboral (Forma {formType})
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Condiciones de su Trabajo
                </h2>
                <p className="text-xs text-slate-500">
                  Responda pensando en su experiencia habitual en el último mes
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {Object.keys(intraAnswers).length} de {intraQuestions.length} respondidas
              </span>
            </div>

            {/* Lista de preguntas de la página actual */}
            <div className="space-y-5">
              {intraQuestions.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE).map((q) => {
                const currentVal = intraAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {q.text}
                      </p>
                    </div>

                    {/* Botones de opciones */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                      {INTRA_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswerIntra(q.id, opt.value)}
                          className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                            currentVal === opt.value
                              ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              {pageIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Bloque Anterior
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Datos Generales
                </button>
              )}

              <span className="text-xs text-slate-500 font-medium">
                Página {pageIndex + 1} de {Math.ceil(intraQuestions.length / PAGE_SIZE)}
              </span>

              {(pageIndex + 1) * PAGE_SIZE < intraQuestions.length ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex + 1)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm"
                >
                  Siguiente Bloque <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPageIndex(0);
                    setStep(3);
                  }}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
                >
                  Pasar a Extralaboral <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 3: CUESTIONARIO EXTRALABORAL (31 ítems) */}
        {/* ------------------------------------------------------------- */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                  Cuestionario Extralaboral (31 Ítems)
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Condiciones Externas y Tiempo Libre
                </h2>
                <p className="text-xs text-slate-500">
                  Evalúa su entorno fuera del trabajo, vivienda, transporte y familia
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {Object.keys(extraAnswers).length} de {extraQuestions.length}
              </span>
            </div>

            <div className="space-y-5">
              {extraQuestions.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE).map((q) => {
                const currentVal = extraAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {q.text}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                      {INTRA_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswerExtra(q.id, opt.value)}
                          className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                            currentVal === opt.value
                              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              {pageIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Bloque Anterior
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPageIndex(Math.floor((intraQuestions.length - 1) / PAGE_SIZE));
                    setStep(2);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver a Intralaboral
                </button>
              )}

              <span className="text-xs text-slate-500 font-medium">
                Página {pageIndex + 1} de {Math.ceil(extraQuestions.length / PAGE_SIZE)}
              </span>

              {(pageIndex + 1) * PAGE_SIZE < extraQuestions.length ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex + 1)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm"
                >
                  Siguiente Bloque <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPageIndex(0);
                    setStep(4);
                  }}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
                >
                  Pasar a Cuestionario de Estrés <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 4: CUESTIONARIO DE ESTRÉS (31 síntomas) */}
        {/* ------------------------------------------------------------- */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                  Cuestionario de Estrés (Tercera Versión - 31 Síntomas)
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Síntomas en los Últimos 3 Meses
                </h2>
                <p className="text-xs text-slate-500">
                  Indique con qué frecuencia ha presentado cada uno de los siguientes malestares
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {Object.keys(stressAnswers).length} de {stressQuestions.length}
              </span>
            </div>

            <div className="space-y-5">
              {stressQuestions.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE).map((q) => {
                const currentVal = stressAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {q.id}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {q.text}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {STRESS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswerStress(q.id, opt.value)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all text-center ${
                            currentVal === opt.value
                              ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-600/30'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              {pageIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex - 1)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Bloque Anterior
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPageIndex(Math.floor((extraQuestions.length - 1) / PAGE_SIZE));
                    setStep(3);
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver a Extralaboral
                </button>
              )}

              <span className="text-xs text-slate-500 font-medium">
                Página {pageIndex + 1} de {Math.ceil(stressQuestions.length / PAGE_SIZE)}
              </span>

              {(pageIndex + 1) * PAGE_SIZE < stressQuestions.length ? (
                <button
                  type="button"
                  onClick={() => setPageIndex(pageIndex + 1)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm"
                >
                  Siguiente Bloque <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitSurvey}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all shadow-emerald-200"
                >
                  <Send className="w-4 h-4" />
                  Finalizar y Enviar Evaluación
                </button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PASO 5: ENVÍO EXITOSO */}
        {/* ------------------------------------------------------------- */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                ¡Evaluación Enviada con Éxito!
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Sus respuestas han sido registradas y encriptadas de forma segura bajo el secreto profesional de la <strong>Ley 1090 de 2006</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono max-w-xs mx-auto space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase">Comprobante de Radicación</span>
              <strong className="text-slate-900 block font-bold text-sm">RAD-2026-B{Date.now().toString().slice(-5)}</strong>
              <span className="text-slate-500 text-[11px] block">{formData.nombre} (C.C. {formData.cedula})</span>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onExitSurvey}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors"
              >
                Volver al Panel de Diagnóstico
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
