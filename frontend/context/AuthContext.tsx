"use client"

import React from 'react'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(saved);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);