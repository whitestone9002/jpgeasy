const jiti = require('jiti')(process.cwd());
const { GUIDES } = jiti('./lib/config/guides');
const { TOOLS } = jiti('./lib/config/tools');

console.log('Total Guides loaded:', GUIDES.length);
console.log('Total Tools loaded:', TOOLS.length);

const keywords = [
  'png to pdf',
  'pdf to img',
  'how to convert pdf to jpeg',
  'webp to pdf',
  'gif to png',
  'gif to jpg',
  'gif to webp'
];

keywords.forEach(kw => {
  console.log('\n========================================');
  console.log(`KEYWORD: "${kw}"`);
  console.log('========================================');

  // Check in Tools
  const kwLower = kw.toLowerCase();
  const kwNoHow = kwLower.replace('how to convert ', '').trim();
  const slugified = kwNoHow.replace(/\s+/g, '-');

  const toolMatches = TOOLS.filter(t => {
    const slug = t.slug.toLowerCase();
    const name = t.name.toLowerCase();
    const title = (t.metaTitle || '').toLowerCase();
    const desc = (t.metaDescription || '').toLowerCase();
    return slug === slugified || name.includes(kwNoHow) || title.includes(kwNoHow) || desc.includes(kwNoHow);
  });

  if (toolMatches.length > 0) {
    console.log('  FOUND TOOLS:');
    toolMatches.forEach(t => {
      console.log(`    - /${t.slug} ("${t.name}")`);
    });
  } else {
    console.log('  NO TOOL DIRECTLY MATCHED');
  }

  // Check in Guides
  const guideMatches = GUIDES.filter(g => {
    const slug = g.slug.toLowerCase();
    const title = g.title.toLowerCase();
    const metaTitle = (g.metaTitle || '').toLowerCase();
    const desc = (g.metaDescription || '').toLowerCase();
    return slug.includes(slugified) || title.includes(kwNoHow) || metaTitle.includes(kwNoHow) || desc.includes(kwNoHow);
  });

  if (guideMatches.length > 0) {
    console.log('  FOUND GUIDES:');
    guideMatches.forEach(g => {
      console.log(`    - /guides/${g.slug} ("${g.title}")`);
    });
  } else {
    console.log('  NO GUIDE DIRECTLY MATCHED');
  }
});
