import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const sepayClient = axios.create({
  baseURL: process.env.SEPAY_ENDPOINT || 'https://api.sepay.vn',
  headers: {
    'X-SEPAYS-API-KEY': process.env.SEPAY_API_KEY || ''
  }
});

export const createPaymentRequest = async ({ amount, orderCode, description }) => {
  const { data } = await sepayClient.post('/payments', {
    amount,
    orderCode,
    description
  });
  return data;
};
