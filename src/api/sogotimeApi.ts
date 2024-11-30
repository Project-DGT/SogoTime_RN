import { API_URL } from '@env';
import axios from 'axios';

export const baseUrl = API_URL
export const customAxios = axios.create({
  baseURL: baseUrl,
  responseType: 'json',
  withCredentials: true,
  timeout: 1000,
});