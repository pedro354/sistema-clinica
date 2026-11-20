import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { AuthContext } from "../contexts/AuthContext"
import type { User } from "../services/api"
import type { AuthContextData } from "../contexts/AuthContext"

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User | null> (null)
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated  = user !== null

    
    const logout = () => {
        setUser(null)
    }
    function setAuthenticatedUser(authenticatedUser: User){
        setUser(authenticatedUser)
    }
    
    const contextValue: AuthContextData = {
    user,
    isAuthenticated,
    isLoading,
    setAuthenticatedUser,
    logout
}
    useEffect(() => {
        const connection = createContext(AuthContext)
    })

    return(
        <AuthContext.Provider value= {contextValue}>
            {children}
        </AuthContext.Provider>
    )
}