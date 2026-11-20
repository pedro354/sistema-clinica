import { createContext } from "react";
import type { User } from "../services/api"

export type AuthContextData = {
    user: User | null; // guarda os dados do usuário ou null quando não existe usuário autenticado.
    isAuthenticated: boolean; // informa se o usuário está autenticado
    isLoading: boolean; // informa se a aplicação está verificando o estado da autenticação.
    setAuthenticatedUser: (user: User) => void; // recebe um usuário como parâmetro para atualizar o estado.
    logout: () => void; // representa a operação de encerramento da autenticação.
}

export const AuthContext = createContext<AuthContextData | null>(null) // Crie um contexto chamado AuthContext, cujo valor seguirá o contrato AuthContextData, mas que inicialmente poderá ser null