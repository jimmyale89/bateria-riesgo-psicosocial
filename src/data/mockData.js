/**
 * CASO DE ESTUDIO OFICIAL: CONSULTORIO VETERINARIO DR. DIEGO ATUESTA
 * Evaluado según Batería de Riesgo Psicosocial (Resolución 2404 de 2019)
 */

export const INITIAL_COMPANY = {
  id: 'emp-001',
  nombre: 'CONSULTORIO VETERINARIO DR. DIEGO ATUESTA',
  nit: '900.548.123-1',
  actividadEconomica: 'Actividades veterinarias (CIIU 7500)',
  claseRiesgo: 'Riesgo II',
  centroTrabajo: 'Sede Principal - Clínica',
  ciudad: 'Bogotá D.C.',
  departamento: 'Cundinamarca',
  fechaEvaluacion: '2026-11-20',
  psicologoEvaluador: {
    nombre: 'Psic. Especialista SST Jimmy Martínez',
    tarjetaProfesional: 'TP-108523-COLPSIC',
    licenciaSST: 'LIC-SST-45920-2023',
    secretariaSalud: 'Secretaría Distrital de Salud de Bogotá'
  },
  saldoCreditosSaaS: {
    especialista: 'Jimmy Martínez B.',
    creditosComprados: 150,
    creditosConsumidos: 7,
    creditosDisponibles: 143,
    costoPorCreditoCop: 15000 // $15.000 COP por trabajador evaluado
  }
};

// Generador de respuestas de prueba calibradas para que los resultados
// coincidan fielmente con el resumen de la empresa del usuario
export const INITIAL_WORKERS = [
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
    // Respuestas calibradas
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

export const COMPANY_SUMMARY_STATS = {
  totalParticipantes: 7,
  participacionFormaA: 3,
  participacionFormaB: 4,
  factorIntralaboralGlobal: {
    formaA: 'MEDIO',
    formaB: 'ALTO'
  },
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
    { dimension: 'Exigencias de responsabilidad del cargo', dominio: 'Demandas del Trabajo', nivelA: 'MUY ALTO', nivelB: 'N/A', prioridad: 4 },
    { dimension: 'Tiempo fuera del trabajo', dominio: 'Extralaboral', nivelA: 'ALTO', nivelB: 'MUY ALTO', prioridad: 5 },
    { dimension: 'Control y autonomía', dominio: 'Control sobre el Trabajo', nivelA: 'ALTO', nivelB: 'MUY ALTO', prioridad: 6 }
  ],
  dimensionesProtectoras: [
    { dimension: 'Claridad del Rol', formaA: 'SIN RIESGO', formaB: 'BAJO' },
    { dimension: 'Capacitación', formaA: 'BAJO', formaB: 'BAJO' },
    { dimension: 'Relaciones familiares', formaA: 'BAJO', formaB: 'MEDIO' },
    { dimension: 'Desplazamiento vivienda - trabajo', formaA: 'SIN RIESGO', formaB: 'MEDIO' }
  ]
};
