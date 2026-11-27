/**
 * MOTOR PSICOMÉTRICO NORMATIVO - BATERÍA DE RIESGO PSICOSOCIAL
 * Basado en la Resolución 2646 de 2008, 2404 de 2019, 2764 de 2022
 * y Baremos oficiales de la Pontificia Universidad Javeriana / Ministerio del Trabajo de Colombia.
 */

const fs = require('fs');
const path = require('path');

// Cargar baremos extraídos
const baremosData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../baremos_extracted.json'), 'utf8')
);

// Definición de escalas y divisores
const DIVISORES = {
  FORMA_A: {
    // Dimensiones Intralaborales
    liderazgo_caracteristicas: 52,
    liderazgo_relaciones: 56,
    liderazgo_retroalimentacion: 20,
    liderazgo_colaboradores: 36,

    control_claridad_rol: 28,
    control_capacitacion: 12,
    control_participacion: 16,
    control_oportunidades: 16,
    control_autonomia: 12,

    demandas_ambientales: 48,
    demandas_emocionales: 36,
    demandas_cuantitativas: 24,
    demandas_influencia_extralaboral: 16,
    demandas_responsabilidad: 24,
    demandas_carga_mental: 20,
    demandas_consistencia_rol: 20,
    demandas_jornada: 12,

    recompensas_pertenencia: 20,
    recompensas_reconocimiento: 24,

    // Dominios
    dominio_liderazgo: 164,
    dominio_control: 84,
    dominio_demandas: 200,
    dominio_recompensas: 44,

    // Totales
    total_intralaboral: 492,
    total_extralaboral: 124,
    total_general: 616
  },
  FORMA_B: {
    // Dimensiones Intralaborales
    liderazgo_caracteristicas: 52,
    liderazgo_relaciones: 48,
    liderazgo_retroalimentacion: 20,
    liderazgo_colaboradores: null, // N/A

    control_claridad_rol: 20,
    control_capacitacion: 12,
    control_participacion: 12,
    control_oportunidades: 16,
    control_autonomia: 12,

    demandas_ambientales: 48,
    demandas_emocionales: 36,
    demandas_cuantitativas: 12,
    demandas_influencia_extralaboral: 16,
    demandas_responsabilidad: null, // N/A
    demandas_carga_mental: 20,
    demandas_consistencia_rol: null, // N/A
    demandas_jornada: 24,

    recompensas_pertenencia: 16,
    recompensas_reconocimiento: 24,

    // Dominios
    dominio_liderazgo: 120,
    dominio_control: 72,
    dominio_demandas: 156,
    dominio_recompensas: 40,

    // Totales
    total_intralaboral: 388,
    total_extralaboral: 124,
    total_general: 512
  },
  EXTRALABORAL: {
    tiempo_fuera: 16,
    relaciones_familiares: 12,
    comunicacion_interpersonal: 20,
    situacion_economica: 12,
    caracteristicas_vivienda: 36,
    influencia_extralaboral_trabajo: 12,
    desplazamiento: 16,
    total_extralaboral: 124
  },
  ESTRES: {
    factor_divisor: 61.16
  }
};

/**
 * Clasificación de nivel de riesgo según baremo Javeriana
 * @param {number} score - Puntaje transformado (0 a 100)
 * @param {Array<{min: number, level: string}>} baremoList - Puntos de corte
 */
function classifyRisk(score, baremoList) {
  if (score === null || score === undefined || isNaN(score) || !baremoList || baremoList.length === 0) {
    return 'Sin dato';
  }
  
  // Las tablas de baremos en Excel usan VLOOKUP aproximado:
  // Se busca el valor más grande menor o igual a score.
  let currentLevel = baremoList[0].level;
  for (let i = 0; i < baremoList.length; i++) {
    if (score >= baremoList[i].min) {
      currentLevel = baremoList[i].level;
    } else {
      break;
    }
  }
  return currentLevel;
}

/**
 * Normaliza nombres de dimensiones a las llaves de baremos_extracted.json
 */
const BAREMO_KEYS_MAP = {
  liderazgo_caracteristicas: 'Características del liderazgo',
  liderazgo_relaciones: 'Relaciones sociales en el trabajo',
  liderazgo_retroalimentacion: 'Retroalimentación del desempeño',
  liderazgo_colaboradores: 'Relación con los colaboradores (subordinados)',
  control_claridad_rol: 'Claridad de rol',
  control_capacitacion: 'Capacitación',
  control_participacion: 'Participación y manejo del cambio',
  control_oportunidades: 'Oportunidades para el uso y desarrollo de habilidades y conocimientos',
  control_autonomia: 'Control y autonomía sobre el trabajo',
  demandas_ambientales: 'Demandas ambientales y de esfuerzo físico',
  demandas_emocionales: 'Demandas emocionales',
  demandas_cuantitativas: 'Demandas cuantitativas',
  demandas_influencia_extralaboral: 'Influencia del trabajo sobre el entorno extralaboral',
  demandas_responsabilidad: 'Exigencias de responsabilidad del cargo',
  demandas_carga_mental: 'Demandas de carga mental',
  demandas_consistencia_rol: 'Consistencia del rol',
  demandas_jornada: 'Demandas de la jornada de trabajo',
  recompensas_pertenencia: 'Recompensas derivadas de la pertenencia a la organización y del trabajo que se realiza',
  recompensas_reconocimiento: 'Reconocimiento y compensación',

  dominio_liderazgo: 'Liderazgo y\nrelaciones\nsociales en el\ntrabajo',
  dominio_control: 'Control sobre\nel trabajo',
  dominio_demandas: 'Demandas\ndel trabajo',
  dominio_recompensas: 'Recompensas',

  total_intralaboral: 'puntaje total del cuestionario de factores de riesgo psicosocial intralaboral',
  
  // Extralaboral
  extra_tiempo_fuera: 'Tiempo fuera del trabajo',
  extra_relaciones_familiares: 'Realciones Familiares',
  extra_comunicacion: 'Comunicación y relaciones interpersonales',
  extra_situacion_economica: 'Situación económica del grupo familiar',
  extra_vivienda: 'Características de la vivienda y de su entorno',
  extra_influencia_trabajo: 'Influencia del entorno extralaboral sobre el trabajo',
  extra_desplazamiento: 'Desplazamiento vivienda - trabajo - vivienda',
  total_extralaboral: 'total del cuestionario de factores\nde riesgo psicosocial extralaboral',

  total_general: 'INTRA + EXTRA',
  estres: 'estrés'
};

/**
 * Obtiene baremo para Forma A o Forma B
 */
function getBaremo(key, formType) {
  const formKey = formType === 'A' ? 'formaA' : 'formaB';
  const baremoName = BAREMO_KEYS_MAP[key] || key;
  return baremosData[formKey][baremoName] || null;
}

/**
 * Calcula un cuestionario individual completo (Forma A o Forma B + Extralaboral + Estrés)
 */
function calculateIndividualEvaluation({
  id,
  nombre,
  cedula,
  formType, // 'A' o 'B'
  cargo,
  area,
  genero,
  edad,
  rawIntraScores, // Array de puntajes ya ponderados o mapa por item { 1: 4, 2: 0, ... }
  rawExtraScores,
  rawStressScores
}) {
  const isFormA = formType === 'A';
  const divisores = isFormA ? DIVISORES.FORMA_A : DIVISORES.FORMA_B;

  // 1. INTRALABORAL DIMENSIONES
  let dimBruto = {};

  if (isFormA) {
    // Forma A mapeo exacto de items (1 a 123)
    dimBruto.demandas_ambientales = sumItems(rawIntraScores, [1,2,3,4,5,6,7,8,9,10,11,12]);
    dimBruto.demandas_cuantitativas = sumItems(rawIntraScores, [13,14,15,32,43,47]);
    dimBruto.demandas_carga_mental = sumItems(rawIntraScores, [16,17,18,20,21]);
    dimBruto.demandas_responsabilidad = sumItems(rawIntraScores, [19,22,23,24,25,26]);
    dimBruto.demandas_consistencia_rol = sumItems(rawIntraScores, [27,28,29,30,52]);
    dimBruto.demandas_jornada = sumItems(rawIntraScores, [31,33,34]);
    dimBruto.demandas_influencia_extralaboral = sumItems(rawIntraScores, [35,36,37,38]);
    dimBruto.control_oportunidades = sumItems(rawIntraScores, [39,40,41,42]);
    dimBruto.control_autonomia = sumItems(rawIntraScores, [44,45,46]);
    dimBruto.control_participacion = sumItems(rawIntraScores, [48,49,50,51]);
    dimBruto.control_claridad_rol = sumItems(rawIntraScores, [53,54,55,56,57,58,59]);
    dimBruto.control_capacitacion = sumItems(rawIntraScores, [60,61,62]);
    dimBruto.liderazgo_caracteristicas = sumItems(rawIntraScores, [63,64,65,66,67,68,69,70,71,72,73,74,75]);
    dimBruto.liderazgo_relaciones = sumItems(rawIntraScores, [76,77,78,79,80,81,82,83,84,85,86,87,88,89]);
    dimBruto.liderazgo_retroalimentacion = sumItems(rawIntraScores, [90,91,92,93,94]);
    dimBruto.recompensas_pertenencia = sumItems(rawIntraScores, [95,102,103,104,105]);
    dimBruto.recompensas_reconocimiento = sumItems(rawIntraScores, [96,97,98,99,100,101]);
    dimBruto.demandas_emocionales = sumItems(rawIntraScores, [106,107,108,109,110,111,112,113,114]);
    dimBruto.liderazgo_colaboradores = sumItems(rawIntraScores, [115,116,117,118,119,120,121,122,123]);
  } else {
    // Forma B mapeo exacto de items (1 a 97)
    dimBruto.demandas_ambientales = sumItems(rawIntraScores, [1,2,3,4,5,6,7,8,9,10,11,12]);
    dimBruto.demandas_cuantitativas = sumItems(rawIntraScores, [13,14,15]);
    dimBruto.demandas_carga_mental = sumItems(rawIntraScores, [16,17,18,19,20]);
    dimBruto.demandas_jornada = sumItems(rawIntraScores, [21,22,23,24,33,37]);
    dimBruto.demandas_influencia_extralaboral = sumItems(rawIntraScores, [25,26,27,28]);
    dimBruto.control_oportunidades = sumItems(rawIntraScores, [29,30,31,32]);
    dimBruto.control_autonomia = sumItems(rawIntraScores, [34,35,36]);
    dimBruto.control_participacion = sumItems(rawIntraScores, [38,39,40]);
    dimBruto.control_claridad_rol = sumItems(rawIntraScores, [41,42,43,44,45]);
    dimBruto.control_capacitacion = sumItems(rawIntraScores, [46,47,48]);
    dimBruto.liderazgo_caracteristicas = sumItems(rawIntraScores, [49,50,51,52,53,54,55,56,57,58,59,60,61]);
    dimBruto.liderazgo_relaciones = sumItems(rawIntraScores, [62,63,64,65,66,67,68,69,70,71,72,73]);
    dimBruto.liderazgo_retroalimentacion = sumItems(rawIntraScores, [74,75,76,77,78]);
    dimBruto.recompensas_reconocimiento = sumItems(rawIntraScores, [79,80,81,82,83,84]);
    dimBruto.recompensas_pertenencia = sumItems(rawIntraScores, [85,86,87,88]);
    dimBruto.demandas_emocionales = sumItems(rawIntraScores, [89,90,91,92,93,94,95,96,97]);
    // N/A en Forma B
    dimBruto.liderazgo_colaboradores = null;
    dimBruto.demandas_responsabilidad = null;
    dimBruto.demandas_consistencia_rol = null;
  }

  // 2. EXTRALABORAL DIMENSIONES (31 ítems)
  let extraBruto = {
    desplazamiento: sumItems(rawExtraScores, [1,2,3,4]),
    caracteristicas_vivienda: sumItems(rawExtraScores, [5,6,7,8,9,10,11,12,13]),
    tiempo_fuera: sumItems(rawExtraScores, [14,15,16,17]),
    comunicacion_interpersonal: sumItems(rawExtraScores, [18,19,20,21,23]),
    relaciones_familiares: sumItems(rawExtraScores, [22,25,27]),
    influencia_extralaboral_trabajo: sumItems(rawExtraScores, [24,26,28]),
    situacion_economica: sumItems(rawExtraScores, [29,30,31])
  };

  // 3. ESTRÉS PONDERADO OFICIAL
  // Ítems 1-8: Fisiológicos (promedio * 4)
  // Ítems 9-12: Comportamiento social (promedio * 3)
  // Ítems 13-22: Intelectuales/Laborales (promedio * 2)
  // Ítems 23-31: Psicoemocionales (promedio * 1)
  const avgFisio = averageItems(rawStressScores, [1,2,3,4,5,6,7,8]);
  const avgSocial = averageItems(rawStressScores, [9,10,11,12]);
  const avgIntelect = averageItems(rawStressScores, [13,14,15,16,17,18,19,20,21,22]);
  const avgPsico = averageItems(rawStressScores, [23,24,25,26,27,28,29,30,31]);
  
  const estresBrutoPonderado = (avgFisio * 4) + (avgSocial * 3) + (avgIntelect * 2) + (avgPsico * 1);
  const estresTransformado = (estresBrutoPonderado / DIVISORES.ESTRES.factor_divisor) * 100;
  const estresRiesgo = classifyRisk(estresTransformado, getBaremo('estres', formType));

  // 4. CÁLCULO DE DIMENSIONES TRANSFORMADAS Y RIESGOS
  const dimensiones = {};
  for (const [key, bruto] of Object.entries(dimBruto)) {
    if (bruto === null || divisores[key] === null) {
      dimensiones[key] = { bruto: null, transformado: null, nivel: 'No aplica' };
    } else {
      const trans = (bruto / divisores[key]) * 100;
      dimensiones[key] = {
        bruto,
        transformado: round2(trans),
        nivel: classifyRisk(trans, getBaremo(key, formType))
      };
    }
  }

  // 5. CÁLCULO DE DOMINIOS
  // Dominio Liderazgo
  const liderazgoBruto = (dimBruto.liderazgo_caracteristicas || 0) + 
                         (dimBruto.liderazgo_relaciones || 0) + 
                         (dimBruto.liderazgo_retroalimentacion || 0) + 
                         (dimBruto.liderazgo_colaboradores || 0);
  const liderazgoTrans = (liderazgoBruto / divisores.dominio_liderazgo) * 100;

  // Dominio Control
  const controlBruto = (dimBruto.control_claridad_rol || 0) + 
                       (dimBruto.control_capacitacion || 0) + 
                       (dimBruto.control_participacion || 0) + 
                       (dimBruto.control_oportunidades || 0) + 
                       (dimBruto.control_autonomia || 0);
  const controlTrans = (controlBruto / divisores.dominio_control) * 100;

  // Dominio Demandas
  const demandasBruto = (dimBruto.demandas_ambientales || 0) + 
                        (dimBruto.demandas_emocionales || 0) + 
                        (dimBruto.demandas_cuantitativas || 0) + 
                        (dimBruto.demandas_influencia_extralaboral || 0) + 
                        (dimBruto.demandas_responsabilidad || 0) + 
                        (dimBruto.demandas_carga_mental || 0) + 
                        (dimBruto.demandas_consistencia_rol || 0) + 
                        (dimBruto.demandas_jornada || 0);
  const demandasTrans = (demandasBruto / divisores.dominio_demandas) * 100;

  // Dominio Recompensas
  const recompensasBruto = (dimBruto.recompensas_pertenencia || 0) + 
                           (dimBruto.recompensas_reconocimiento || 0);
  const recompensasTrans = (recompensasBruto / divisores.dominio_recompensas) * 100;

  const dominios = {
    liderazgo: {
      bruto: liderazgoBruto,
      transformado: round2(liderazgoTrans),
      nivel: classifyRisk(liderazgoTrans, getBaremo('dominio_liderazgo', formType))
    },
    control: {
      bruto: controlBruto,
      transformado: round2(controlTrans),
      nivel: classifyRisk(controlTrans, getBaremo('dominio_control', formType))
    },
    demandas: {
      bruto: demandasBruto,
      transformado: round2(demandasTrans),
      nivel: classifyRisk(demandasTrans, getBaremo('dominio_demandas', formType))
    },
    recompensas: {
      bruto: recompensasBruto,
      transformado: round2(recompensasTrans),
      nivel: classifyRisk(recompensasTrans, getBaremo('dominio_recompensas', formType))
    }
  };

  // 6. TOTAL INTRALABORAL
  const totalIntraBruto = liderazgoBruto + controlBruto + demandasBruto + recompensasBruto;
  const totalIntraTrans = (totalIntraBruto / divisores.total_intralaboral) * 100;
  const totalIntraNivel = classifyRisk(totalIntraTrans, getBaremo('total_intralaboral', formType));

  // 7. EXTRALABORAL DIMENSIONES TRANSFORMADAS
  const extralaboralDimensiones = {};
  let totalExtraBruto = 0;
  for (const [key, bruto] of Object.entries(extraBruto)) {
    const divisor = DIVISORES.EXTRALABORAL[key];
    const trans = (bruto / divisor) * 100;
    totalExtraBruto += bruto;
    extralaboralDimensiones[key] = {
      bruto,
      transformado: round2(trans),
      nivel: classifyRisk(trans, getBaremo('extra_' + key, formType))
    };
  }

  const totalExtraTrans = (totalExtraBruto / divisores.total_extralaboral) * 100;
  const totalExtraNivel = classifyRisk(totalExtraTrans, getBaremo('total_extralaboral', formType));

  // 8. TOTAL CONSOLIDADO (INTRA + EXTRA)
  const totalGeneralBruto = totalIntraBruto + totalExtraBruto;
  const totalGeneralTrans = (totalGeneralBruto / divisores.total_general) * 100;
  const totalGeneralNivel = classifyRisk(totalGeneralTrans, getBaremo('total_general', formType));

  return {
    id,
    nombre,
    cedula,
    formType,
    cargo,
    area,
    genero,
    edad,
    intralaboral: {
      dimensiones,
      dominios,
      total: {
        bruto: totalIntraBruto,
        transformado: round2(totalIntraTrans),
        nivel: totalIntraNivel
      }
    },
    extralaboral: {
      dimensiones: extralaboralDimensiones,
      total: {
        bruto: totalExtraBruto,
        transformado: round2(totalExtraTrans),
        nivel: totalExtraNivel
      }
    },
    consolidado: {
      bruto: totalGeneralBruto,
      transformado: round2(totalGeneralTrans),
      nivel: totalGeneralNivel
    },
    estres: {
      brutoPonderado: round2(estresBrutoPonderado),
      transformado: round2(estresTransformado),
      nivel: estresRiesgo
    }
  };
}

// Helpers
function sumItems(scoresMap, itemIndices) {
  if (!scoresMap) return 0;
  let sum = 0;
  for (const idx of itemIndices) {
    sum += Number(scoresMap[idx] || 0);
  }
  return sum;
}

function averageItems(scoresMap, itemIndices) {
  if (!scoresMap || itemIndices.length === 0) return 0;
  let sum = 0;
  for (const idx of itemIndices) {
    sum += Number(scoresMap[idx] || 0);
  }
  return sum / itemIndices.length;
}

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

module.exports = {
  DIVISORES,
  BAREMO_KEYS_MAP,
  classifyRisk,
  getBaremo,
  calculateIndividualEvaluation
};
