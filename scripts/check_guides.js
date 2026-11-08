const fs = require('fs');
const path = require('path');

const guidesDir = path.join(process.cwd(), 'lib', 'config', 'guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

let allGuides = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(guidesDir, f), 'utf8');
  const matches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  matches.forEach(m => {
    const slug = m.split(/['"]/)[1];
    allGuides.push({ file: f, slug: slug });
  });
});

console.log('Total guides:', allGuides.length);
const searchTerms = [
  'png-to-pdf',
  'pdf-to-img',
  'pdf-to-jpeg',
  'convert-pdf-to-jpeg',
  'webp-to-pdf',
  'gif-to-png',
  'gif-to-jpg',
  'gif-to-webp',
  'gif'
];

searchTerms.forEach(term => {
  const hits = allGuides.filter(g => g.slug.includes(term));
  console.log(`=== Matches for "${term}": ===`);
  if (hits.length === 0) console.log('  None');
  hits.forEach(h => console.log(`  [${h.file}] ${h.slug}`));
});
