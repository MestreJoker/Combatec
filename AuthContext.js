// contexts/AuthContext.js
import React, { createContext, useState } from 'react';

// Criação do AuthContext
export const AuthContext = createContext();

// Componente Provider para envolver sua aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialize como null ou um objeto com informações do usuário.

  const login = (userData) => {
    setUser(userData); // Define o usuário logado
  };

  const logout = () => {
    setUser(null); // Limpa as informações do usuário
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
