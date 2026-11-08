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
    const text = obj.content || '';
    if (/(shared|backlink|referral|reddit|quora|product hunt|facebook|twitter|linkedin|pinterest|medium|youtube|forum|community)/i.test(text)) {
      // Check if it's user or model talking about user having shared links
      if (obj.source === 'USER_EXPLICIT' || (obj.source === 'MODEL' && /you shared|you posted|you mentioned|already shared/i.test(text))) {
        matches.push({ step: obj.step_index, source: obj.source, text: text.slice(0, 300) });
      }
    }
  } catch(e) {}
});

rl.on('close', () => {
  console.log('Matches:', matches.length);
  matches.forEach(m => console.log(`[Step ${m.step} - ${m.source}]: ${m.text}\n`));
});
