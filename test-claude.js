// Test if Claude models are working now
const Anthropic = require('@anthropic-ai/sdk');

const MODELS = [
  'claude-3-5-sonnet-20241022',
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307',
];

async function testClaude() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY not set');
    console.log('Run: export ANTHROPIC_API_KEY=your-key-here');
    process.exit(1);
  }
  
  console.log('🔍 Testing Claude models with your API key...\n');
  console.log('API Key:', apiKey.substring(0, 25) + '...\n');
  
  const client = new Anthropic({ apiKey });
  
  for (const model of MODELS) {
    try {
      const response = await client.messages.create({
        model: model,
        max_tokens: 50,
        messages: [{ role: 'user', content: 'Say "Working!" if you can read this.' }]
      });
      
      const text = response.content[0]?.text || '';
      console.log(`✅ ${model} - WORKS!`);
      console.log(`   Response: ${text}\n`);
      return model; // Return first working model
    } catch (error) {
      if (error.status === 404) {
        console.log(`❌ ${model} - Not available (404)\n`);
      } else if (error.status === 401) {
        console.log(`❌ ${model} - Authentication error (401)\n`);
        console.log('   Your API key is invalid or expired.\n');
        break;
      } else {
        console.log(`⚠️  ${model} - Error: ${error.message}\n`);
      }
    }
  }
  
  console.log('❌ No Claude models are available with your API key.\n');
  console.log('💡 Next steps:');
  console.log('1. Wait for Anthropic support to activate your account');
  console.log('2. Reply to their email asking when access will be enabled');
  console.log('3. Check https://console.anthropic.com/settings/billing for credits\n');
  
  return null;
}

testClaude().then(workingModel => {
  if (workingModel) {
    console.log(`\n🎉 SUCCESS! Use this model: ${workingModel}`);
  } else {
    console.log('\n⏳ Your account needs activation from Anthropic support.');
  }
});
