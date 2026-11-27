/**
 * SISTEMA DE VIGILANCIA EPIDEMIOLÓGICA (SVE / PVE) DE RIESGO PSICOSOCIAL
 * Basado en las especificaciones normativas de Colombia:
 * - Resolución 2646 de 2008 (Capítulo III - Vigilancia Epidemiológica)
 * - Resolución 2404 de 2019 (Obligatoriedad anual para empresas con Riesgo Alto/Muy Alto)
 * - Resolución 2764 de 2022 (Actualización de instrumentos y confidencialidad)
 * - Matriz de Medidas de Control MT-17 (Ciclo PHVA & 4 Indicadores Oficiales)
 * - Formato Técnico de Programa SVE PG-06
 */

export const PVE_POPULATION_GROUPS = [
  {
    id: 1,
    codigo: 'GRUPO-1',
    nombre: 'Grupo 1 - Población Expuesta / Sana',
    subtitulo: 'Nivel Sin Riesgo o Riesgo Bajo',
    nivelPrevencion: 'Prevención Primaria',
    color: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    descripcion: 'Colaboradores sin alteraciones psicosociales o sintomatología de estrés clínicamente significativa. Se mantienen en monitoreo rutinario con medidas de bienestar organizacional y estilos de vida saludables.',
    estrategias: [
      'Promoción de estilos de vida saludables y pausas activas físicas y cognitivas.',
      'Capacitación continua en gestión del tiempo y equilibrio trabajo-familia.',
      'Sensibilización en prevención del acoso laboral (Ley 1010) y funcionamiento del CCL.',
      'Evaluación bienal de seguimiento psicosocial (Res. 2404/2019).'
    ]
  },
  {
    id: 2,
    codigo: 'GRUPO-2',
    nombre: 'Grupo 2 - Grupo de Exposición Similar (GES) con Sintomatología Leve',
    subtitulo: 'Nivel de Riesgo Medio',
    nivelPrevencion: 'Prevención Secundaria Colectiva',
    color: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    descripcion: 'Población expuesta a dominios o dimensiones en nivel Medio (ej. Demandas de carga mental o inconsistencia del rol). No presentan incapacidades asociadas pero requieren intervención grupal oportuna.',
    estrategias: [
      'Talleres vivenciales de las 10 Habilidades para la Vida (OMS).',
      'Talleres de Inteligencia Emocional, Comunicación Asertiva y resolución de conflictos.',
      'Revisión ergonómica y redistribución de cargas de trabajo por área.',
      'Seguimiento semestral por parte del Comité de Convivencia y SST.'
    ]
  },
  {
    id: 3,
    codigo: 'GRUPO-3',
    nombre: 'Grupo 3 - Casos Sospechosos / En Estudio Prioritario',
    subtitulo: 'Nivel de Riesgo Alto o Muy Alto (Estrés / Intralaboral)',
    nivelPrevencion: 'Prevención Secundaria Individual',
    color: 'rose',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    descripcion: 'Colaboradores con puntajes consolidados en Alto o Muy Alto en la evaluación de estrés o factores intralaborales críticos. Alerta temprana para evitar el desencadenamiento de patologías.',
    estrategias: [
      'Valoración y orientación psicológica ocupacional individual (hasta 3 consultas confidenciales).',
      'Emisión de recomendaciones médico-laborales preventivas a la gerencia.',
      'Remisión prioritaria a Medicina General / Especializada a través de la EPS.',
      'Estudio analítico de puesto de trabajo y ajuste de jornada u objetivos.'
    ]
  },
  {
    id: 4,
    codigo: 'GRUPO-4',
    nombre: 'Grupo 4 - Casos Confirmados / Patología Calificada',
    subtitulo: 'Diagnóstico Clínico de Trastorno Adaptativo, Depresión, Ansiedad o Burnout',
    nivelPrevencion: 'Prevención Terciaria & Rehabilitación',
    color: 'purple',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    descripcion: 'Trabajadores con diagnóstico médico de enfermedad laboral (o común agravada por el trabajo) asociada a riesgo psicosocial, con incapacidades temporales o recomendaciones permanentes.',
    estrategias: [
      'Reincorporación laboral asistida y adaptación formal de puesto de trabajo.',
      'Seguimiento con la Administradora de Riesgos Laborales (ARL) y EPS tratante.',
      'Seguimiento mensual del plan de rehabilitación y evolución psicoterapéutica.',
      'Monitoreo pericial estricto con custodia de historia ocupacional confidencial.'
    ]
  }
];

export const INITIAL_PHVA_ACTIVITIES = [
  // PLANEAR (P)
  {
    id: 'act-01',
    fase: 'Planear',
    actividad: 'Diseño e instauración formal del Programa de Vigilancia Epidemiológica (PVE) en el SG-SST',
    responsable: 'Psicólogo Especialista SST / Líder SG-SST',
    meta: '1 documento aprobado por Gerencia y COPASST',
    programado: true,
    ejecutado: true,
    meses: ['ENE', 'FEB'],
    evidencia: 'Acta de aprobación COPASST y documento PG-06 firmado'
  },
  {
    id: 'act-02',
    fase: 'Planear',
    actividad: 'Segmentación epidemiológica y priorización de Grupos de Exposición Similar (GES)',
    responsable: 'Psicólogo Especialista SST',
    meta: '100% de la población evaluada segmentada en los 4 grupos',
    programado: true,
    ejecutado: true,
    meses: ['FEB', 'MAR'],
    evidencia: 'Matriz de estratificación PG-06 con baremos Res. 2764/2022'
  },
  // HACER (H)
  {
    id: 'act-03',
    fase: 'Hacer',
    actividad: 'Capacitación y sensibilización al Comité de Convivencia Laboral (CCL) sobre Ley 1010 y resolución de conflictos',
    responsable: 'Comité de Convivencia / Psicólogo SST',
    meta: 'Capacitar al 100% de los integrantes del CCL',
    programado: true,
    ejecutado: true,
    meses: ['MAR'],
    evidencia: 'Registro de asistencia y evaluación de eficacia de capacitación CCL'
  },
  {
    id: 'act-04',
    fase: 'Hacer',
    actividad: 'Programa de Bienestar, Reconocimiento y Fortalecimiento del Clima Laboral (Incentivos y compensaciones)',
    responsable: 'Talento Humano / Gerencia',
    meta: 'Ejecutar 4 jornadas de reconocimiento semestrales',
    programado: true,
    ejecutado: true,
    meses: ['MAR', 'MAY', 'AGO', 'NOV'],
    evidencia: 'Actas de entrega de incentivos por desempeño y actividades de integración'
  },
  {
    id: 'act-05',
    fase: 'Hacer',
    actividad: 'Taller vivencial: Desarrollo de las 10 Habilidades para la Vida (Metodología OMS)',
    responsable: 'Psicólogo Especialista SST',
    meta: 'Cobertura del 90% de los colaboradores de GES sintomático',
    programado: true,
    ejecutado: true,
    meses: ['ABR', 'OCT'],
    evidencia: 'Listas de asistencia y material didáctico de las 10 habilidades para la vida'
  },
  {
    id: 'act-06',
    fase: 'Hacer',
    actividad: 'Taller de Inteligencia Emocional, Autocontrol y Comunicación Asertiva en equipos de trabajo',
    responsable: 'Psicólogo Especialista SST / ARL',
    meta: '90% de asistencia de áreas operativas y asistenciales',
    programado: true,
    ejecutado: true,
    meses: ['JUN'],
    evidencia: 'Registro fotográfico y firmas de asistencia a taller de comunicación'
  },
  {
    id: 'act-07',
    fase: 'Hacer',
    actividad: 'Jornada de Hábitos de Vida Saludable, Prevención de Adicciones (Tabaco, Alcohol, Drogas) y Manejo del Estrés',
    responsable: 'Líder SG-SST / EPS Asignada',
    meta: '100% de colaboradores sensibilizados',
    programado: true,
    ejecutado: false,
    meses: ['AGO', 'NOV'],
    evidencia: 'Folleto divulgativo y firmas de socialización'
  },
  {
    id: 'act-08',
    fase: 'Hacer',
    actividad: 'Sesiones individuales de orientación psicológica y valoración de casos en alerta (Grupo 3 y 4)',
    responsable: 'Psicólogo Especialista con Licencia SST',
    meta: '100% de colaboradores con riesgo Alto/Muy Alto valorados',
    programado: true,
    ejecutado: true,
    meses: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    evidencia: 'Fichas de atención clínica individual y remisiones médicas confidenciales'
  },
  // VERIFICAR (V)
  {
    id: 'act-09',
    fase: 'Verificar',
    actividad: 'Cálculo y consolidación semestral de Indicadores SG-SST (Cumplimiento, Cobertura, Incidencia, Prevalencia)',
    responsable: 'Líder SG-SST / Psicólogo Evaluador',
    meta: 'Cumplimiento >= 90%, Cobertura 100%, Incidencia 0%',
    programado: true,
    ejecutado: true,
    meses: ['JUN', 'DIC'],
    evidencia: 'Informe semestral de indicadores MT-17 presentado al COPASST'
  },
  {
    id: 'act-10',
    fase: 'Verificar',
    actividad: 'Auditoría interna de cumplimiento del PVE por parte del COPASST',
    responsable: 'COPASST / Asesor SST',
    meta: '1 auditoría anual al programa de riesgo psicosocial',
    programado: true,
    ejecutado: false,
    meses: ['NOV'],
    evidencia: 'Lista de chequeo de auditoría y plan de acción de hallazgos'
  },
  // ACTUAR (A)
  {
    id: 'act-11',
    fase: 'Actuar',
    actividad: 'Reunión de Rendición de Cuentas con Gerencia y asignación de recursos para el nuevo periodo',
    responsable: 'Gerencia General / Líder SG-SST',
    meta: '1 reunión de revisión gerencial del PVE',
    programado: true,
    ejecutado: false,
    meses: ['DIC'],
    evidencia: 'Acta de revisión por la dirección y presupuesto SVE 2027 aprobado'
  },
  {
    id: 'act-12',
    fase: 'Actuar',
    actividad: 'Ajuste de medidas de control y actualización de la Matriz de Peligros y Riesgos (GTC 45)',
    responsable: 'Líder SG-SST',
    meta: 'Matriz actualizada con las nuevas valoraciones psicosociales',
    programado: true,
    ejecutado: true,
    meses: ['DIC'],
    evidencia: 'Matriz IPEVR actualizada con controles psicosociales incorporados'
  }
];

export const INITIAL_PVE_CASES = [
  {
    id: 'case-001',
    companyId: 'emp-001',
    workerId: 'A1',
    nombre: 'Dr. Diego Atuesta',
    cedula: '79845210',
    cargo: 'Médico Veterinario Director',
    grupo: 3,
    alerta: 'Nivel Alto en Estrés (44.80) & Muy Alto en Demandas Emocionales (49.00)',
    estado: 'En Orientación',
    sesionesRealizadas: 2,
    sesionesTotales: 3,
    fechaIngreso: '2026-11-22',
    ultimaSesion: '2026-11-25',
    remision: 'No requerida por ahora (apoyo en delegación de cirugías nocturnas)',
    recomendacionLaboral: 'Ajustar turnos continuos de cirugía. Designar coordinador de apoyo administrativo para reducir carga de gestión.',
    confidencialidad: 'Custodia bajo secreto profesional (Ley 1090/2006).'
  },
  {
    id: 'case-002',
    companyId: 'emp-001',
    workerId: 'B1',
    nombre: 'Ana María Torres',
    cedula: '52984123',
    cargo: 'Auxiliar Veterinaria / Recepcionista',
    grupo: 3,
    alerta: 'Nivel Muy Alto en Estrés (63.45) & Alto en Relaciones Sociales (43.75)',
    estado: 'Remitida a EPS',
    sesionesRealizadas: 3,
    sesionesTotales: 3,
    fechaIngreso: '2026-11-21',
    ultimaSesion: '2026-11-26',
    remision: 'Remitida a Medicina General EPS Sánitas con carta de sospecha de Burnout',
    recomendacionLaboral: 'Pausas activas visuales cada 2 horas. Apoyo en momentos de alto tráfico de clientes en sala de espera.',
    confidencialidad: 'Custodia bajo secreto profesional (Ley 1090/2006).'
  },
  {
    id: 'case-003',
    companyId: 'emp-003',
    workerId: 'T1',
    nombre: 'Javier Restrepo',
    cedula: '14852963',
    cargo: 'Conductor de Tractomula Nacional',
    grupo: 4,
    alerta: 'Nivel Muy Alto en Estrés (82.10) & Demanda de Jornada Crítica',
    estado: 'Caso Confirmado en Seguimiento',
    sesionesRealizadas: 3,
    sesionesTotales: 3,
    fechaIngreso: '2026-09-15',
    ultimaSesion: '2026-11-18',
    remision: 'En tratamiento conjunto con Psiquiatría EPS SURA y ARL SURA',
    recomendacionLaboral: 'Restricción médica de no conducir en jornadas nocturnas (10:00 PM a 05:00 AM). Reubicación temporal en patio urbano.',
    confidencialidad: 'Custodia bajo secreto profesional (Ley 1090/2006).'
  }
];
