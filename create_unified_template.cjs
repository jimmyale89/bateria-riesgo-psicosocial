const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Cargar catálogo de preguntas
const catalogPath = path.join(__dirname, 'question_catalogs.json');
const { catalogA, catalogB } = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// 1. Definir columnas de la hoja única
const headers = [
  // Ficha de Datos Generales (12 columnas)
  'FORMA', // A o B
  'IDENTIFICACION',
  'NOMBRE_COMPLETO',
  'CARGO',
  'AREA_DE_TRABAJO',
  'GENERO', // F o M
  'EDAD',
  'ESTADO_CIVIL',
  'ESCOLARIDAD',
  'ANTIGUEDAD_EMPRESA',
  'TIPO_CONTRATO',
  'HORAS_LABORALES_DIA'
];

// Intralaboral 1 al 123 (Para Forma A: 1-123; Para Forma B: 1-97, resto vacío o N/A)
for (let i = 1; i <= 123; i++) {
  const qText = catalogA.questionsIntra[i - 1] ? catalogA.questionsIntra[i - 1].text : '';
  const shortText = qText.length > 30 ? qText.substring(0, 27) + '...' : qText;
  headers.push(`INTRA_${String(i).padStart(3, '0')} (${shortText})`);
}

// Extralaboral 1 al 31
for (let i = 1; i <= 31; i++) {
  const qText = catalogA.questionsExtra[i - 1] ? catalogA.questionsExtra[i - 1].text : '';
  const shortText = qText.length > 30 ? qText.substring(0, 27) + '...' : qText;
  headers.push(`EXTRA_${String(i).padStart(2, '0')} (${shortText})`);
}

// Estrés 1 al 31
for (let i = 1; i <= 31; i++) {
  const qText = catalogA.questionsStress[i - 1] ? catalogA.questionsStress[i - 1].text : '';
  const shortText = qText.length > 30 ? qText.substring(0, 27) + '...' : qText;
  headers.push(`ESTRES_${String(i).padStart(2, '0')} (${shortText})`);
}

console.log('Total columns in unified format:', headers.length);

// 2. Filas de ejemplo real (Consultorio Veterinario Dr. Diego Atuesta)
const sampleRowA = [
  'A',
  '79845210',
  'Dr. Diego Atuesta',
  'Médico Veterinario Director',
  'Dirección Médica & Cirugía',
  'M',
  44,
  'Casado',
  'Post-grado Completo',
  '6 a 10 años',
  'Término Indefinido',
  10
];
// Llenar 123 ítems intra (valores 0 a 4)
for (let i = 1; i <= 123; i++) {
  sampleRowA.push((i % 4)); // valores de prueba
}
// Llenar 31 ítems extra (0 a 4)
for (let i = 1; i <= 31; i++) {
  sampleRowA.push((i % 3));
}
// Llenar 31 ítems estrés (0 a 3)
for (let i = 1; i <= 31; i++) {
  sampleRowA.push((i % 3));
}

// Fila de ejemplo Forma B (Erika Vásquez)
const sampleRowB = [
  'B',
  '1036629941',
  'Erika Marcela Vásquez Restrepo',
  'Auxiliar de Veterinaria',
  'Hospitalización y Procedimientos',
  'F',
  28,
  'Soltera',
  'Técnico/ Tecnológico Completo',
  '1 a 2 años',
  'Término Indefinido',
  8
];
// Forma B llena del 1 al 97
for (let i = 1; i <= 97; i++) {
  sampleRowB.push((i % 4));
}
// Del 98 al 123 queda vacío o N/A (no aplica para Forma B)
for (let i = 98; i <= 123; i++) {
  sampleRowB.push('');
}
// Extralaboral (31)
for (let i = 1; i <= 31; i++) {
  sampleRowB.push((i % 3));
}
// Estrés (31)
for (let i = 1; i <= 31; i++) {
  sampleRowB.push((i % 3));
}

// 3. Crear Workbook con UNA SOLA HOJA
const wb = XLSX.utils.book_new();
const wsData = [
  headers,
  sampleRowA,
  sampleRowB
];

const ws = XLSX.utils.aoa_to_sheet(wsData);

// Ajustar anchos de columnas
const colWidths = [
  { wch: 8 },  // FORMA
  { wch: 15 }, // IDENTIFICACION
  { wch: 30 }, // NOMBRE_COMPLETO
  { wch: 28 }, // CARGO
  { wch: 25 }, // AREA
  { wch: 8 },  // GENERO
  { wch: 6 },  // EDAD
  { wch: 14 }, // ESTADO_CIVIL
  { wch: 24 }, // ESCOLARIDAD
  { wch: 18 }, // ANTIGUEDAD
  { wch: 20 }, // CONTRATO
  { wch: 10 }  // HORAS
];
// Ancho para preguntas
for (let i = 12; i < headers.length; i++) {
  colWidths.push({ wch: 16 });
}
ws['!cols'] = colWidths;

// Nombre de la única hoja
const sheetName = 'TABULACION_UNICA_BATERIA';
XLSX.utils.book_append_sheet(wb, ws, sheetName);

// 4. Guardar en varias ubicaciones estratégicas:
// A) En la carpeta public de la app web (para descarga directa desde el navegador)
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
const targetPublic = path.join(publicDir, 'PLANTILLA_UNICA_BATERIA_RIESGO_PSICOSOCIAL.xlsx');
XLSX.writeFile(wb, targetPublic);

// B) En Downloads de Jimmy para que lo tenga ya mismo en su computador
const downloadsPath = 'C:/Users/jimmy.martinezb/Downloads/PLANTILLA_UNICA_BATERIA_RIESGO_PSICOSOCIAL.xlsx';
try {
  XLSX.writeFile(wb, downloadsPath);
  console.log('Saved directly to Downloads:', downloadsPath);
} catch (e) {
  console.log('Note on Downloads:', e.message);
}

// C) En la raíz del proyecto
const rootPath = path.join(__dirname, 'PLANTILLA_UNICA_BATERIA_RIESGO_PSICOSOCIAL.xlsx');
XLSX.writeFile(wb, rootPath);
console.log('Saved in project root:', rootPath);
