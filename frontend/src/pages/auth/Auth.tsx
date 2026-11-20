import { useState } from "react";
import { FaCalendarAlt, FaCog, FaRegChartBar, FaUsers } from "react-icons/fa";
import { AuthFormLogin } from "./AuthFormLogin";
import { AuthFormAccount } from "./AuthFormAccount";

export function Auth() {
    const [mode, setMode] = useState(true);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#F5F5F5] p-6">
            <div className="flex h-[85vh] w-4/5 max-w-7xl flex-row overflow-hidden rounded-xl bg-white shadow-xl">

                <div className="relative flex w-1/2 items-center justify-center">
                    <img
                        src="../../../design/consultorio.png"
                        alt="Consultório médico"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 rounded-xl bg-blue-950/60">
                        <div className="flex h-full flex-col justify-center p-12 text-white">

                            <img
                                src="../../../design/coracao.png"
                                alt="Clinic System"
                                width={80}
                                className="mb-5"
                            />

                            <h1 className="pb-3 text-5xl font-bold">
                                Clinic System
                            </h1>

                            <p className="text-xl font-medium">
                                Gestão clínica de forma simples e eficiente.
                            </p>

                            <ul className="mt-10 flex flex-col gap-5 text-lg font-light">
                                <li className="flex items-center gap-3">
                                    <FaCalendarAlt />
                                    Agendamento
                                </li>

                                <li className="flex items-center gap-3">
                                    <FaUsers />
                                    Pacientes
                                </li>

                                <li className="flex items-center gap-3">
                                    <FaRegChartBar />
                                    Relatórios
                                </li>

                                <li className="flex items-center gap-3">
                                    <FaCog />
                                    Muito mais!
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <div className="flex w-1/2 items-center justify-center p-10">
                    {mode ? (
                        <AuthFormLogin onSwitchMode={() => setMode(false)} 
                        />
                    ) : (
                        <AuthFormAccount onSwitchMode={() => setMode(true)} />
                    )}
                </div>

            </div>
        </div>
    );
}