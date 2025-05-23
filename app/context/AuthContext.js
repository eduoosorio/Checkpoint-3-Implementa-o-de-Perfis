import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    // Adiciona o usuário à lista de usuários, se não existir
    const usuariosStr = await AsyncStorage.getItem('usuarios');
    let usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];
    const jaExiste = usuarios.some(u => u.email === userData.email);
    if (!jaExiste) {
      usuarios.push({
        id: Date.now().toString(),
        nome: userData.nome,
        email: userData.email,
        tipo: userData.tipo
      });
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
  };

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) setUser(JSON.parse(storedUser));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
