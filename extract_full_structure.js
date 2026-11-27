const XLSX = require('xlsx');
const fs = require('fs');
const path = 'C:/Users/jimmy.martinezb/Downloads/PLANTILLA EN BLANCO 2022_modificada Jimmy.xlsb';

const wb = XLSX.readFile(path, { cellFormula: true });

function extractQuestionStructure(sheet, isFormaA) {
  const ws = wb.Sheets[sheet];
  const items = [];
  // For Forma A, questions are 1..123 (rows 5..127)
  // Extralaboral are 1..31 (rows 129..159)
  // Estrés are 1..31 (rows 161..191)
  for (let r = 5; r <= 200; r++) {
    const itemNum = ws['A' + r] ? ws['A' + r].v : null;
    const text = ws['B' + r] ? ws['B' + r].v : null;
    const hCell = ws['H' + r];
    const formula = hCell ? (hCell.f || '') : '';
    if (itemNum !== null && itemNum !== undefined && text) {
      items.push({ row: r, item: itemNum, text: String(text).trim(), formula: formula });
    }
  }
  return items;
}

const itemsA = extractQuestionStructure('FORMA A', true);
const itemsB = extractQuestionStructure('FORMA B', false);

console.log('Items extracted from FORMA A:', itemsA.length);
console.log('Items extracted from FORMA B:', itemsB.length);
console.log('First 5 items A:', itemsA.slice(0, 5));

fs.writeFileSync('C:/Users/jimmy.martinezb/.gemini/antigravity/scratch/bateria-riesgo-psicosocial/questions_structure.json', JSON.stringify({ itemsA, itemsB }, null, 2));
