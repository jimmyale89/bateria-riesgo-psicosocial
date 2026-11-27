/**
 * MOTOR PSICOMÉTRICO NORMATIVO (ES Module)
 * Basado en la Resolución 2646 de 2008, 2404 de 2019, 2764 de 2022
 * y Baremos oficiales Javeriana / Ministerio del Trabajo de Colombia.
 */

import baremosData from '../data/baremos.json';

export const DIVISORES = {
  FORMA_A: {
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

    dominio_liderazgo: 164,
    dominio_control: 84,
    dominio_demandas: 200,
    dominio_recompensas: 44,

    total_intralaboral: 492,
    total_extralaboral: 124,
    total_general: 616
  },
  FORMA_B: {
    liderazgo_caracteristicas: 52,
    liderazgo_relaciones: 48,
    liderazgo_retroalimentacion: 20,
    liderazgo_colaboradores: null,

    control_claridad_rol: 20,
    control_capacitacion: 12,
    control_participacion: 12,
    control_oportunidades: 16,
    control_autonomia: 12,

    demandas_ambientales: 48,
    demandas_emocionales: 36,
    demandas_cuantitativas: 12,
    demandas_influencia_extralaboral: 16,
    demandas_responsabilidad: null,
    demandas_carga_mental: 20,
    demandas_consistencia_rol: null,
    demandas_jornada: 24,

    recompensas_pertenencia: 16,
    recompensas_reconocimiento: 24,

    dominio_liderazgo: 120,
    dominio_control: 72,
    dominio_demandas: 156,
    dominio_recompensas: 40,

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

export const BAREMO_KEYS_MAP = {
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

export const DIMENSION_TITLES = {
  liderazgo_caracteristicas: 'Características del Liderazgo',
  liderazgo_relaciones: 'Relaciones Sociales en el Trabajo',
  liderazgo_retroalimentacion: 'Retroalimentación del Desempeño',
  liderazgo_colaboradores: 'Relación con los Colaboradores',
  control_claridad_rol: 'Claridad del Rol',
  control_capacitacion: 'Capacitación',
  control_participacion: 'Participación y Manejo del Cambio',
  control_oportunidades: 'Oportunidades de Desarrollo y Habilidades',
  control_autonomia: 'Control y Autonomía en el Trabajo',
  demandas_ambientales: 'Demandas Ambientales y Esfuerzo Físico',
  demandas_emocionales: 'Demandas Emocionales',
  demandas_cuantitativas: 'Demandas Cuantitativas',
  demandas_influencia_extralaboral: 'Influencia del Trabajo sobre Entorno Extralaboral',
  demandas_responsabilidad: 'Exigencias de Responsabilidad del Cargo',
  demandas_carga_mental: 'Demandas de Carga Mental',
  demandas_consistencia_rol: 'Consistencia del Rol',
  demandas_jornada: 'Demandas de la Jornada de Trabajo',
  recompensas_pertenencia: 'Recompensas por Pertenencia a la Organización',
  recompensas_reconocimiento: 'Reconocimiento y Compensación',
  
  extra_tiempo_fuera: 'Tiempo Fuera del Trabajo',
  extra_relaciones_familiares: 'Relaciones Familiares',
  extra_comunicacion: 'Comunicación y Relaciones Interpersonales',
  extra_situacion_economica: 'Situación Económica del Grupo Familiar',
  extra_vivienda: 'Características de la Vivienda y su Entorno',
  extra_influencia_trabajo: 'Influencia del Entorno Extralaboral sobre el Trabajo',
  extra_desplazamiento: 'Desplazamiento Vivienda - Trabajo - Vivienda'
};

export function classifyRisk(score, baremoList) {
  if (score === null || score === undefined || isNaN(score) || !baremoList || baremoList.length === 0) {
    return 'Sin dato';
  }
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

export function getBaremo(key, formType) {
  const formKey = formType === 'A' ? 'formaA' : 'formaB';
  const baremoName = BAREMO_KEYS_MAP[key] || key;
  return baremosData[formKey][baremoName] || null;
}

export function calculateIndividualEvaluation({
  id,
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
}) {
  const isFormA = formType === 'A';
  const divisores = isFormA ? DIVISORES.FORMA_A : DIVISORES.FORMA_B;

  let dimBruto = {};

  if (isFormA) {
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
    dimBruto.liderazgo_colaboradores = null;
    dimBruto.demandas_responsabilidad = null;
    dimBruto.demandas_consistencia_rol = null;
  }

  let extraBruto = {
    extra_desplazamiento: sumItems(rawExtraScores, [1,2,3,4]),
    extra_vivienda: sumItems(rawExtraScores, [5,6,7,8,9,10,11,12,13]),
    extra_tiempo_fuera: sumItems(rawExtraScores, [14,15,16,17]),
    extra_comunicacion: sumItems(rawExtraScores, [18,19,20,21,23]),
    extra_relaciones_familiares: sumItems(rawExtraScores, [22,25,27]),
    extra_influencia_trabajo: sumItems(rawExtraScores, [24,26,28]),
    extra_situacion_economica: sumItems(rawExtraScores, [29,30,31])
  };

  const avgFisio = averageItems(rawStressScores, [1,2,3,4,5,6,7,8]);
  const avgSocial = averageItems(rawStressScores, [9,10,11,12]);
  const avgIntelect = averageItems(rawStressScores, [13,14,15,16,17,18,19,20,21,22]);
  const avgPsico = averageItems(rawStressScores, [23,24,25,26,27,28,29,30,31]);
  
  const estresBrutoPonderado = (avgFisio * 4) + (avgSocial * 3) + (avgIntelect * 2) + (avgPsico * 1);
  const estresTransformado = (estresBrutoPonderado / DIVISORES.ESTRES.factor_divisor) * 100;
  const estresRiesgo = classifyRisk(estresTransformado, getBaremo('estres', formType));

  const dimensiones = {};
  for (const [key, bruto] of Object.entries(dimBruto)) {
    if (bruto === null || divisores[key] === null) {
      dimensiones[key] = {
        title: DIMENSION_TITLES[key] || key,
        bruto: null,
        divisor: null,
        transformado: null,
        nivel: 'No aplica'
      };
    } else {
      const trans = (bruto / divisores[key]) * 100;
      dimensiones[key] = {
        title: DIMENSION_TITLES[key] || key,
        bruto,
        divisor: divisores[key],
        transformado: round2(trans),
        nivel: classifyRisk(trans, getBaremo(key, formType))
      };
    }
  }

  const liderazgoBruto = (dimBruto.liderazgo_caracteristicas || 0) + 
                         (dimBruto.liderazgo_relaciones || 0) + 
                         (dimBruto.liderazgo_retroalimentacion || 0) + 
                         (dimBruto.liderazgo_colaboradores || 0);
  const liderazgoTrans = (liderazgoBruto / divisores.dominio_liderazgo) * 100;

  const controlBruto = (dimBruto.control_claridad_rol || 0) + 
                       (dimBruto.control_capacitacion || 0) + 
                       (dimBruto.control_participacion || 0) + 
                       (dimBruto.control_oportunidades || 0) + 
                       (dimBruto.control_autonomia || 0);
  const controlTrans = (controlBruto / divisores.dominio_control) * 100;

  const demandasBruto = (dimBruto.demandas_ambientales || 0) + 
                        (dimBruto.demandas_emocionales || 0) + 
                        (dimBruto.demandas_cuantitativas || 0) + 
                        (dimBruto.demandas_influencia_extralaboral || 0) + 
                        (dimBruto.demandas_responsabilidad || 0) + 
                        (dimBruto.demandas_carga_mental || 0) + 
                        (dimBruto.demandas_consistencia_rol || 0) + 
                        (dimBruto.demandas_jornada || 0);
  const demandasTrans = (demandasBruto / divisores.dominio_demandas) * 100;

  const recompensasBruto = (dimBruto.recompensas_pertenencia || 0) + 
                           (dimBruto.recompensas_reconocimiento || 0);
  const recompensasTrans = (recompensasBruto / divisores.dominio_recompensas) * 100;

  const dominios = {
    liderazgo: {
      title: 'Liderazgo y Relaciones Sociales en el Trabajo',
      bruto: liderazgoBruto,
      divisor: divisores.dominio_liderazgo,
      transformado: round2(liderazgoTrans),
      nivel: classifyRisk(liderazgoTrans, getBaremo('dominio_liderazgo', formType))
    },
    control: {
      title: 'Control sobre el Trabajo',
      bruto: controlBruto,
      divisor: divisores.dominio_control,
      transformado: round2(controlTrans),
      nivel: classifyRisk(controlTrans, getBaremo('dominio_control', formType))
    },
    demandas: {
      title: 'Demandas del Trabajo',
      bruto: demandasBruto,
      divisor: divisores.dominio_demandas,
      transformado: round2(demandasTrans),
      nivel: classifyRisk(demandasTrans, getBaremo('dominio_demandas', formType))
    },
    recompensas: {
      title: 'Recompensas',
      bruto: recompensasBruto,
      divisor: divisores.dominio_recompensas,
      transformado: round2(recompensasTrans),
      nivel: classifyRisk(recompensasTrans, getBaremo('dominio_recompensas', formType))
    }
  };

  const totalIntraBruto = liderazgoBruto + controlBruto + demandasBruto + recompensasBruto;
  const totalIntraTrans = (totalIntraBruto / divisores.total_intralaboral) * 100;
  const totalIntraNivel = classifyRisk(totalIntraTrans, getBaremo('total_intralaboral', formType));

  const extralaboralDimensiones = {};
  let totalExtraBruto = 0;
  for (const [key, bruto] of Object.entries(extraBruto)) {
    const rawKey = key.replace('extra_', '');
    const divisor = DIVISORES.EXTRALABORAL[rawKey];
    const trans = (bruto / divisor) * 100;
    totalExtraBruto += bruto;
    extralaboralDimensiones[key] = {
      title: DIMENSION_TITLES[key] || key,
      bruto,
      divisor,
      transformado: round2(trans),
      nivel: classifyRisk(trans, getBaremo(key, formType))
    };
  }

  const totalExtraTrans = (totalExtraBruto / divisores.total_extralaboral) * 100;
  const totalExtraNivel = classifyRisk(totalExtraTrans, getBaremo('total_extralaboral', formType));

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
    antiguedad,
    intralaboral: {
      dimensiones,
      dominios,
      total: {
        bruto: totalIntraBruto,
        divisor: divisores.total_intralaboral,
        transformado: round2(totalIntraTrans),
        nivel: totalIntraNivel
      }
    },
    extralaboral: {
      dimensiones: extralaboralDimensiones,
      total: {
        bruto: totalExtraBruto,
        divisor: divisores.total_extralaboral,
        transformado: round2(totalExtraTrans),
        nivel: totalExtraNivel
      }
    },
    consolidado: {
      bruto: totalGeneralBruto,
      divisor: divisores.total_general,
      transformado: round2(totalGeneralTrans),
      nivel: totalGeneralNivel
    },
    estres: {
      brutoPonderado: round2(estresBrutoPonderado),
      divisor: DIVISORES.ESTRES.factor_divisor,
      transformado: round2(estresTransformado),
      nivel: estresRiesgo
    }
  };
}

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
