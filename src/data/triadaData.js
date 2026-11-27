/**
 * CATÁLOGO Y REGISTROS DE LA TRÍADA EPIDEMIOLÓGICA OCUPACIONAL
 * 1. Batería de Riesgo Psicosocial (Perceptual / Subjetiva)
 * 2. Ausentismo Laboral (Días y Horas no laboradas)
 * 3. Incapacidades Médicas (CIE-10 de Salud Mental y Somatización)
 * 
 * Normativa:
 * - Decreto 1072 de 2015 (SG-SST Art. 2.2.4.6.21 Indicadores de Ausentismo y Morbilidad)
 * - Resolución 2404 de 2019 / Resolución 2646 de 2008
 * - Clasificación Estadística Internacional de Enfermedades (CIE-10 / OMS)
 */

export const CIE10_PSYCHOSOCIAL_CATALOG = [
  // Salud Mental Directa (Capítulo V CIE-10)
  { codigo: 'F41.2', categoria: 'Salud Mental', diagnostico: 'Trastorno mixto ansioso-depresivo', severidad: 'Alta' },
  { codigo: 'F41.1', categoria: 'Salud Mental', diagnostico: 'Trastorno de ansiedad generalizada', severidad: 'Alta' },
  { codigo: 'F43.0', categoria: 'Salud Mental', diagnostico: 'Reacción al estrés agudo', severidad: 'Muy Alta' },
  { codigo: 'F43.2', categoria: 'Salud Mental', diagnostico: 'Trastorno de adaptación con alteraciones emocionales', severidad: 'Muy Alta' },
  { codigo: 'F32.1', categoria: 'Salud Mental', diagnostico: 'Episodio depresivo moderado', severidad: 'Muy Alta' },
  { codigo: 'F48.0', categoria: 'Salud Mental', diagnostico: 'Neurastenia (Fatiga ocupacional crónica)', severidad: 'Alta' },
  { codigo: 'Z73.0', categoria: 'Salud Mental', diagnostico: 'Problemas relacionados con el agotamiento vital (Burnout)', severidad: 'Muy Alta' },
  
  // Somatización & Síntomas Fisiológicos Tensionales
  { codigo: 'G43.0', categoria: 'Somatización', diagnostico: 'Migraña sin aura (Cefalea tensional recurrente)', severidad: 'Media' },
  { codigo: 'G44.2', categoria: 'Somatización', diagnostico: 'Cefalea debida a tensión muscular o estrés', severidad: 'Media' },
  { codigo: 'K29.7', categoria: 'Somatización', diagnostico: 'Gastritis aguda asociada a estrés laboral', severidad: 'Media' },
  { codigo: 'K58.0', categoria: 'Somatización', diagnostico: 'Síndrome de colon irritable con diarrea/dolor por estrés', severidad: 'Media' },
  { codigo: 'M54.5', categoria: 'Somatización', diagnostico: 'Lumbago no especificado / Contractura tensional lumbar', severidad: 'Media' },
  { codigo: 'M54.2', categoria: 'Somatización', diagnostico: 'Cervicalgia tensional / Espasmo muscular cervical', severidad: 'Media' }
];

export const INITIAL_AUSENTISMO_RECORDS = [
  {
    id: 'aus-001',
    companyId: 'emp-001',
    cedula: '52984123',
    nombre: 'Ana María Torres',
    cargo: 'Auxiliar Veterinaria / Recepcionista',
    area: 'Recepción & Asistencia',
    fecha: '2026-05-18',
    dias: 2,
    horas: 16,
    tipo: 'Permiso Personal',
    motivo: 'Agotamiento físico extremo y trámites de salud'
  },
  {
    id: 'aus-002',
    companyId: 'emp-001',
    cedula: '79845210',
    nombre: 'Dr. Diego Atuesta',
    cargo: 'Médico Veterinario Director',
    area: 'Dirección Médica & Cirugía',
    fecha: '2026-04-12',
    dias: 1,
    horas: 10,
    tipo: 'Calamidad Doméstica',
    motivo: 'Crisis de agotamiento y contingencia familiar'
  },
  {
    id: 'aus-003',
    companyId: 'emp-001',
    cedula: '52984123',
    nombre: 'Ana María Torres',
    cargo: 'Auxiliar Veterinaria / Recepcionista',
    area: 'Recepción & Asistencia',
    fecha: '2026-10-05',
    dias: 1,
    horas: 8,
    tipo: 'No Justificado',
    motivo: 'Falta imprevista reportada por sobrecarga laboral'
  },
  {
    id: 'aus-004',
    companyId: 'emp-003',
    cedula: '14852963',
    nombre: 'Javier Restrepo',
    cargo: 'Conductor de Tractomula Nacional',
    area: 'Patio de Carga & Operaciones',
    fecha: '2026-08-04',
    dias: 3,
    horas: 24,
    tipo: 'No Justificado',
    motivo: 'Ausencia tras jornada continua de 72 horas en carretera'
  },
  {
    id: 'aus-005',
    companyId: 'emp-003',
    cedula: '14852963',
    nombre: 'Javier Restrepo',
    cargo: 'Conductor de Tractomula Nacional',
    area: 'Patio de Carga & Operaciones',
    fecha: '2026-11-02',
    dias: 2,
    horas: 16,
    tipo: 'Permiso Personal',
    motivo: 'Cita médica especializada en neurología'
  }
];

export const INITIAL_INCAPACIDADES_RECORDS = [
  {
    id: 'inc-001',
    companyId: 'emp-001',
    cedula: '52984123',
    nombre: 'Ana María Torres',
    cargo: 'Auxiliar Veterinaria / Recepcionista',
    area: 'Recepción & Asistencia',
    fechaInicio: '2026-06-10',
    fechaFin: '2026-06-13',
    dias: 4,
    cie10: 'F41.2',
    diagnostico: 'Trastorno mixto ansioso-depresivo',
    categoria: 'Salud Mental',
    origen: 'Enfermedad General (EPS Sánitas)',
    prorroga: 'NO'
  },
  {
    id: 'inc-002',
    companyId: 'emp-001',
    cedula: '52984123',
    nombre: 'Ana María Torres',
    cargo: 'Auxiliar Veterinaria / Recepcionista',
    area: 'Recepción & Asistencia',
    fechaInicio: '2026-09-02',
    fechaFin: '2026-09-04',
    dias: 3,
    cie10: 'G43.0',
    diagnostico: 'Migraña sin aura (Cefalea tensional recurrente)',
    categoria: 'Somatización',
    origen: 'Enfermedad General (EPS Sánitas)',
    prorroga: 'NO'
  },
  {
    id: 'inc-003',
    companyId: 'emp-001',
    cedula: '79845210',
    nombre: 'Dr. Diego Atuesta',
    cargo: 'Médico Veterinario Director',
    area: 'Dirección Médica & Cirugía',
    fechaInicio: '2026-07-15',
    fechaFin: '2026-07-17',
    dias: 3,
    cie10: 'K29.7',
    diagnostico: 'Gastritis aguda asociada a estrés laboral',
    categoria: 'Somatización',
    origen: 'Enfermedad General (Compensar EPS)',
    prorroga: 'NO'
  },
  {
    id: 'inc-004',
    companyId: 'emp-003',
    cedula: '14852963',
    nombre: 'Javier Restrepo',
    cargo: 'Conductor de Tractomula Nacional',
    area: 'Patio de Carga & Operaciones',
    fechaInicio: '2026-08-10',
    fechaFin: '2026-08-25',
    dias: 15,
    cie10: 'F43.2',
    diagnostico: 'Trastorno de adaptación con ansiedad y estrés severo',
    categoria: 'Salud Mental',
    origen: 'Enfermedad General (EPS SURA)',
    prorroga: 'SI'
  },
  {
    id: 'inc-005',
    companyId: 'emp-003',
    cedula: '14852963',
    nombre: 'Javier Restrepo',
    cargo: 'Conductor de Tractomula Nacional',
    area: 'Patio de Carga & Operaciones',
    fechaInicio: '2026-10-01',
    fechaFin: '2026-10-06',
    dias: 5,
    cie10: 'M54.5',
    diagnostico: 'Lumbago no especificado / Contractura tensional lumbar',
    categoria: 'Somatización',
    origen: 'Enfermedad General (EPS SURA)',
    prorroga: 'NO'
  }
];

/**
 * Función analítica que calcula el Estado y Peso Epidemiológico de la Tríada
 * Cruza: 1. Batería + 2. Ausentismo + 3. Incapacidades
 */
export function evaluateWorkerTriad(worker, companyAusentismo = [], companyIncapacidades = []) {
  const cedulaStr = String(worker.cedula || '').trim();

  // 1. Ausentismo filtrado por trabajador
  const userAus = companyAusentismo.filter(a => String(a.cedula).trim() === cedulaStr);
  const totalDiasAus = userAus.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const totalHorasAus = userAus.reduce((acc, curr) => acc + (Number(curr.horas) || 0), 0);

  // 2. Incapacidades filtradas por trabajador
  const userInc = companyIncapacidades.filter(i => String(i.cedula).trim() === cedulaStr);
  const totalDiasInc = userInc.reduce((acc, curr) => acc + (Number(curr.dias) || 0), 0);
  const mentalInc = userInc.filter(i => 
    (i.categoria === 'Salud Mental') || 
    (i.cie10 && (i.cie10.startsWith('F') || i.cie10.startsWith('Z73')))
  );
  const somaticInc = userInc.filter(i => 
    (i.categoria === 'Somatización') || 
    (i.cie10 && (i.cie10.startsWith('G') || i.cie10.startsWith('K') || i.cie10.startsWith('M')))
  );

  // 3. Nivel de Riesgo en la Batería
  const estresLvl = (worker.scores?.estresNivel || '').toLowerCase();
  const intraLvl = (worker.scores?.intraNivel || '').toLowerCase();
  const isHighRiskPsych = estresLvl.includes('alto') || estresLvl.includes('muy alto') || intraLvl.includes('alto') || intraLvl.includes('muy alto');

  // Determinar Semáforo y Clasificación de la Tríada
  let triadStatus = 'CONTROLADA';
  let badgeColor = 'emerald';
  let badgeText = 'Tríada Controlada';
  let clinicalVerdict = 'Sin correlación patológica. Colaborador asintomático con asistencia regular.';
  let priority = 1;

  if (isHighRiskPsych && mentalInc.length > 0) {
    // Tríada Crítica Positiva
    triadStatus = 'CRITICA';
    badgeColor = 'purple';
    badgeText = 'Tríada Crítica (Positiva)';
    clinicalVerdict = `Correlación patológica evidente: Nivel de estrés ${worker.scores?.estresNivel} combinado con ${mentalInc.length} incapacidad(es) por Salud Mental (${mentalInc.map(m => m.cie10).join(', ')}) y ${totalDiasAus + totalDiasInc} días perdidos. Caso con máximo sustento legal para PVE.`;
    priority = 4;
  } else if (isHighRiskPsych && (somaticInc.length > 0 || totalDiasAus >= 2)) {
    // Alerta Somática / Tensional
    triadStatus = 'ALERTA_SOMATICA';
    badgeColor = 'rose';
    badgeText = 'Alerta de Somatización';
    clinicalVerdict = `Riesgo perceptual alto acompañado de manifestaciones somáticas (${somaticInc.map(s => s.cie10).join(', ') || 'Ausentismo recurrente'}). Posible conversión física del estrés laboral antes de quiebre clínico.`;
    priority = 3;
  } else if (isHighRiskPsych) {
    // Riesgo Latente Perceptual
    triadStatus = 'RIESGO_LATENTE';
    badgeColor = 'amber';
    badgeText = 'Riesgo Perceptual Latente';
    clinicalVerdict = `Puntaje alto en batería psicosocial pero sin materialización en ausentismo ni incapacidades médicas registradas. Ventana óptima para prevención primaria y secundaria.`;
    priority = 2;
  } else if (totalDiasAus > 3 || totalDiasInc > 5) {
    // Ausentismo / Incapacidad Común sin Riesgo Psicosocial
    triadStatus = 'OBSERVACION_MEDICA';
    badgeColor = 'blue';
    badgeText = 'Observación Médica General';
    clinicalVerdict = `Presenta ausentismo o incapacidad común sin evidencia de afectación psicosocial directa en el trabajo.`;
    priority = 1.5;
  }

  return {
    triadStatus,
    badgeColor,
    badgeText,
    priority,
    clinicalVerdict,
    isHighRiskPsych,
    totalDiasAus,
    totalHorasAus,
    totalDiasInc,
    userAus,
    userInc,
    mentalInc,
    somaticInc,
    hasMentalHealthDiagnosis: mentalInc.length > 0,
    hasSomaticDiagnosis: somaticInc.length > 0
  };
}
