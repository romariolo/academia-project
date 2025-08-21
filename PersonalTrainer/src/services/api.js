
import axios from 'axios';

// Cria uma instância do axios com a URL base da nossa API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// "Interceptor": um código que roda ANTES de cada requisição ser enviada
// Ele vai pegar o token salvo no localStorage e adicionar nos headers
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;