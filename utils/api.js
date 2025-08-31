import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const loginAluno = (data) => api.post('/login/aluno', data);
export const loginAdmin = (data) => api.post('/login/admin', data);
export const loginDiretor = (data) => api.post('/login/diretor', data);

// Outras funções de API podem ser adicionadas aqui
