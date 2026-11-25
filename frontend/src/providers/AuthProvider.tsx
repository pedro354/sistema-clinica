import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "../contexts/AuthContext";
import type { AuthContextData } from "../contexts/AuthContext";

import api, { type User } from "../services/api";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verifica se existe um usuário autenticado.
    const isAuthenticated = user !== null;

    // Atualiza o usuário após o login.
    function setAuthenticatedUser(authenticatedUser: User) {
        setUser(authenticatedUser);
        setIsLoading(false);
    }

    // Encerra a autenticação no contexto.
async function logout() {
    try {
        await api.logout();
    } finally {
        setUser(null);
    }
}
    // Recupera a sessão existente quando a aplicação inicia.
    useEffect(() => {
        let active = true;

        async function restoreSession() {
            try {
                const currentUser = await api.getSession();

                if (active) {
                    setUser(currentUser);
                }
            } catch (error) {
                // Não existe uma sessão válida.
                if (active) {
                    setUser(null);
                }

                console.error("Erro ao recuperar sessão:", error);
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        }

        restoreSession();

        return () => {
            active = false;
        };
    }, []);

    const contextValue: AuthContextData = {
        user,
        isAuthenticated,
        isLoading,
        setAuthenticatedUser,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}