import React, { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type AuthFormLoginProps = {
    onSwitchMode: () => void;
};


export function AuthFormLogin({ onSwitchMode }: AuthFormLoginProps) {
    // Permite navegar para outra rota após a autenticação.

// Obtém a função responsável por atualizar o usuário autenticado.

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setAuthenticatedUser } = useAuth();
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            const response = await api.login(data);
                setAuthenticatedUser(response.user);
                        navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex w-full gap-1 rounded-lg bg-slate-100 p-1 mb-6">
                <button
                    type="button"
                    className="flex-1 rounded-md bg-[#153F68] py-2.5 text-sm font-semibold text-white shadow-sm"
                >
                    Entrar
                </button>

                <button
                    type="button"
                    onClick={onSwitchMode}
                    className="flex-1 rounded-md py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                >
                    Criar conta
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Bem-vindo de volta!
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Acesse sua conta para continuar.
                </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-700 transition hover:text-blue-900"
                    >
                        Esqueceu sua senha?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-[#17609A] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#124C7C] active:scale-[0.99]"
                >

                    Entrar
                </button>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                Ainda não possui uma conta?{" "}
                <button
                    type="button"
                    onClick={onSwitchMode}
                    className="font-semibold text-blue-700 transition hover:text-blue-900"
                >
                    Criar conta
                </button>
            </div>
        </div>
    );
}