import { useEffect, useState } from "react";
import api, {
    type ScheduleAvailability,
} from "../../services/api";
import { AvailabilityTable } from "./components/AvailabilityTable";
import { AvailabilityForm } from "./components/AvailabilityForm";
import axios from "axios";

export default function ScheduleAvailability() {
    const [availabilities, setAvailabilities] = useState<ScheduleAvailability[]>([]);

    const [showForm, setShowForm] = useState(false);
    const [editingAvailability, setEditingAvailability] =
        useState<ScheduleAvailability | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAvailabilities = async () => {
        try {
            setLoading(true);
            setError("");

            const startDate = new Date();
            const endDate = new Date();

            endDate.setFullYear(startDate.getFullYear() + 1);

            const data = await api.getScheduleAvailability(
                1,
                startDate,
                endDate
            );

            setAvailabilities(data);
        } catch (error) {
            console.error(
                "Erro ao buscar disponibilidades:",
                error
            );

            setError(
                "Não foi possível carregar as disponibilidades."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        api.getScheduleAvailability(
            1,
            new Date(),
            new Date(
                new Date().setFullYear(
                    new Date().getFullYear() + 1
                )
            )
        )
            .then((data) => {
                if (ignore) return;

                setAvailabilities(data);
            })
            .catch((error) => {
                if (ignore) return;

                console.error(
                    "Erro ao buscar disponibilidades:",
                    error
                );

                setError(
                    "Não foi possível carregar as disponibilidades."
                );
            })
            .finally(() => {
                if (!ignore) {
                    setLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, []);


  const handleDelete = async (schedule: ScheduleAvailability) => {
    const confirmed = window.confirm(
      `Deseja realmente excluir esta disponibilidade?`
    );

    if (!confirmed) return;

    try {
      await api.deleteScheduleAvailability(schedule.id);

      await loadAvailabilities();
    } catch (error) {
    console.error("Erro ao excluir disponibilidade:", error);

    if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Respostaa:", error.response?.data);
    }
}
  };

    return (
        <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-[#7b8981]">
                        Agenda da clínica
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#244638]">
                        Disponibilidade
                    </h1>

                    <p className="mt-2 text-sm text-[#839087]">
                        Configure os horários disponíveis para atendimento.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="rounded-xl bg-[#39735b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2e604b]"
                >
                    + Nova disponibilidade
                </button>
            </section>

            <section className="mt-8 rounded-2xl border border-[#ebe9e1] bg-white shadow-[0_4px_18px_rgba(50,74,61,0.04)]">
                {error && (
                    <p
                        role="alert"
                        className="m-5 rounded-xl bg-[#f4e6e6] px-4 py-3 text-sm text-[#a63838]"
                    >
                        {error}
                    </p>
                )}

                {loading ? (
                    <div className="px-6 py-12 text-center text-sm text-[#60766b]">
                        Carregando disponibilidades...
                    </div>
                ) : (
                    <AvailabilityTable
                        availabilities={availabilities}
                        onEdit={setEditingAvailability}
                        onDelete={handleDelete}
                    />
                )}
            </section>

            {showForm && (
                <AvailabilityForm
                    onClose={() => setShowForm(false)}
                    onSuccess={loadAvailabilities}
                />
            )}

            {editingAvailability && (
                <AvailabilityForm
                    availability={editingAvailability}
                    onClose={() => setEditingAvailability(null)}
                    onSuccess={loadAvailabilities}
                />
            )}
        </div>
    );
}
