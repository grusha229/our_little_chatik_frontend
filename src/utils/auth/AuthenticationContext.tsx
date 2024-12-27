import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface IAuthContext {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void,
}

// Создаем контекст
const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export interface IProps {
    children: ReactNode;
  };
  

// Компонент, который оборачивает приложение и предоставляет контекст
export default function AuthProvider({ children }: IProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Хук для работы с контекстом аутентификации */
export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };