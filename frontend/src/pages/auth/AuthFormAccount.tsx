import React, { useState } from "react";
import api from "../../services/api";

type AuthFormAccountProps = {
    onSwitchMode: () => void;
};

export function AuthFormAccount({ onSwitchMode }: AuthFormAccountProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
        };

        try {
            await api.register(data)
            onSwitchMode();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex w-full gap-1 rounded-lg bg-slate-100 p-1 mb-6">
                <button
                    type="button"
                    onClick={onSwitchMode}
                    className="flex-1 rounded-md py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                >
                    Entrar
                </button>

                <button
                    type="button"
                    className="flex-1 rounded-md bg-[#153F68] py-2.5 text-sm font-semibold text-white shadow-sm"
                >
                    Criar conta
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Crie sua conta
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Preencha os campos abaixo para criar sua conta.
                </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Digite seu nome"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

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

                <button
                    type="submit"
                    className="w-full rounded-lg bg-[#17609A] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#124C7C] active:scale-[0.99]"
                >
                    Criar conta
                </button>
            </form>
        </div>
    );
}