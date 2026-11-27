import React, { useState, useEffect, useRef } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer, 
  HelpCircle, 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Building2, 
  Clock, 
  Award, 
  Activity, 
  Flame, 
  TrendingUp, 
  ShieldAlert, 
  BookOpen, 
  Volume2, 
  Grid, 
  Check, 
  ArrowRight,
  Smile,
  Info
} from 'lucide-react';
import { COMPANY_SUMMARY_STATS } from '../data/mockData';

export default function SocializationDeckView({ 
  company, 
  workers = [], 
  onNavigateTab 
}) {
  const [deckMode, setDeckMode] = useState('sensibilizacion'); // 'sensibilizacion' | 'resultados'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(false);
  const containerRef = useRef(null);

  const stats = company.stats || COMPANY_SUMMARY_STATS;
  const totalTrabajadores = workers.length || stats.totalParticipantes;

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Switch deck mode and reset to first slide
  const handleModeSwitch = (mode) => {
    setDeckMode(mode);
    setCurrentSlide(0);
    setShowThumbnailGrid(false);
  };

  // -------------------------------------------------------------
  // SLIDES DATA: DECK 1 - SENSIBILIZACIÓN PREVIA A TRABAJADORES
  // -------------------------------------------------------------
  const sensibilizacionSlides = [
    {
      id: 1,
      badge: 'Fase de Preparación y Confianza',
      title: 'Batería de Riesgo Psicosocial',
      subtitle: `Jornada de Sensibilización para el Equipo Humano de ${company.nombre}`,
      speakerNotes: 'Salude cordialmente al equipo. Enfatice que este no es un examen ni una prueba que se apruebe o repruebe. Es un espacio para escucharlos y entender cómo el entorno de trabajo apoya su bienestar diario.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto py-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-600 shadow-inner">
            <HeartHandshake className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase font-black tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Bienestar y Salud en el Trabajo • 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Tu Bienestar También Cuenta en <span className="text-indigo-600">{company.nombre}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Un proceso participativo, 100% confidencial y humano para cuidar la salud física, mental y emocional de todos los colaboradores.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <Lock className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <strong className="text-xs text-slate-900 block font-bold">100% Confidencial</strong>
              <span className="text-[11px] text-slate-500">Secreto profesional médico</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <strong className="text-xs text-slate-900 block font-bold">Cero Consecuencias</strong>
              <span className="text-[11px] text-slate-500">No afecta tu estabilidad</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <strong className="text-xs text-slate-900 block font-bold">Plan de Mejora</strong>
              <span className="text-[11px] text-slate-500">Para optimizar tu jornada</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'El Propósito Central de SST',
      title: '¿Cuál es el Objeto de la Seguridad y Salud en el Trabajo?',
      subtitle: 'Proteger la integridad integral de cada colaborador',
      speakerNotes: 'Recuerde al auditorio que SST no solo cuida el casco, las botas o la postura. La mente, las emociones y el descanso son igual de importantes para volver sanos a casa cada día.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto py-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900 leading-snug">
              Proteger a la persona frente a todos los factores del entorno laboral
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              La Seguridad y Salud en el Trabajo (SG-SST) tiene la misión legal y humana de prevenir enfermedades y accidentes generados por cualquier agente:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Físicos y Mecánicos
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Químicos y Biológicos
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Ergonómicos
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-900 flex items-center gap-2 border border-indigo-200">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Factores Psicosociales
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-indigo-950 font-bold block text-sm">Salud Integral</strong>
                <span className="text-xs text-indigo-700">Física + Mental + Social</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic border-l-2 border-indigo-400 pl-3">
              "La salud no es solamente la ausencia de afecciones o enfermedades, sino un estado de completo bienestar físico, mental y social." — Organización Mundial de la Salud (OMS).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'Responsabilidad Compartida',
      title: '¿Responsabilidad de Quién?',
      subtitle: 'El compromiso de la empresa y la participación activa del trabajador',
      speakerNotes: 'Haga énfasis en que la empresa invierte tiempo y recursos para cumplir con este deber. La empresa pone los medios, y el trabajador aporta su honestidad para que el diagnóstico sea real.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-4">
          <div className="p-6 bg-white rounded-3xl border-2 border-indigo-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-700">
              <Building2 className="w-6 h-6" />
              <h4 className="font-black text-base text-slate-900">Deber de la Empresa</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Identificar y evaluar formalmente las condiciones de trabajo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Definir e implementar acciones de prevención e intervención.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Fomentar un clima laboral sano, respetuoso y productivo.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-700">
              <Users className="w-6 h-6" />
              <h4 className="font-black text-base text-slate-900">Rol del Colaborador</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Participar de forma libre y con total honestidad.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Aportar su percepción real sin temor a represalias.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Ser agente de cambio para las mejoras que se definan en equipo.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'Definición Científica y Cotidiana',
      title: '¿Qué es Realmente el Riesgo Psicosocial?',
      subtitle: 'Comprendiendo cómo el entorno laboral dialoga con nuestra mente',
      speakerNotes: 'Evite términos excesivamente técnicos. Explique con ejemplos: turnos largos, ruido, mala comunicación o falta de claridad en las funciones generan tensión que el cuerpo acumula.',
      content: (
        <div className="max-w-3xl mx-auto text-center space-y-6 py-4">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-semibold">
              "Es la probabilidad de que las condiciones del trabajo (ritmos, relaciones, cargas) y del entorno extra-laboral interactúen con nuestras capacidades, generando <span className="text-rose-600 font-black">estrés nocivo</span> capaz de afectar la salud, el bienestar y el rendimiento."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left space-y-1">
              <strong className="text-xs uppercase text-indigo-600 font-black block">1. Intralaboral</strong>
              <p className="text-xs text-slate-600">
                Lo que ocurre en la empresa: turnos, liderazgo, sobrecarga, claridad de rol, herramientas de trabajo.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left space-y-1">
              <strong className="text-xs uppercase text-purple-600 font-black block">2. Extralaboral</strong>
              <p className="text-xs text-slate-600">
                Entorno externo: tiempo libre, tiempo de desplazamiento, relaciones familiares, situación del hogar.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left space-y-1">
              <strong className="text-xs uppercase text-rose-600 font-black block">3. Individual</strong>
              <p className="text-xs text-slate-600">
                Cómo cada persona percibe y afronta la presión, sus hábitos de descanso y habilidades emocionales.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'Salud y Prevención',
      title: '¿Por Qué es Vital Gestionar el Estrés a Tiempo?',
      subtitle: 'El estrés ignorado se somatiza en el cuerpo y afecta a tu familia',
      speakerNotes: 'Conecte con la realidad del trabajador: pregunte si alguna vez han tenido dolor de espalda o migraña después de un día muy pesado. Eso es somatización, y el programa busca evitar que se vuelva crónico.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-5">
          <p className="text-center text-xs sm:text-sm text-slate-600">
            A corto plazo el estrés nos activa, pero cuando se vuelve continuo y desmedido, impacta múltiples sistemas del organismo:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center space-y-1.5">
              <Flame className="w-6 h-6 text-rose-600 mx-auto" />
              <strong className="text-xs text-rose-950 block font-bold">Músculos y Columna</strong>
              <span className="text-[11px] text-slate-600 block">Dolor en cuello, espalda y hombros tensos.</span>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1.5">
              <Activity className="w-6 h-6 text-amber-600 mx-auto" />
              <strong className="text-xs text-amber-950 block font-bold">Gastrointestinal</strong>
              <span className="text-[11px] text-slate-600 block">Gastritis por tensión, colon irritable, pesadez.</span>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-1.5">
              <Clock className="w-6 h-6 text-purple-600 mx-auto" />
              <strong className="text-xs text-purple-950 block font-bold">Sueño y Descanso</strong>
              <span className="text-[11px] text-slate-600 block">Insomnio, cansancio al despertar, fatiga continua.</span>
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-center space-y-1.5">
              <HeartHandshake className="w-6 h-6 text-indigo-600 mx-auto" />
              <strong className="text-xs text-indigo-950 block font-bold">Emocional y Social</strong>
              <span className="text-[11px] text-slate-600 block">Ansiedad, irritabilidad fácil, pérdida de paciencia.</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs text-emerald-800 font-semibold">
            ✓ La evaluación nos permite identificar a tiempo estas alertas antes de que se conviertan en enfermedades laborales.
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'Marco Normativo Colombiano',
      title: '¿Por Qué se Evalúa en las Empresas de Colombia?',
      subtitle: 'Mandato legal del Ministerio del Trabajo para la protección del empleo',
      speakerNotes: 'Aclare que esto no es un invento de Recursos Humanos ni una ocurrencia temporal. Es una exigencia formal de ley expedida por el Ministerio del Trabajo de obligatorio cumplimiento.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto py-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Resolución 2646 / 2008</span>
            <strong className="block text-sm font-bold text-slate-900">Obligatoriedad Nacional</strong>
            <p className="text-xs text-slate-600">
              Establece las disposiciones para identificar, evaluar, prevenir y monitorear el riesgo psicosocial en todos los centros de trabajo del país.
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Resolución 2404 / 2019</span>
            <strong className="block text-sm font-bold text-slate-900">Batería Oficial Javeriana</strong>
            <p className="text-xs text-slate-600">
              Adopta formalmente la Batería de Instrumentos elaborada por la Pontificia Universidad Javeriana como el único estándar legal válido.
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Resolución 2764 / 2022</span>
            <strong className="block text-sm font-bold text-slate-900">Protocolos de Intervención</strong>
            <p className="text-xs text-slate-600">
              Guías específicas para intervenir sectores con alta exigencia emocional (salud, educación, transporte, centros de contacto, etc.).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      badge: 'Contenido de la Encuesta',
      title: '¿Qué me van a Preguntar en el Formulario?',
      subtitle: 'Conoce los 3 componentes que diligenciarás',
      speakerNotes: 'Explique que no son preguntas capciosas ni trampas. Son preguntas de opción múltiple con respuestas como: Siempre, Casi siempre, Algunas veces, Nunca. Se contesta en 15 a 25 minutos.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-3xl border-2 border-indigo-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">1</div>
              <strong className="block text-sm font-bold text-slate-900">Cuestionario Intralaboral</strong>
              <p className="text-xs text-slate-600">
                Tu labor cotidiana: ritmo de trabajo, claridad de responsabilidades, comunicación con el líder y relaciones con compañeros.
              </p>
              <span className="text-[10px] text-indigo-600 font-bold block pt-1">
                Forma A (Profesionales/Jefes) o Forma B (Auxiliares/Operarios)
              </span>
            </div>

            <div className="p-5 bg-white rounded-3xl border-2 border-purple-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">2</div>
              <strong className="block text-sm font-bold text-slate-900">Cuestionario Extralaboral</strong>
              <p className="text-xs text-slate-600">
                Tu vida fuera del trabajo: tiempo que tardas en desplazarte, momentos para el descanso, la familia y la recreación.
              </p>
              <span className="text-[10px] text-purple-600 font-bold block pt-1">
                31 preguntas generales para todos los cargos
              </span>
            </div>

            <div className="p-5 bg-white rounded-3xl border-2 border-rose-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center">3</div>
              <strong className="block text-sm font-bold text-slate-900">Cuestionario de Estrés</strong>
              <p className="text-xs text-slate-600">
                Cómo te has sentido en los <strong>últimos 3 meses</strong>: tensión en el cuerpo, concentración, energía física y calidad del sueño.
              </p>
              <span className="text-[10px] text-rose-600 font-bold block pt-1">
                31 preguntas de sintomatología física y mental
              </span>
            </div>
          </div>
          <div className="text-center text-xs text-slate-500">
            ⏱ Tiempo estimado de diligenciamiento: <strong>15 a 20 minutos</strong> en tu computador o teléfono celular.
          </div>
        </div>
      )
    },
    {
      id: 8,
      badge: 'El Principio Legal de Voluntariedad',
      title: '¿Es Obligatorio Para Mí Diligenciar la Batería?',
      subtitle: 'Diferencia fundamental entre el deber de la empresa y tu derecho individual',
      speakerNotes: 'Este es el punto más liberador para los trabajadores. Diga con claridad: Nadie puede obligarte a firmar ni a contestar. La empresa TIENE que ofrecértelo por ley; pero tú decides participar. Sin embargo, tu voz es la que permite cambiar lo que no funciona.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-4">
          <div className="p-6 bg-rose-50 rounded-3xl border-2 border-rose-200 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-200 px-2 py-0.5 rounded">
              Para el Trabajador: NO
            </span>
            <h4 className="text-xl font-black text-rose-950">Participación 100% Voluntaria</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Como colaborador tienes la <strong>libertad absoluta</strong> de aceptar o declinar responder el instrumento a través del Consentimiento Informado. Nadie puede forzarte.
            </p>
            <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs text-rose-900 font-semibold">
              ¡Pero tu participación es clave! Sin tus respuestas, el psicólogo no sabrá qué sobrecargas existen en tu puesto para sugerir mejoras.
            </div>
          </div>

          <div className="p-6 bg-emerald-50 rounded-3xl border-2 border-emerald-200 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-200 px-2 py-0.5 rounded">
              Para la Empresa: SÍ
            </span>
            <h4 className="text-xl font-black text-emerald-950">Mandato Legal Obligatorio</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Para <strong>{company.nombre}</strong> sí es un mandato de ley ineludible abrir los espacios, suministrar la plataforma y contratar al especialista con licencia SST.
            </p>
            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold">
              El Ministerio del Trabajo sanciona a las empresas que no ofrecen la evaluación a toda su nómina.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      badge: 'Garantía Laboral',
      title: '¡Cero Represalias! No Hay Consecuencias Disciplinarias',
      subtitle: 'El resultado nunca será utilizado en tu contra',
      speakerNotes: 'Mire a los ojos al auditorio: "Si usted responde que su jefe es exigente o que los turnos lo cansan, NADIE lo va a despedir ni a sancionar". Al contrario, esos datos impulsan planes de bienestar.',
      content: (
        <div className="max-w-3xl mx-auto space-y-6 py-4">
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl shadow-lg flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">Blindaje a la Estabilidad Laboral</h4>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                La ley colombiana prohíbe taxativamente usar los resultados de riesgo psicosocial como criterio de evaluación de desempeño, suspensión de contrato o despido.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-xs font-black text-slate-900 block flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Lo que NUNCA pasará:
              </strong>
              <p className="text-xs text-slate-600">
                Llamados de atención, memorandos, cambios arbitrarios de cargo o reproches por tus respuestas.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-xs font-black text-slate-900 block flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Para lo que SÍ se usa:
              </strong>
              <p className="text-xs text-slate-600">
                Pausas activas efectivas, capacitaciones de liderazgo empático, talleres de bienestar y apoyo psicológico si lo necesitas.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      badge: 'Protección Jurídica y Hábeas Data',
      title: 'Consentimiento Informado y Ley 1581 de 2012',
      subtitle: 'Tu autorización legal previa con total control de tus datos',
      speakerNotes: 'Muestre que antes de contestar la primera pregunta, el sistema les muestra el texto legal del Consentimiento Informado donde autorizan únicamente el uso epidemiológico de sus respuestas.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-4 items-center">
          <div className="space-y-3">
            <h4 className="text-xl font-black text-slate-900">
              Un acuerdo transparente antes de iniciar
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              Al abrir la plataforma digital, lo primero que encontrarás es el <strong>Consentimiento Informado</strong>. En este documento se te explica:
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>El propósito estrictamente preventivo de la evaluación.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>La protección de tus datos conforme a la Ley 1581 de 2012.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Tu derecho de retirar tu consentimiento si así lo decides.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" /> Firma Digital Segura
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tu aceptación queda registrada con fecha, hora y trazabilidad cifrada. Nadie puede suplantar tu identidad ni alterar tus respuestas.
            </p>
            <div className="p-3 bg-white/10 rounded-xl text-xs text-slate-200 italic border border-white/10">
              "Garantizo que respondo de forma libre, consciente y voluntaria para contribuir a la salud en mi trabajo."
            </div>
          </div>
        </div>
      )
    },
    {
      id: 11,
      badge: 'Respaldo Académico y Gubernamental',
      title: 'Diseñada por la Universidad Javeriana y MinTrabajo',
      subtitle: 'La metodología psicométrica más robusta y validada de Latinoamérica',
      speakerNotes: 'Resalte que los cuestionarios fueron construidos por un equipo multidisciplinario de psicólogos y estadísticos de la U. Javeriana, con pruebas de confiabilidad en miles de trabajadores colombianos.',
      content: (
        <div className="max-w-3xl mx-auto py-4 space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 py-2">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <Award className="w-8 h-8 text-indigo-600" />
              <div className="text-left">
                <strong className="block text-xs font-black text-slate-900">Pontificia Universidad Javeriana</strong>
                <span className="text-[11px] text-slate-500">Diseño científico y baremos oficiales</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div className="text-left">
                <strong className="block text-xs font-black text-slate-900">Ministerio del Trabajo</strong>
                <span className="text-[11px] text-slate-500">Adopción normativa nacional</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200 text-xs sm:text-sm text-slate-700 text-justify leading-relaxed">
            Esta batería evalúa científicamente 4 dimensiones clave: <strong>Liderazgo</strong>, <strong>Control sobre el Trabajo</strong>, <strong>Demandas del Trabajo</strong> y <strong>Recompensas</strong>, garantizando que cada ítem mide aspectos reales del clima laboral colombiano con baremos ajustados por sector y cargo.
          </div>
        </div>
      )
    },
    {
      id: 12,
      badge: 'Máximo Blindaje Ético',
      title: 'Confidencialidad y Reserva de Historia Clínica',
      subtitle: 'La empresa NUNCA tendrá acceso a tus respuestas individuales',
      speakerNotes: 'Este es el slide de mayor impacto emocional. Diga con contundencia: "El jefe de personal, el gerente o su supervisor jamás verán qué respondió usted. Solo el psicólogo especialista custodia la información bajo secreto médico (Ley 1090 de 2006)".',
      content: (
        <div className="max-w-4xl mx-auto py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase">
                <Lock className="w-4 h-4" /> Secreto Profesional Médico
              </div>
              <h4 className="text-xl font-black text-white">Historia Clínica Ocupacional</h4>
              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                De acuerdo con la <strong>Ley 1090 de 2006</strong> (Código Deontológico de Psicología) y la Resolución 2346 de 2007, tus cuestionarios tienen el mismo carácter reservado que una historia médica. Revelarlos constituye delito penal.
              </p>
              <div className="p-3 bg-white/10 rounded-xl text-xs text-emerald-400 font-mono">
                Custodiado exclusivamente por Psicólogo con Licencia SST Vigente.
              </div>
            </div>

            <div className="p-6 bg-white border-2 border-slate-200 rounded-3xl space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase">
                <Users className="w-4 h-4" /> ¿Qué Recibe la Empresa?
              </div>
              <h4 className="text-xl font-black text-slate-900">Únicamente Resultados Globales</h4>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                La gerencia y el área de SST solo reciben estadísticas consolidadas del grupo (por ejemplo: <em>"El 60% del personal percibe alta carga en turnos"</em>). <strong>Jamás</strong> sabrán quién contestó qué.
              </p>
              <div className="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-900 font-bold border border-indigo-200">
                Tu anonimato frente a tus superiores está garantizado al 100%.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 13,
      badge: 'Preguntas Frecuentes y Cierre',
      title: '¡Tu Participación Transforma Nuestra Empresa!',
      subtitle: 'Agradecemos tu tiempo y compromiso con la salud de todos',
      speakerNotes: 'Abra el espacio para preguntas del auditorio. Reitere las fechas de aplicación del enlace digital y motive a todos a responder con tranquilidad desde su celular o puesto de trabajo.',
      content: (
        <div className="max-w-3xl mx-auto py-2 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
            <Smile className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              ¡Muchas Gracias por Ser Parte del Cambio!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Recibirás el enlace personalizado en tu correo o celular para diligenciar tu batería en el horario acordado.
            </p>
          </div>

          {/* Quick FAQ summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <strong className="text-xs text-slate-900 block font-bold">¿Cuánto tiempo toma?</strong>
              <span className="text-[11px] text-slate-500 block">Aprox. 15 a 20 minutos de forma fluida.</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <strong className="text-xs text-slate-900 block font-bold">¿Desde dónde contesto?</strong>
              <span className="text-[11px] text-slate-500 block">Desde cualquier smartphone, tablet o PC.</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <strong className="text-xs text-slate-900 block font-bold">¿Si tengo dudas?</strong>
              <span className="text-[11px] text-slate-500 block">Acércate al equipo de SST o al psicólogo.</span>
            </div>
          </div>

          <div className="pt-2 text-xs font-semibold text-indigo-700">
            {company.nombre} • Comprometidos con un Entorno Laboral Saludable
          </div>
        </div>
      )
    }
  ];

  // -------------------------------------------------------------
  // SLIDES DATA: DECK 2 - SOCIALIZACIÓN DE RESULTADOS OFICIALES
  // -------------------------------------------------------------
  const resultadosSlides = [
    {
      id: 1,
      badge: 'Socialización Oficial de Resultados',
      title: 'Diagnóstico de Riesgo Psicosocial',
      subtitle: `Presentación Formal de Resultados y Plan de Intervención para ${company.nombre}`,
      speakerNotes: 'Dé la bienvenida al Comité de Convivencia, COPASST y líderes de área. Enfatice que los resultados muestran oportunidades de optimización y que el compromiso de todos es ejecutar las mejoras acordadas.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto py-6">
          <div className="w-20 h-20 rounded-3xl bg-rose-600/10 border-2 border-rose-500/30 flex items-center justify-center text-rose-600 shadow-inner">
            <Presentation className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <span className="text-xs uppercase font-black tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Socialización Grupal SG-SST • Res. 2404 de 2019
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Resultados Consolidados de <span className="text-rose-700">{company.nombre}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Dossier analítico de clima y salud laboral presentado ante el COPASST, Comité de Convivencia y Directivas.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <strong className="text-xs text-slate-500 block">Población Evaluada</strong>
              <span className="text-lg font-black text-slate-900">{totalTrabajadores} Colaboradores</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <strong className="text-xs text-slate-500 block">Nivel de Riesgo</strong>
              <span className="text-lg font-black text-rose-700">{company.resumenRiesgo?.semaforoGeneral || 'ALTO'}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <strong className="text-xs text-slate-500 block">Cobertura</strong>
              <span className="text-lg font-black text-emerald-700">100% Censo</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <strong className="text-xs text-slate-500 block">Vigencia</strong>
              <span className="text-lg font-black text-indigo-700">2026 - 2027</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'Ficha Metodológica',
      title: 'Ficha Técnica del Estudio Psicométrico',
      subtitle: 'Respaldo científico y rigor en la recolección de información',
      speakerNotes: 'Muestre a la mesa directiva la validez del instrumento. Se aplicaron las formas correspondientes de la Universidad Javeriana conforme al nivel jerárquico.',
      content: (
        <div className="max-w-3xl mx-auto py-4 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Razón Social</span>
                <strong className="text-slate-900 font-bold block">{company.nombre}</strong>
                <span className="text-slate-500 text-xs">NIT: {company.nit}</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Psicólogo Evaluador</span>
                <strong className="text-slate-900 font-bold block">{company.psicologoEvaluador?.nombre || 'Jimmy Martínez B.'}</strong>
                <span className="text-slate-500 text-xs">Licencia SST: {company.psicologoEvaluador?.licenciaSST || 'LIC-SST-45920'}</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Instrumento Empleado</span>
                <strong className="text-slate-900 font-bold block">Batería U. Javeriana / MinTrabajo</strong>
                <span className="text-slate-500 text-xs">Resolución 2404 de 2019</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Custodia y Archivo</span>
                <strong className="text-slate-900 font-bold block">20 Años en Custodia SG-SST</strong>
                <span className="text-slate-500 text-xs">Dec. 1072/2015 Art. 2.2.4.6.13</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'Visión General',
      title: 'Radiografía Consolidada de la Empresa',
      subtitle: 'Distribución global del personal evaluado en los 5 niveles normativos',
      speakerNotes: 'Explique la distribución general. Es normal que en empresas de alta demanda existan grupos en riesgo medio y alto. Lo fundamental es que ya sabemos dónde actuar.',
      content: (
        <div className="max-w-4xl mx-auto py-4 space-y-6">
          {/* Multi-Zone Distribution Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Distribución en los 5 Niveles Javeriana</span>
              <span>Total Evaluados: {totalTrabajadores} (100%)</span>
            </div>
            <div className="h-7 w-full rounded-2xl overflow-hidden flex shadow-inner border border-slate-300 text-white font-black text-xs">
              <div style={{ width: '14%' }} className="bg-emerald-700 flex items-center justify-center" title="Sin Riesgo">14%</div>
              <div style={{ width: '29%' }} className="bg-lime-500 text-slate-950 flex items-center justify-center" title="Bajo">29%</div>
              <div style={{ width: '14%' }} className="bg-amber-400 text-slate-950 flex items-center justify-center" title="Medio">14%</div>
              <div style={{ width: '29%' }} className="bg-orange-500 flex items-center justify-center" title="Alto">29%</div>
              <div style={{ width: '14%' }} className="bg-rose-600 flex items-center justify-center animate-pulse" title="Muy Alto">14%</div>
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-slate-600 pt-1">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-700" /> Sin Riesgo (14%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-lime-500" /> Bajo (29%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400" /> Medio (14%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-orange-500" /> Alto (29%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-600" /> Muy Alto (14%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <strong className="text-xs font-bold uppercase text-emerald-900 block">43% Población Favorable</strong>
              <p className="text-xs text-slate-700">
                Colaboradores en rangos <strong>Sin Riesgo</strong> y <strong>Riesgo Bajo</strong>. Cuentan con factores protectores sólidos y estabilidad.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <strong className="text-xs font-bold uppercase text-rose-900 block">43% Población de Atención Prioritaria</strong>
              <p className="text-xs text-slate-700">
                Colaboradores en <strong>Riesgo Alto y Muy Alto</strong>. Concentrados en turnos nocturnos y sobrecarga de urgencias asistenciales.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'Diagnóstico por Dominios',
      title: 'Resultados de los 4 Dominios Intralaborales',
      subtitle: 'Comportamiento de la gestión organizacional en la empresa',
      speakerNotes: 'Detalle cómo el Control sobre el trabajo es el gran factor protector de la empresa (la gente sabe lo que hace), mientras que las Demandas del trabajo son el foco donde se concentra la fatiga.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border-2 border-rose-200 shadow-sm space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black text-rose-950 uppercase">1. Demandas del Trabajo</span>
                <span className="text-xs font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded">85% CRÍTICO</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '85%' }} className="bg-rose-600 h-full rounded-full" />
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Sobrecarga en procedimientos clínicos continuos y jornadas extendidas.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black text-amber-950 uppercase">2. Liderazgo y Relaciones</span>
                <span className="text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded">45% MEDIO</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '45%' }} className="bg-amber-400 h-full rounded-full" />
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Buen trato entre compañeros; necesidad de formalizar retroalimentación de jefaturas.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 shadow-sm space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black text-amber-950 uppercase">3. Recompensas</span>
                <span className="text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded">38% MEDIO</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '38%' }} className="bg-amber-400 h-full rounded-full" />
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Oportunidad para potenciar el reconocimiento del esfuerzo y salario emocional.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-emerald-200 shadow-sm space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black text-emerald-950 uppercase">4. Control y Claridad</span>
                <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">18% PROTECTOR</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: '18%' }} className="bg-emerald-600 h-full rounded-full" />
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Gran autonomía profesional, protocolos técnicos claros y dominio del cargo.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'Aspectos Positivos a Preservar',
      title: 'Factores Protectores Identificados',
      subtitle: 'Las fortalezas que debemos celebrar y sostener en el equipo',
      speakerNotes: 'Importantísimo: no todo es problema. Destacar lo que la empresa hace muy bien levanta la moral del equipo y consolida el sentido de pertenencia.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-200 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-black text-sm text-emerald-950">Estabilidad Laboral Percibida</h4>
              <p className="text-xs text-slate-600">
                La gran mayoría del personal cuenta con contratos a término indefinido, generando seguridad económica y arraigo institucional.
              </p>
            </div>

            <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-200 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-black text-sm text-indigo-950">Solidaridad y Trabajo en Equipo</h4>
              <p className="text-xs text-slate-600">
                Excelente disposición para apoyarse mutuamente durante turnos complejos y emergencias clínicas imprevistas.
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-3xl border border-purple-200 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-black text-sm text-purple-950">Orgullo y Vocación Asistencial</h4>
              <p className="text-xs text-slate-600">
                Alto sentido del propósito: los colaboradores valoran el impacto social y humano de la labor que desempeñan a diario.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'Focos de Acción',
      title: 'Los 3 Retos Prioritarios de Intervención',
      subtitle: 'Donde concentraremos los recursos del SG-SST durante el año',
      speakerNotes: 'Conecte los resultados con la acción. Estos tres puntos son los que se formalizarán en el plan de trabajo anual de SST.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border-l-4 border-rose-600 shadow-sm flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 font-black text-xs shrink-0">
                Foco 1
              </div>
              <div>
                <strong className="text-sm font-black text-slate-900 block">
                  Regulación de Pausas y Descansos Asistenciales
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Protocolo de desconexión física y visual de 10 minutos entre cirugías y procedimientos prolongados para reducir cefaleas tensionales.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border-l-4 border-amber-500 shadow-sm flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 font-black text-xs shrink-0">
                Foco 2
              </div>
              <div>
                <strong className="text-sm font-black text-slate-900 block">
                  Fortalecimiento del Comité de Convivencia Laboral (CCL)
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Capacitación al comité en mediación ágil de tensiones cotidianas y comunicación asertiva bajo el marco de la Ley 1010 de 2006.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border-l-4 border-indigo-600 shadow-sm flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 font-black text-xs shrink-0">
                Foco 3
              </div>
              <div>
                <strong className="text-sm font-black text-slate-900 block">
                  Programa de Reconocimiento y Salario Emocional
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Implementación de jornadas flexibles de cumpleaños, felicitaciones institucionales y celebraciones periódicas de metas cumplidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      badge: 'Hoja de Ruta PHVA',
      title: 'Cronograma Anual de Intervención (2026 - 2027)',
      subtitle: 'Ciclo PHVA para asegurar mejoras continuas y medibles',
      speakerNotes: 'Muestre las 4 fases del año. Esto demuestra al COPASST que no es una encuesta que se engaveta, sino un programa vivo con seguimiento trimestral.',
      content: (
        <div className="max-w-4xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-2xl border-t-4 border-indigo-600 shadow-sm space-y-2">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Planear (Meses 1-3)
              </span>
              <strong className="block text-xs font-bold text-slate-900">Adopción y Protocolos</strong>
              <p className="text-[11px] text-slate-600">
                Firma formal del plan, socialización de descansos y conformación de la mesa técnica de seguimiento.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-t-4 border-blue-600 shadow-sm space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Hacer (Meses 4-6)
              </span>
              <strong className="block text-xs font-bold text-slate-900">Talleres Vivenciales</strong>
              <p className="text-[11px] text-slate-600">
                Jornadas de 10 Habilidades OMS para el manejo del estrés y talleres de comunicación no violenta.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-t-4 border-amber-500 shadow-sm space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Verificar (Meses 7-9)
              </span>
              <strong className="block text-xs font-bold text-slate-900">Monitoreo Trimestral</strong>
              <p className="text-[11px] text-slate-600">
                Revisión conjunta de ausentismo médico y reporte de cumplimiento del plan con el COPASST.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border-t-4 border-emerald-600 shadow-sm space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Actuar (Meses 10-12)
              </span>
              <strong className="block text-xs font-bold text-slate-900">Reevaluación de Control</strong>
              <p className="text-[11px] text-slate-600">
                Aplicación de la medición de control anual para cuantificar la disminución del riesgo y rendir cuentas.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      badge: 'Compromiso Institucional',
      title: 'Pacto Colectivo por la Salud Mental',
      subtitle: 'La firma del compromiso conjunto entre Directivas y Colaboradores',
      speakerNotes: 'Concluya con una llamada a la acción: "Cuidar la salud mental de nuestra empresa no es solo tarea de SST, es el pacto diario de cuidarnos entre todos". Invite a aplaudir y formalizar el cierre.',
      content: (
        <div className="max-w-3xl mx-auto py-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center shadow-inner">
            <HeartHandshake className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              ¡Construyendo un Espacio de Trabajo Más Humano!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              El diagnóstico es el punto de partida. La verdadera transformación ocurre en el respeto diario, las pausas oportunas y la empatía en equipo.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <strong className="text-sm font-bold text-white block">Dictamen Oficial Avalado</strong>
              <span className="text-xs text-slate-300">Resolución 2404 de 2019 • Mintrabajo Colombia</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" /> SG-SST 100% al Día
            </div>
          </div>

          <div className="text-xs text-slate-400">
            {company.nombre} • Socialización Registrada en Actas del COPASST y CCL
          </div>
        </div>
      )
    }
  ];

  // Active slides collection based on selected mode
  const slides = deckMode === 'sensibilizacion' ? sensibilizacionSlides : resultadosSlides;
  const current = slides[currentSlide] || slides[0];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={containerRef} className="space-y-6 select-none print:space-y-8">
      {/* Top Controls Bar (Hidden in Fullscreen Print) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Presentation className="w-5 h-5 text-indigo-600" />
              Diapositivas de Socialización y Sensibilización
            </h2>
            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-full">
              Modo Presentador
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Proyecta en auditorio o videollamada para sensibilizar al personal o presentar hallazgos a comités directivos.
          </p>
        </div>

        {/* Deck Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => handleModeSwitch('sensibilizacion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                deckMode === 'sensibilizacion'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              1. Sensibilización Previa (13 slides)
            </button>
            <button
              onClick={() => handleModeSwitch('resultados')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                deckMode === 'resultados'
                  ? 'bg-white text-rose-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              2. Socialización de Resultados (8 slides)
            </button>
          </div>

          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
              showSpeakerNotes
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Guion con notas sugeridas para el psicólogo"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Guion Psicólogo</span>
          </button>

          <button
            onClick={() => setShowThumbnailGrid(!showThumbnailGrid)}
            className="flex items-center gap-1.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-xs font-bold px-3 py-2 rounded-xl transition-all"
            title="Ver cuadrícula de diapositivas"
          >
            <Grid className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Índice</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-md"
            title="Proyectar a pantalla completa (Tecla F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Pantalla Completa'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-200"
            title="Imprimir o Exportar diapositivas a PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Thumbnail Modal/Drawer */}
      {showThumbnailGrid && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-4 print:hidden animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-600" />
              Índice de Diapositivas ({slides.length})
            </h3>
            <button
              onClick={() => setShowThumbnailGrid(false)}
              className="text-xs text-slate-400 hover:text-slate-700 font-bold"
            >
              Cerrar ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-72 overflow-y-auto p-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlide(idx);
                  setShowThumbnailGrid(false);
                }}
                className={`p-3 rounded-2xl border text-left space-y-1 transition-all ${
                  currentSlide === idx
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400">
                  <span>Slide {idx + 1}</span>
                  {currentSlide === idx && <Check className="w-3 h-3 text-indigo-600" />}
                </div>
                <strong className="text-xs text-slate-900 font-bold line-clamp-1 block">
                  {s.title}
                </strong>
                <span className="text-[10px] text-slate-500 line-clamp-1 block">
                  {s.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Slide Presentation Stage (16:9 Aspect Ratio) */}
      <div className={`bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-3xl border-2 border-slate-200 shadow-2xl relative overflow-hidden flex flex-col justify-between ${
        isFullscreen ? 'h-screen p-8 sm:p-14' : 'min-h-[580px] p-6 sm:p-12'
      }`}>
        
        {/* Slide Header */}
        <div className="border-b border-slate-200/80 pb-4 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full inline-block">
              {current.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {current.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {current.subtitle}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-black text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm block">
              {currentSlide + 1} / {slides.length}
            </span>
            <span className="text-[10px] text-slate-400 font-bold block mt-1">
              {company.nombre}
            </span>
          </div>
        </div>

        {/* Slide Body (Dynamic Content) */}
        <div className="flex-1 flex flex-col justify-center py-6">
          {current.content}
        </div>

        {/* Slide Footer with Controls */}
        <div className="border-t border-slate-200/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-700">Tips de Teclado:</span>
            <span>Usa <strong>← / →</strong> para avanzar o retroceder • <strong>F</strong> pantalla completa</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                currentSlide === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            {/* Slide Progress Dots */}
            <div className="hidden md:flex items-center gap-1 px-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Ir a diapositiva ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all ${
                currentSlide === slides.length - 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-200'
              }`}
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer (Facilitator Script) */}
      {showSpeakerNotes && (
        <div className="bg-amber-50/80 rounded-3xl border-2 border-amber-200 p-5 shadow-sm space-y-2 print:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
            <Volume2 className="w-4 h-4 text-amber-700" />
            Guion Sugerido para el Psicólogo Facilitador (Slide {currentSlide + 1})
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic bg-white p-4 rounded-2xl border border-amber-200 shadow-inner">
            "{current.speakerNotes}"
          </p>
        </div>
      )}

      {/* Printable All-Slides View (Visible Only When Printing) */}
      <div className="hidden print:block space-y-12">
        {slides.map((s, idx) => (
          <div key={s.id} className="p-8 border-2 border-slate-300 rounded-3xl page-break-after space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-xs font-black text-indigo-700 uppercase">{s.badge}</span>
                <h3 className="text-xl font-black text-slate-900">{s.title}</h3>
                <span className="text-xs text-slate-500">{s.subtitle}</span>
              </div>
              <span className="text-xs font-black text-slate-700">Slide {idx + 1} de {slides.length}</span>
            </div>
            <div className="py-4">
              {s.content}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
