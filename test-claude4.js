const Anthropic = require('@anthropic-ai/sdk');

async function testClaude4() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const client = new Anthropic({ apiKey });
  
  console.log('🔍 Testing Claude 4 Opus (best model for vision)...\n');
  
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 100,
      messages: [{ 
        role: 'user', 
        content: 'Say "Claude 4 Opus is working perfectly!" if you can read this.' 
      }]
    });
    
    const text = response.content[0]?.text || '';
    console.log('✅ SUCCESS! Claude 4 Opus is working!\n');
    console.log('Response:', text);
    console.log('\n🎉 Your Forex analyzer will work perfectly with this model!');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testClaude4();
