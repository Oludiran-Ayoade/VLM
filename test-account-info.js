// Check account information
const Anthropic = require('@anthropic-ai/sdk');

async function checkAccount() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Set ANTHROPIC_API_KEY first');
    process.exit(1);
  }

  console.log('🔍 Checking account information...\n');
  console.log('API Key:', apiKey.substring(0, 25) + '...');
  
  const client = new Anthropic({ apiKey });
  
  // Try a simple request to get error details
  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'test' }]
    });
    console.log('✅ Model works!');
  } catch (error) {
    console.log('\n📋 Error Details:');
    console.log('Status:', error.status);
    console.log('Type:', error.type);
    console.log('Message:', error.error?.error?.message || error.message);
    
    if (error.headers) {
      const orgId = error.headers.get('anthropic-organization-id');
      if (orgId) {
        console.log('Organization ID:', orgId);
      }
    }
    
    console.log('\n💡 Next Steps:');
    console.log('1. Reply to Anthropic email asking: "Which specific model names can I use?"');
    console.log('2. Ask them: "When will my API key have model access?"');
    console.log('3. Or switch to OpenAI GPT-4 Vision (works immediately)');
  }
}

checkAccount();
