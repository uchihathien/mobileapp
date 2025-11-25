import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const aiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.AI_API_KEY}`
  }
});

export const askAI = async (messages) => {
  const { data } = await aiClient.post('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages
  });
  return data.choices?.[0]?.message?.content || '';
};
