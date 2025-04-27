import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' etc.
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that returns clean, comma-separated lists of words or short phrases for text analysis tools. Your output must ONLY be the list, no intro, no explanation, no extra words.'
        },
        {
          role: 'user',
          content: `Generate a list of 10-20 related words and short casual phrases about "${category}". Use common, casual language. Return only a single line with words and phrases separated by commas.`
        }
      ],      
      temperature: 0.6,
      max_tokens: 150,
    });

    const expanded = gptResponse.choices[0]?.message?.content || '';
    res.status(200).json({ expanded });
  } catch (error: any) {
    console.error(error.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to expand category' });
  }
}
