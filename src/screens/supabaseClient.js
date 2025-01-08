import axios from 'axios';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';

export const supabaseAxios = axios.create({
  baseURL: `${SUPABASE_URL}`,
  headers: {
    apiKey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
});
