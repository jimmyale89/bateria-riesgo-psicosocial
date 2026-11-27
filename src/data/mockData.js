/**
 * BASE DE DATOS MULTI-EMPRESA & CASOS DE ESTUDIO OFICIALES
 * Batería de Riesgo Psicosocial (Resolución 2404 de 2019 / 2764 de 2022)
 */

export const INITIAL_COMPANIES = [
  {
    id: 'emp-001',
    nombre: 'CONSULTORIO VETERINARIO DR. DIEGO ATUESTA',
    nit: '900.548.123-1',
    actividadEconomica: 'Actividades veterinarias (CIIU 7500)',
    claseRiesgo: 'Riesgo II',
    centroTrabajo: 'Sede Principal - Clínica',
    ciudad: 'Bogotá D.C.',
    departamento: 'Cundinamarca',
    responsableSST: 'Dra. Andrea Morales (Líder SG-SST)',
    fechaEvaluacion: '2026-11-20',
    periodicidad: 'Anual (Obligatorio por nivel Alto)',
    proximaEvaluacion: 'Noviembre 2027',
    resumenRiesgo: {
      intraA: 'MEDIO',
      intraB: 'ALTO',
      extra: 'ALTO',
      estres: 'ALTO',
      semaforoGeneral: 'ALTO'
    },
    totalParticipantes: 7,
    participacionA: 3,
    participacionB: 4,
    pveStatus: 'active', // Activo para esta empresa
    pveActivadoFecha: '2026-11-21',
    pveLicenciaCodigo: 'LIC-PVE-2026-001'
  },
  {
    id: 'emp-002',
    nombre: 'GIMNASIO BILINGÜE LOS ARRAYANES',
    nit: '860.045.789-2',
    actividadEconomica: 'Educación preescolar, básica y media (CIIU 8511)',
    claseRiesgo: 'Riesgo I',
    centroTrabajo: 'Campus Campestre Principal',
    ciudad: 'Chía',
    departamento: 'Cundinamarca',
    responsableSST: 'Lic. Martha Helena Gómez (Coordinadora SST)',
    fechaEvaluacion: '2026-10-15',
    periodicidad: 'Bianual (Cada 2 años por nivel Bajo/Medio)',
    proximaEvaluacion: 'Octubre 2028',
    resumenRiesgo: {
      intraA: 'MEDIO',
      intraB: 'BAJO',
      extra: 'MEDIO',
      estres: 'MEDIO',
      semaforoGeneral: 'MEDIO'
    },
    totalParticipantes: 261,
    participacionA: 21,
    participacionB: 240,
    pveStatus: 'not_required', // Riesgo general Medio/Bajo: no exige PVE obligatorio
    pveActivadoFecha: null,
    pveLicenciaCodigo: null
  },
  {
    id: 'emp-003',
    nombre: 'TRANSPORTE Y LOGÍSTICA DEL VALLE S.A.S.',
    nit: '901.320.654-8',
    actividadEconomica: 'Transporte de carga por carretera (CIIU 4923)',
    claseRiesgo: 'Riesgo IV',
    centroTrabajo: 'Base de Operaciones & Patio de Carga',
    ciudad: 'Cali',
    departamento: 'Valle del Cauca',
    responsableSST: 'Ing. Carlos Julio Barreto (HSE Manager)',
    fechaEvaluacion: '2026-09-10',
    periodicidad: 'Anual (Prioritario por nivel Muy Alto)',
    proximaEvaluacion: 'Septiembre 2027',
    resumenRiesgo: {
      intraA: 'ALTO',
      intraB: 'MUY ALTO',
      extra: 'ALTO',
      estres: 'MUY ALTO',
      semaforoGeneral: 'MUY ALTO'
    },
    totalParticipantes: 35,
    participacionA: 5,
    participacionB: 30,
    pveStatus: 'locked', // Requiere PVE pero aún no se ha activado la licencia
    pveActivadoFecha: null,
    pveLicenciaCodigo: null
  }
];

export const SPECIALIST_PROFILE = {
  nombre: 'Psic. Especialista SST Jimmy Martínez',
  tarjetaProfesional: 'TP-108523-COLPSIC',
  licenciaSST: 'LIC-SST-45920-2023',
  secretariaSalud: 'Secretaría Distrital de Salud de Bogotá',
  saldoCreditosSaaS: {
    especialista: 'Jimmy Martínez B.',
    creditosComprados: 500,
    creditosConsumidos: 303, // 7 (Atuesta) + 261 (Arrayanes) + 35 (Transporte)
    creditosDisponibles: 197,
    creditosPveDisponibles: 2, // 2 licencias anuales PVE disponibles
    creditosPveComprados: 3,
    creditosPveConsumidos: 1, // 1 usada en Atuesta
    costoPorCreditoCop: 12000,
    costoPorLicenciaPveCop: 450000
  }
};

// Trabajadores Empresa 1: Diego Atuesta (7 participantes)
export const WORKERS_DIEGO_ATUESTA = [
  {
    id: 'A1',
    codigo: 'A-01',
    nombre: 'Dr. Diego Atuesta',
    cedula: '79845210',
    formType: 'A',
    cargo: 'Médico Veterinario Director',
    area: 'Dirección Médica & Cirugía',
    genero: 'M',
    edad: 44,
    antiguedad: '6 a 10 años',
    nivelEscolaridad: 'Post-grado Completo',
    estadoCivil: 'Casado',
    estrato: 4,
    tipoContrato: 'Término Indefinido',
    horasDia: 10,
    scores: {
      intraBruto: 182,
      intraTrans: 36.99,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 44, trans: 26.83, nivel: 'Medio' },
        control: { bruto: 22, trans: 26.19, nivel: 'Bajo' },
        demandas: { bruto: 98, trans: 49.00, nivel: 'Muy Alto' },
        recompensas: { bruto: 18, trans: 40.91, nivel: 'Medio' }
      },
      extraBruto: 39,
      extraTrans: 31.45,
      extraNivel: 'Alto',
      consolidadoTrans: 35.88,
      consolidadoNivel: 'Medio',
      estresTrans: 44.80,
      estresNivel: 'Alto'
    }
  },
  {
    id: 'A2',
    codigo: 'A-02',
    nombre: 'Dra. Carolina Gómez Pinzón',
    cedula: '52481923',
    formType: 'A',
    cargo: 'Médica Veterinaria Especialista',
    area: 'Hospitalización & Cuidados Críticos',
    genero: 'F',
    edad: 36,
    antiguedad: '3 a 5 años',
    nivelEscolaridad: 'Post-grado Completo',
    estadoCivil: 'Soltera',
    estrato: 4,
    tipoContrato: 'Término Indefinido',
    horasDia: 9,
    scores: {
      intraBruto: 175,
      intraTrans: 35.57,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 41, trans: 25.00, nivel: 'Medio' },
        control: { bruto: 20, trans: 23.81, nivel: 'Bajo' },
        demandas: { bruto: 96, trans: 48.00, nivel: 'Muy Alto' },
        recompensas: { bruto: 18, trans: 40.91, nivel: 'Medio' }
      },
      extraBruto: 38,
      extraTrans: 30.65,
      extraNivel: 'Medio',
      consolidadoTrans: 34.58,
      consolidadoNivel: 'Medio',
      estresTrans: 46.20,
      estresNivel: 'Alto'
    }
  },
  {
    id: 'A3',
    codigo: 'A-03',
    nombre: 'Dr. Juan Camilo Roa',
    cedula: '1018492014',
    formType: 'A',
    cargo: 'Médico Veterinario de Consulta',
    area: 'Consulta Externa',
    genero: 'M',
    edad: 31,
    antiguedad: '1 a 2 años',
    nivelEscolaridad: 'Profesional Completo',
    estadoCivil: 'Unión Libre',
    estrato: 3,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 168,
      intraTrans: 34.15,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 38, trans: 23.17, nivel: 'Bajo' },
        control: { bruto: 24, trans: 28.57, nivel: 'Bajo' },
        demandas: { bruto: 92, trans: 46.00, nivel: 'Alto' },
        recompensas: { bruto: 14, trans: 31.82, nivel: 'Bajo' }
      },
      extraBruto: 41,
      extraTrans: 33.06,
      extraNivel: 'Alto',
      consolidadoTrans: 33.93,
      consolidadoNivel: 'Medio',
      estresTrans: 42.50,
      estresNivel: 'Alto'
    }
  },
  {
    id: 'B1',
    codigo: 'B-01',
    nombre: 'Erika Marcela Vásquez Restrepo',
    cedula: '1036629941',
    formType: 'B',
    cargo: 'Auxiliar de Veterinaria',
    area: 'Hospitalización y Procedimientos',
    genero: 'F',
    edad: 28,
    antiguedad: '1 a 2 años',
    nivelEscolaridad: 'Técnico/ Tecnológico Completo',
    estadoCivil: 'Soltera',
    estrato: 3,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 140,
      intraTrans: 36.08,
      intraNivel: 'Alto',
      dominios: {
        liderazgo: { bruto: 33, trans: 27.50, nivel: 'Alto' },
        control: { bruto: 32, trans: 44.44, nivel: 'Muy Alto' },
        demandas: { bruto: 63, trans: 40.38, nivel: 'Alto' },
        recompensas: { bruto: 12, trans: 30.00, nivel: 'Muy Alto' }
      },
      extraBruto: 15,
      extraTrans: 12.10,
      extraNivel: 'Bajo',
      consolidadoTrans: 30.27,
      consolidadoNivel: 'Alto',
      estresTrans: 54.84,
      estresNivel: 'Muy Alto'
    }
  },
  {
    id: 'B2',
    codigo: 'B-02',
    nombre: 'Diana Paola Torres Salcedo',
    cedula: '1024589632',
    formType: 'B',
    cargo: 'Recepcionista y Asistente Administrativa',
    area: 'Administración y Admisiones',
    genero: 'F',
    edad: 26,
    antiguedad: 'Menor de 1 año',
    nivelEscolaridad: 'Técnico/ Tecnológico Completo',
    estadoCivil: 'Soltera',
    estrato: 3,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 138,
      intraTrans: 35.57,
      intraNivel: 'Alto',
      dominios: {
        liderazgo: { bruto: 32, trans: 26.67, nivel: 'Medio' },
        control: { bruto: 28, trans: 38.89, nivel: 'Alto' },
        demandas: { bruto: 64, trans: 41.03, nivel: 'Alto' },
        recompensas: { bruto: 14, trans: 35.00, nivel: 'Muy Alto' }
      },
      extraBruto: 42,
      extraTrans: 33.87,
      extraNivel: 'Alto',
      consolidadoTrans: 35.16,
      consolidadoNivel: 'Alto',
      estresTrans: 48.20,
      estresNivel: 'Alto'
    }
  },
  {
    id: 'B3',
    codigo: 'B-03',
    nombre: 'Carlos Andrés Mendoza',
    cedula: '80124785',
    formType: 'B',
    cargo: 'Auxiliar Operativo de Farmacia y Baños',
    area: 'Peluquería & Servicios Complementarios',
    genero: 'M',
    edad: 34,
    antiguedad: '3 a 5 años',
    nivelEscolaridad: 'Bachillerato Completo',
    estadoCivil: 'Unión Libre',
    estrato: 2,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 132,
      intraTrans: 34.02,
      intraNivel: 'Alto',
      dominios: {
        liderazgo: { bruto: 29, trans: 24.17, nivel: 'Medio' },
        control: { bruto: 26, trans: 36.11, nivel: 'Medio' },
        demandas: { bruto: 66, trans: 42.31, nivel: 'Alto' },
        recompensas: { bruto: 11, trans: 27.50, nivel: 'Alto' }
      },
      extraBruto: 45,
      extraTrans: 36.29,
      extraNivel: 'Muy Alto',
      consolidadoTrans: 34.57,
      consolidadoNivel: 'Alto',
      estresTrans: 41.00,
      estresNivel: 'Alto'
    }
  },
  {
    id: 'B4',
    codigo: 'B-04',
    nombre: 'Sandra Milena Castro',
    cedula: '53147896',
    formType: 'B',
    cargo: 'Auxiliar de Mantenimiento y Aseo',
    area: 'Servicios Generales',
    genero: 'F',
    edad: 48,
    antiguedad: '6 a 10 años',
    nivelEscolaridad: 'Bachillerato Completo',
    estadoCivil: 'Casada',
    estrato: 2,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 125,
      intraTrans: 32.22,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 26, trans: 21.67, nivel: 'Bajo' },
        control: { bruto: 24, trans: 33.33, nivel: 'Medio' },
        demandas: { bruto: 65, trans: 41.67, nivel: 'Alto' },
        recompensas: { bruto: 10, trans: 25.00, nivel: 'Alto' }
      },
      extraBruto: 44,
      extraTrans: 35.48,
      extraNivel: 'Alto',
      consolidadoTrans: 33.01,
      consolidadoNivel: 'Medio',
      estresTrans: 43.10,
      estresNivel: 'Alto'
    }
  }
];

// Trabajadores Empresa 2: Gimnasio Los Arrayanes (Muestra representativa de los 261)
export const WORKERS_LOS_ARRAYANES = [
  {
    id: 'ARR_A1',
    codigo: 'A-01',
    nombre: 'Lic. Fernando Ortiz Morales',
    cedula: '79654120',
    formType: 'A',
    cargo: 'Rector General',
    area: 'Dirección Académica',
    genero: 'M',
    edad: 52,
    antiguedad: '11 o más años',
    nivelEscolaridad: 'Post-grado Completo',
    estadoCivil: 'Casado',
    estrato: 5,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 155,
      intraTrans: 31.50,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 40, trans: 24.39, nivel: 'Medio' },
        control: { bruto: 18, trans: 21.43, nivel: 'Bajo' },
        demandas: { bruto: 80, trans: 40.00, nivel: 'Medio' },
        recompensas: { bruto: 17, trans: 38.64, nivel: 'Bajo' }
      },
      extraBruto: 32,
      extraTrans: 25.81,
      extraNivel: 'Medio',
      consolidadoTrans: 30.36,
      consolidadoNivel: 'Medio',
      estresTrans: 35.20,
      estresNivel: 'Medio'
    }
  },
  {
    id: 'ARR_A2',
    codigo: 'A-02',
    nombre: 'Lic. María Fernanda Silva',
    cedula: '52896321',
    formType: 'A',
    cargo: 'Coordinadora de Bachillerato',
    area: 'Coordinación Académica',
    genero: 'F',
    edad: 41,
    antiguedad: '6 a 10 años',
    nivelEscolaridad: 'Post-grado Completo',
    estadoCivil: 'Casada',
    estrato: 4,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 148,
      intraTrans: 30.08,
      intraNivel: 'Medio',
      dominios: {
        liderazgo: { bruto: 36, trans: 21.95, nivel: 'Bajo' },
        control: { bruto: 20, trans: 23.81, nivel: 'Bajo' },
        demandas: { bruto: 78, trans: 39.00, nivel: 'Medio' },
        recompensas: { bruto: 14, trans: 31.82, nivel: 'Bajo' }
      },
      extraBruto: 30,
      extraTrans: 24.19,
      extraNivel: 'Bajo',
      consolidadoTrans: 28.90,
      consolidadoNivel: 'Bajo',
      estresTrans: 31.50,
      estresNivel: 'Medio'
    }
  },
  {
    id: 'ARR_B1',
    codigo: 'B-01',
    nombre: 'Julián Camilo Peña',
    cedula: '1014258963',
    formType: 'B',
    cargo: 'Docente de Primaria y Deportes',
    area: 'Cuerpo Docente Primaria',
    genero: 'M',
    edad: 29,
    antiguedad: '3 a 5 años',
    nivelEscolaridad: 'Profesional Completo',
    estadoCivil: 'Soltero',
    estrato: 3,
    tipoContrato: 'Término Fijo',
    horasDia: 8,
    scores: {
      intraBruto: 98,
      intraTrans: 25.26,
      intraNivel: 'Bajo',
      dominios: {
        liderazgo: { bruto: 22, trans: 18.33, nivel: 'Bajo' },
        control: { bruto: 18, trans: 25.00, nivel: 'Bajo' },
        demandas: { bruto: 48, trans: 30.77, nivel: 'Medio' },
        recompensas: { bruto: 10, trans: 25.00, nivel: 'Medio' }
      },
      extraBruto: 28,
      extraTrans: 22.58,
      extraNivel: 'Bajo',
      consolidadoTrans: 24.61,
      consolidadoNivel: 'Bajo',
      estresTrans: 28.40,
      estresNivel: 'Bajo'
    }
  },
  {
    id: 'ARR_B2',
    codigo: 'B-02',
    nombre: 'Gloria Esperanza Rincón',
    cedula: '39852147',
    formType: 'B',
    cargo: 'Asistente de Biblioteca y Archivo',
    area: 'Servicios de Apoyo Educativo',
    genero: 'F',
    edad: 46,
    antiguedad: '6 a 10 años',
    nivelEscolaridad: 'Técnico/ Tecnológico Completo',
    estadoCivil: 'Casada',
    estrato: 3,
    tipoContrato: 'Término Indefinido',
    horasDia: 8,
    scores: {
      intraBruto: 92,
      intraTrans: 23.71,
      intraNivel: 'Bajo',
      dominios: {
        liderazgo: { bruto: 20, trans: 16.67, nivel: 'Sin Riesgo' },
        control: { bruto: 16, trans: 22.22, nivel: 'Bajo' },
        demandas: { bruto: 46, trans: 29.49, nivel: 'Bajo' },
        recompensas: { bruto: 10, trans: 25.00, nivel: 'Medio' }
      },
      extraBruto: 26,
      extraTrans: 20.97,
      extraNivel: 'Bajo',
      consolidadoTrans: 23.05,
      consolidadoNivel: 'Bajo',
      estresTrans: 25.10,
      estresNivel: 'Bajo'
    }
  }
];

// Trabajadores Empresa 3: Transporte del Valle (Carga pesada / Riesgo IV)
export const WORKERS_TRANSPORTE = [
  {
    id: 'TR_A1',
    codigo: 'A-01',
    nombre: 'Ing. Gustavo Adolfo Prado',
    cedula: '16789523',
    formType: 'A',
    cargo: 'Jefe de Operaciones y Flota',
    area: 'Operaciones y Logística',
    genero: 'M',
    edad: 47,
    antiguedad: '6 a 10 años',
    nivelEscolaridad: 'Profesional Completo',
    estadoCivil: 'Casado',
    estrato: 4,
    tipoContrato: 'Término Indefinido',
    horasDia: 11,
    scores: {
      intraBruto: 195,
      intraTrans: 39.63,
      intraNivel: 'Muy Alto',
      dominios: {
        liderazgo: { bruto: 48, trans: 29.27, nivel: 'Alto' },
        control: { bruto: 30, trans: 35.71, nivel: 'Medio' },
        demandas: { bruto: 104, trans: 52.00, nivel: 'Muy Alto' },
        recompensas: { bruto: 13, trans: 29.55, nivel: 'Bajo' }
      },
      extraBruto: 46,
      extraTrans: 37.10,
      extraNivel: 'Muy Alto',
      consolidadoTrans: 39.12,
      consolidadoNivel: 'Muy Alto',
      estresTrans: 58.20,
      estresNivel: 'Muy Alto'
    }
  },
  {
    id: 'TR_B1',
    codigo: 'B-01',
    nombre: 'Manuel Antonio Quintero',
    cedula: '94582103',
    formType: 'B',
    cargo: 'Conductor Tractomula Carga Nacional',
    area: 'Conductores de Ruta Pesada',
    genero: 'M',
    edad: 43,
    antiguedad: '3 a 5 años',
    nivelEscolaridad: 'Bachillerato Completo',
    estadoCivil: 'Unión Libre',
    estrato: 2,
    tipoContrato: 'Término Indefinido',
    horasDia: 12,
    scores: {
      intraBruto: 162,
      intraTrans: 41.75,
      intraNivel: 'Muy Alto',
      dominios: {
        liderazgo: { bruto: 36, trans: 30.00, nivel: 'Alto' },
        control: { bruto: 38, trans: 52.78, nivel: 'Muy Alto' },
        demandas: { bruto: 72, trans: 46.15, nivel: 'Muy Alto' },
        recompensas: { bruto: 16, trans: 40.00, nivel: 'Muy Alto' }
      },
      extraBruto: 49,
      extraTrans: 39.52,
      extraNivel: 'Muy Alto',
      consolidadoTrans: 41.21,
      consolidadoNivel: 'Muy Alto',
      estresTrans: 62.40,
      estresNivel: 'Muy Alto'
    }
  }
];

export const INITIAL_COMPANY_DATA_MAP = {
  'emp-001': {
    company: INITIAL_COMPANIES[0],
    workers: WORKERS_DIEGO_ATUESTA,
    stats: {
      totalParticipantes: 7,
      participacionFormaA: 3,
      participacionFormaB: 4,
      factorIntralaboralGlobal: { formaA: 'MEDIO', formaB: 'ALTO' },
      dominios: [
        { nombre: 'Liderazgo y Relaciones Sociales en el Trabajo', formaA: 'MEDIO', formaB: 'MEDIO', alerta: 'Monitoreo' },
        { nombre: 'Control sobre el Trabajo', formaA: 'BAJO', formaB: 'MEDIO', alerta: 'Monitoreo' },
        { nombre: 'Demandas del Trabajo', formaA: 'MUY ALTO', formaB: 'ALTO', alerta: 'Crítico / Prioritario' },
        { nombre: 'Recompensas', formaA: 'BAJO', formaB: 'BAJO', alerta: 'Controlado' }
      ],
      factorExtralaboralGlobal: 'ALTO',
      estresGlobal: 'ALTO',
      dimensionesCriticas: [
        { dimension: 'Demandas emocionales', dominio: 'Demandas del Trabajo', nivelA: 'MUY ALTO', nivelB: 'ALTO', prioridad: 1 },
        { dimension: 'Demandas de la jornada de trabajo', dominio: 'Demandas del Trabajo', nivelA: 'ALTO', nivelB: 'ALTO', prioridad: 2 },
        { dimension: 'Demandas de carga mental', dominio: 'Demandas del Trabajo', nivelA: 'ALTO', nivelB: 'MEDIO', prioridad: 3 },
        { dimension: 'Exigencias de responsabilidad del cargo', dominio: 'Demandas del Trabajo', nivelA: 'MUY ALTO', nivelB: 'N/A', prioridad: 4 }
      ],
      dimensionesProtectoras: [
        { dimension: 'Claridad del Rol', formaA: 'SIN RIESGO', formaB: 'BAJO' },
        { dimension: 'Capacitación', formaA: 'BAJO', formaB: 'BAJO' }
      ]
    }
  },
  'emp-002': {
    company: INITIAL_COMPANIES[1],
    workers: WORKERS_LOS_ARRAYANES,
    stats: {
      totalParticipantes: 261,
      participacionFormaA: 21,
      participacionFormaB: 240,
      factorIntralaboralGlobal: { formaA: 'MEDIO', formaB: 'BAJO' },
      dominios: [
        { nombre: 'Liderazgo y Relaciones Sociales en el Trabajo', formaA: 'MEDIO', formaB: 'BAJO', alerta: 'Controlado' },
        { nombre: 'Control sobre el Trabajo', formaA: 'BAJO', formaB: 'BAJO', alerta: 'Controlado' },
        { nombre: 'Demandas del Trabajo', formaA: 'MEDIO', formaB: 'MEDIO', alerta: 'Monitoreo' },
        { nombre: 'Recompensas', formaA: 'BAJO', formaB: 'MEDIO', alerta: 'Controlado' }
      ],
      factorExtralaboralGlobal: 'MEDIO',
      estresGlobal: 'MEDIO',
      dimensionesCriticas: [
        { dimension: 'Demandas de carga mental', dominio: 'Demandas del Trabajo', nivelA: 'ALTO', nivelB: 'MEDIO', prioridad: 1 },
        { dimension: 'Demandas emocionales', dominio: 'Demandas del Trabajo', nivelA: 'MEDIO', nivelB: 'MEDIO', prioridad: 2 }
      ],
      dimensionesProtectoras: [
        { dimension: 'Relaciones sociales en el trabajo', formaA: 'SIN RIESGO', formaB: 'SIN RIESGO' },
        { dimension: 'Capacitación y desarrollo', formaA: 'BAJO', formaB: 'BAJO' }
      ]
    }
  },
  'emp-003': {
    company: INITIAL_COMPANIES[2],
    workers: WORKERS_TRANSPORTE,
    stats: {
      totalParticipantes: 35,
      participacionFormaA: 5,
      participacionFormaB: 30,
      factorIntralaboralGlobal: { formaA: 'ALTO', formaB: 'MUY ALTO' },
      dominios: [
        { nombre: 'Liderazgo y Relaciones Sociales en el Trabajo', formaA: 'ALTO', formaB: 'ALTO', alerta: 'Crítico' },
        { nombre: 'Control sobre el Trabajo', formaA: 'MEDIO', formaB: 'MUY ALTO', alerta: 'Crítico / Prioritario' },
        { nombre: 'Demandas del Trabajo', formaA: 'MUY ALTO', formaB: 'MUY ALTO', alerta: 'Crítico / Urgente' },
        { nombre: 'Recompensas', formaA: 'BAJO', formaB: 'MUY ALTO', alerta: 'Crítico' }
      ],
      factorExtralaboralGlobal: 'ALTO',
      estresGlobal: 'MUY ALTO',
      dimensionesCriticas: [
        { dimension: 'Demandas de la jornada de trabajo', dominio: 'Demandas del Trabajo', nivelA: 'MUY ALTO', nivelB: 'MUY ALTO', prioridad: 1 },
        { dimension: 'Demandas ambientales y esfuerzo físico', dominio: 'Demandas del Trabajo', nivelA: 'ALTO', nivelB: 'MUY ALTO', prioridad: 2 },
        { dimension: 'Tiempo fuera del trabajo', dominio: 'Extralaboral', nivelA: 'MUY ALTO', nivelB: 'MUY ALTO', prioridad: 3 }
      ],
      dimensionesProtectoras: [
        { dimension: 'Claridad del Rol', formaA: 'BAJO', formaB: 'MEDIO' }
      ]
    }
  }
};

export const INITIAL_COMPANY = INITIAL_COMPANIES[0];
export const INITIAL_WORKERS = WORKERS_DIEGO_ATUESTA;
export const COMPANY_SUMMARY_STATS = INITIAL_COMPANY_DATA_MAP['emp-001'].stats;

