import axios from 'axios';

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL?.endsWith('/api')
    ? process.env.NEXT_PUBLIC_API_URL
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api`
  )
});


api.interceptors.request.use(cfg=>{
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
