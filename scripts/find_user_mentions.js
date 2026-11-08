const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\user\\.gemini\\antigravity\\brain\\975656c4-6118-46a5-ad47-f2e774df164b\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

let matches = [];
rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      const c = obj.content;
      if (/(shared|posted|submit|backlink|where|site|platform|reddit|quora|product|hunt|medium|pinterest|linkedin|tumblr|facebook|twitter)/i.test(c)) {
        matches.push({ step: obj.step_index, content: c.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() });
      }
    }
  } catch(e) {}
});

rl.on('close', () => {
  console.log('Found matches:', matches.length);
  matches.forEach(m => {
    console.log('[Step ' + m.step + ']: ' + m.content + '\n');
  });
});
