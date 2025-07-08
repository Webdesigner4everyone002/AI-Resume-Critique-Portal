const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function getSectionFeedback(sectionText, sectionType, jobRole) {
  const prompt = `
You are an ATS resume coach.

Job Role: ${jobRole}

Review the following "${sectionType}" section and give 2-3 concise bullet points of feedback based on:
- Relevance
- Grammar
- ATS optimization
- Missing keywords

Section:
"""${sectionText}"""
`;

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemma:2b', // Or 'llama3', 'phi3', etc.
      prompt: prompt,
      stream: false
    }),
  });

  const data = await response.json();

  if (!data || !data.response) {
    throw new Error('No response from Ollama');
  }

  return data.response.trim();
}

module.exports = { getSectionFeedback };
