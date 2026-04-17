// Quick test script to verify Anthropic API key works
// Run: node test-anthropic.js

const Anthropic = require('@anthropic-ai/sdk');

async function testAPI() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY not found in environment');
    console.log('Set it with: export ANTHROPIC_API_KEY=sk-ant-api03-...');
    process.exit(1);
  }

  console.log('🔑 API Key found:', apiKey.substring(0, 20) + '...');
  
  const client = new Anthropic({ apiKey });

  try {
    console.log('\n🧪 Testing API connection...');
    
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Say "API works!" if you can read this.'
      }]
    });

    console.log('✅ SUCCESS! API is working!');
    console.log('📝 Response:', response.content[0].text);
    console.log('\n✨ Your API key is configured correctly!');
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    console.error('\nFull error:', error);
    
    if (error.status === 404) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Your API key might not have access to Claude models yet');
      console.log('2. Try creating a NEW API key at: https://console.anthropic.com/settings/keys');
      console.log('3. Make sure you have credits: https://console.anthropic.com/settings/billing');
      console.log('4. Check if you\'re in the right workspace/organization');
    }
  }
}

testAPI();
