const XLSX = require('xlsx');
const { calculateIndividualEvaluation } = require('./src/engine/psychometricEngine');

const path = 'C:/Users/jimmy.martinezb/Downloads/PLANTILLA EN BLANCO 2022_modificada Jimmy.xlsb';
const wb = XLSX.readFile(path);
const wsB = wb.Sheets['FORMA B'];

// Participant B1 is in col H (from row 5 to 165)
const rawIntraScores = {};
for (let item = 1; item <= 97; item++) {
  const row = 4 + item;
  rawIntraScores[item] = wsB['H' + row] ? Number(wsB['H' + row].v || 0) : 0;
}

const rawExtraScores = {};
for (let item = 1; item <= 31; item++) {
  const row = 102 + item;
  rawExtraScores[item] = wsB['H' + row] ? Number(wsB['H' + row].v || 0) : 0;
}

const rawStressScores = {};
for (let item = 1; item <= 31; item++) {
  const row = 134 + item;
  rawStressScores[item] = wsB['H' + row] ? Number(wsB['H' + row].v || 0) : 0;
}

const result = calculateIndividualEvaluation({
  id: 'B1',
  nombre: 'ERIKA MARCELA VASQUEZ RESTREPO',
  cedula: '1036629941',
  formType: 'B',
  cargo: 'Auxiliar Veterinario',
  area: 'Clínica',
  genero: 'Femenino',
  edad: 28,
  rawIntraScores,
  rawExtraScores,
  rawStressScores
});

console.log('--- TEST VALIDATION FOR B1 ---');
console.log('Intralaboral Total:', result.intralaboral.total);
console.log('Dominio Liderazgo:', result.intralaboral.dominios.liderazgo);
console.log('Dominio Control:', result.intralaboral.dominios.control);
console.log('Dominio Demandas:', result.intralaboral.dominios.demandas);
console.log('Dominio Recompensas:', result.intralaboral.dominios.recompensas);
console.log('Extralaboral Total:', result.extralaboral.total);
console.log('Consolidado INTRA+EXTRA:', result.consolidado);
console.log('Estrés Total:', result.estres);

// Expected from Excel FORMA B:
// Intra: 36.08, Alto
// Dom Liderazgo: 27.50, Alto
// Dom Control: 44.44, Muy Alto
// Dom Demandas: 40.38, Alto
// Dom Recompensas: 30, Muy Alto
// Extra: 12.10, Bajo
// Intra+Extra: 30.27, Alto
// Estrés: 54.84, Muy Alto

const checks = [
  { name: 'Intra Total Nivel', actual: result.intralaboral.total.nivel, expected: 'Alto' },
  { name: 'Dom Liderazgo Nivel', actual: result.intralaboral.dominios.liderazgo.nivel, expected: 'Alto' },
  { name: 'Dom Control Nivel', actual: result.intralaboral.dominios.control.nivel, expected: 'Muy Alto' },
  { name: 'Dom Demandas Nivel', actual: result.intralaboral.dominios.demandas.nivel, expected: 'Alto' },
  { name: 'Dom Recompensas Nivel', actual: result.intralaboral.dominios.recompensas.nivel, expected: 'Muy Alto' },
  { name: 'Extra Total Nivel', actual: result.extralaboral.total.nivel, expected: 'Bajo' },
  { name: 'Consolidado Nivel', actual: result.consolidado.nivel, expected: 'Alto' },
  { name: 'Estrés Nivel', actual: result.estres.nivel, expected: 'Muy Alto' }
];

let allPassed = true;
checks.forEach(c => {
  const pass = c.actual === c.expected;
  if (!pass) allPassed = false;
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${c.name}: got "${c.actual}", expected "${c.expected}"`);
});

console.log('ALL AUDIT CHECKS PASSED:', allPassed);
