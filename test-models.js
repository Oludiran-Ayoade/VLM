// Test which Claude models are available to your API key
const Anthropic = require('@anthropic-ai/sdk');

const MODELS_TO_TEST = [
  'claude-3-5-sonnet-20241022',
  'claude-3-5-sonnet-latest',
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307',
  'claude-2.1',
  'claude-2.0',
  'claude-instant-1.2',
];

async function testModels() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Set ANTHROPIC_API_KEY first');
    process.exit(1);
  }

  console.log('🔍 Testing which models are available...\n');
  
  const client = new Anthropic({ apiKey });
  
  for (const model of MODELS_TO_TEST) {
    try {
      await client.messages.create({
        model: model,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      });
      console.log(`✅ ${model} - WORKS!`);
    } catch (error) {
      if (error.status === 404) {
        console.log(`❌ ${model} - Not available (404)`);
      } else {
        console.log(`⚠️  ${model} - Error: ${error.message}`);
      }
    }
  }
  
  console.log('\n✨ Test complete!');
}

testModels();
