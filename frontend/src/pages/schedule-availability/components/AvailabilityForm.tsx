import { useState } from "react";
import api, {
    type ScheduleAvailability,
} from "../../../services/api";
import axios from "axios";

type AvailabilityFormProps = {
    availability?: ScheduleAvailability;
    onClose: () => void;
    onSuccess: () => Promise<void>;
};

const formatInputDateTime = (value: Date | string) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function AvailabilityForm({
    availability,
    onClose,
    onSuccess,
}: AvailabilityFormProps) {
    const [startDate, setStartDate] = useState(
        availability
            ? formatInputDateTime(availability.startDate)
            : ""
    );

    const [endDate, setEndDate] = useState(
        availability
            ? formatInputDateTime(availability.endDate)
            : ""
    );

    const [isAvailable, setIsAvailable] = useState(
        availability?.isAvailable ?? true
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!startDate || !endDate) {
            setError(
                "Preencha a data e o horário de início e fim."
            );
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            setError(
                "A data de início deve ser anterior à data de fim."
            );
            return;
        }

        if (start <= new Date()) {
            setError(
                "A disponibilidade deve começar no futuro."
            );
            return;
        }

        try {
            setLoading(true);

            if (availability) {
                await api.updateScheduleAvailability(
                    availability.id,
                    {
                        startDate: start.toISOString(),
                        endDate: end.toISOString(),
                        isAvailable,
                    }
                );
            } else {
                await api.createScheduleAvailability({
                    userId: 1,
                    startDate: start.toISOString(),
                    endDate: end.toISOString(),
                    isAvailable,
                });
            }

            await onSuccess();
            onClose();
        } catch (error) {
    console.error("Erro ao salvar disponibilidade:", error);

    if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Resposta:", error.response?.data);
    }

    setError(
        "Não foi possível salvar a disponibilidade. Verifique os dados e tente novamente."
    );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#19372c]/30 px-5 py-6">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#244638]">
                            {availability
                                ? "Editar disponibilidade"
                                : "Nova disponibilidade"}
                        </h2>

                        <p className="mt-1 text-sm text-[#839087]">
                            {availability
                                ? "Atualize os dados do horário."
                                : "Cadastre um novo horário disponível."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar formulário"
                        className="rounded-lg p-2 text-[#7b8981] hover:bg-[#f3f2eb]"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="startDate"
                            className="mb-2 block text-sm font-medium text-[#315344]"
                        >
                            Início
                        </label>

                        <input
                            id="startDate"
                            type="datetime-local"
                            value={startDate}
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="endDate"
                            className="mb-2 block text-sm font-medium text-[#315344]"
                        >
                            Fim
                        </label>

                        <input
                            id="endDate"
                            type="datetime-local"
                            value={endDate}
                            onChange={(event) =>
                                setEndDate(event.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="isAvailable"
                            className="mb-2 block text-sm font-medium text-[#315344]"
                        >
                            Status
                        </label>

                        <select
                            id="isAvailable"
                            value={isAvailable ? "true" : "false"}
                            onChange={(event) =>
                                setIsAvailable(
                                    event.target.value === "true"
                                )
                            }
                            className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                        >
                            <option value="true">
                                Disponível
                            </option>

                            <option value="false">
                                Indisponível
                            </option>
                        </select>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-xl bg-[#f4e6e6] px-4 py-3 text-sm text-[#a63838]"
                        >
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-3 text-sm font-semibold text-[#60766b] hover:bg-[#f3f2eb]"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-[#39735b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2e604b] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Salvando..."
                                : availability
                                  ? "Salvar alterações"
                                  : "Cadastrar disponibilidade"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}