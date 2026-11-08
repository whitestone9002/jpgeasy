const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\user\\.gemini\\antigravity\\brain\\975656c4-6118-46a5-ad47-f2e774df164b\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

let steps = [];
rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if ((obj.step_index >= 20135 && obj.step_index <= 20155) || (obj.step_index >= 20320 && obj.step_index <= 20370)) {
      steps.push({
        step: obj.step_index,
        source: obj.source,
        type: obj.type,
        content: obj.content ? obj.content.slice(0, 300) : ''
      });
    }
  } catch(e) {}
});

rl.on('close', () => {
  steps.forEach(s => {
    console.log(`[Step ${s.step} - ${s.source}]: ${s.content}\n`);
  });
});
