const XLSX = require('xlsx');
const fs = require('fs');

const path = 'C:/Users/jimmy.martinezb/Downloads/PLANTILLA EN BLANCO 2022_modificada Jimmy.xlsb';
const wb = XLSX.readFile(path, { cellFormula: true });
const wsA = wb.Sheets['FORMA A'];
const wsB = wb.Sheets['FORMA B'];

function parseQuestionsAndDimensions(ws, formType) {
  // Read items 1..123 (or 97)
  // Check formula in col H to determine if direct or inverse
  // Formula: +C5*4+D5*3... => direct
  // Formula: +C8*0+D8*1... => inverse
  const maxIntra = formType === 'A' ? 123 : 97;
  const questionsIntra = [];
  
  for (let itemNum = 1; itemNum <= maxIntra; itemNum++) {
    const row = 4 + itemNum;
    const text = ws['B' + row] ? ws['B' + row].v : '';
    const formula = ws['H' + row] ? ws['H' + row].f || '' : '';
    const isInverse = formula.includes('*0') && formula.startsWith('+C' + row + '*0');
    questionsIntra.push({
      id: itemNum,
      text: String(text).trim(),
      polarity: isInverse ? 'inverse' : 'direct', // direct: Siempre=4... Nunca=0; inverse: Siempre=0... Nunca=4
      formula: formula
    });
  }

  // Extralaboral items 1..31
  // In Forma A, starts at row 129
  // In Forma B, starts at row 103
  const startExtraRow = formType === 'A' ? 129 : 103;
  const questionsExtra = [];
  for (let itemNum = 1; itemNum <= 31; itemNum++) {
    const row = startExtraRow + itemNum - 1;
    const text = ws['B' + row] ? ws['B' + row].v : '';
    const formula = ws['H' + row] ? ws['H' + row].f || '' : '';
    const isInverse = formula.includes('*0') && formula.startsWith('+C' + row + '*0');
    questionsExtra.push({
      id: itemNum,
      text: String(text).trim(),
      polarity: isInverse ? 'inverse' : 'direct',
      formula: formula
    });
  }

  // Estrés items 1..31
  // In Forma A, starts at row 161
  // In Forma B, starts at row 135
  const startStressRow = formType === 'A' ? 161 : 135;
  const questionsStress = [];
  for (let itemNum = 1; itemNum <= 31; itemNum++) {
    const row = startStressRow + itemNum - 1;
    const text = ws['B' + row] ? ws['B' + row].v : '';
    // Estrés scale: Siempre=3, Casi siempre=2, A veces=1, Nunca=0
    // (o según la fórmula en H)
    const formula = ws['H' + row] ? ws['H' + row].f || '' : '';
    questionsStress.push({
      id: itemNum,
      text: String(text).trim(),
      formula: formula
    });
  }

  return { questionsIntra, questionsExtra, questionsStress };
}

const catalogA = parseQuestionsAndDimensions(wsA, 'A');
const catalogB = parseQuestionsAndDimensions(wsB, 'B');

fs.writeFileSync('C:/Users/jimmy.martinezb/.gemini/antigravity/scratch/bateria-riesgo-psicosocial/question_catalogs.json', JSON.stringify({ catalogA, catalogB }, null, 2));
console.log('Successfully saved question_catalogs.json');
