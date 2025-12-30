import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cms_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [accounts, setAccounts] = useState(() => {
    const stored = localStorage.getItem('cms_accounts');
    return stored ? JSON.parse(stored) : [];
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    localStorage.setItem('cms_user', user ? JSON.stringify(user) : '');
    localStorage.setItem('cms_accounts', JSON.stringify(accounts));
    localStorage.setItem('cms_is_authenticated', isAuthenticated ? 'true' : 'false');
  }, [user, accounts, isAuthenticated]);

  const login = ({ email, password }) => {
    const match = accounts.find(
      (acct) =>
        acct.email.toLowerCase() === (email || '').toLowerCase() &&
        acct.password === password
    );

    if (match) {
      setUser({ name: match.name, email: match.email });
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password.' };
  };

  const signup = ({ name, email, password }) => {
    const exists = accounts.some(
      (acct) => acct.email.toLowerCase() === (email || '').toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'Account already exists with this email.' };
    }
    const newAccount = { name, email, password };
    setAccounts((prev) => [...prev, newAccount]);
    setUser({ name, email });
    return { success: true };
  };

  const googleLogin = ({ name, email }) => {
    setUser({ name, email, provider: 'google' });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      signup,
      googleLogin,
      logout,
    }),
    [isAuthenticated, user, accounts]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
