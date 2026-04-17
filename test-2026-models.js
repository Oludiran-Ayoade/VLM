// Test 2026 model names
const Anthropic = require('@anthropic-ai/sdk');

const MODELS_TO_TEST = [
  // 2026 models
  'claude-3-7-sonnet-20260620',
  'claude-4-opus-20260315',
  'claude-sonnet-4-20260514',
  // Try without dates
  'claude-3-sonnet',
  'claude-3-opus',
  'claude-3-haiku',
  'claude-sonnet',
  'claude-opus',
  'claude-haiku',
];

async function testModels() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Set ANTHROPIC_API_KEY first');
    process.exit(1);
  }

  console.log('🔍 Testing 2026 model names...\n');
  
  const client = new Anthropic({ apiKey });
  
  for (const model of MODELS_TO_TEST) {
    try {
      await client.messages.create({
        model: model,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      });
      console.log(`✅ ${model} - WORKS!`);
      return; // Stop at first working model
    } catch (error) {
      if (error.status === 404) {
        console.log(`❌ ${model} - Not available`);
      } else {
        console.log(`⚠️  ${model} - Error: ${error.message}`);
      }
    }
  }
  
  console.log('\n❌ No models available. Your account still has no model access.');
  console.log('\n💡 Solutions:');
  console.log('1. Wait 1-2 hours for the access to propagate');
  console.log('2. Reply to the Anthropic email asking for specific model names');
  console.log('3. Switch to OpenAI GPT-4 Vision (I can implement this now)');
}

testModels();
