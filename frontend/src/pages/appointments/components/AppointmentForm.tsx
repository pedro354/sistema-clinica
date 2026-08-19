import { useState } from "react";
import api, { type Appointment, type AppointmentStatus, type Patient } from "../../../services/api";

type AppointmentFormProps = {
    appointment?: Appointment;
    patients: Patient[];
    onClose: () => void;
    onSuccess: () => Promise<void>;
};
const formatInputDate = (value: Date | string) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const formatInputTime = (value: Date | string) => {
    return new Date(value).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
export function AppointmentForm({
    appointment,
    patients,
    onClose,
    onSuccess,
}: AppointmentFormProps) {
    const [patientId, setPatientId] = useState(appointment?.patientId.toString() ?? "");

    const [date, setDate] = useState(appointment ? formatInputDate(appointment.date) : "");

    const [time, setTime] = useState(appointment ? formatInputTime(appointment.date) : "");

    const [description, setDescription] = useState(appointment?.description ?? "");

    const [status, setStatus] = useState<AppointmentStatus>(appointment?.status ?? "SCHEDULED");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            const appointmentDate = new Date(
                `${date}T${time}:00`
            ).toISOString();

            if (appointment) {
                await api.updateAppointment(appointment.id, {
                    patientId: Number(patientId),
                    date: appointmentDate,
                    description: description.trim() || undefined,
                    status,
                });
            } else {
                await api.createAppointment({
                    userId: 1,
                    patientId: Number(patientId),
                    date: appointmentDate,
                    ...(description.trim()
                        ? { description: description.trim() }
                        : {}),
                });
            }

            await onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar consulta:", error);
            setError("Não foi possível salvar a consulta.");
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
                            { appointment ? "Editar consulta" : "Nova consulta" }
                        </h2>

                        <p className="mt-1 text-sm text-[#839087]">
                            { appointment
                                ? "Atualize os dados da consulta."
                                : "Agende um novo atendimento." }
                        </p>
                    </div>

                </div>

                <form onSubmit={ handleSubmit } className="mt-6 space-y-5">
                    <div>
                        <label
                            htmlFor="patient"
                            className="mb-2 block text-sm font-medium text-[#315344]"
                        >
                            Paciente
                        </label>

                        <select
                            id="patient"
                            value={ patientId }
                            onChange={ (event) => setPatientId(event.target.value) }
                            required
                            className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                        >
                            <option value="">Selecione um paciente</option>

                            { patients.map((patient) => (
                                <option key={ patient.id } value={ patient.id }>
                                    { patient.name }
                                </option>
                            )) }
                        </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="date"
                                className="mb-2 block text-sm font-medium text-[#315344]"
                            >
                                Data
                            </label>

                            <input
                                id="date"
                                type="date"
                                value={ date }
                                onChange={ (event) => setDate(event.target.value) }
                                required
                                className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="time"
                                className="mb-2 block text-sm font-medium text-[#315344]"
                            >
                                Horário
                            </label>

                            <input
                                id="time"
                                type="time"
                                value={ time }
                                onChange={ (event) => setTime(event.target.value) }
                                required
                                className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-[#315344]"
                        >
                            Descrição{ " " }
                            <span className="font-normal text-[#9aa49e]">
                                (opcional)
                            </span>
                        </label>

                        <textarea
                            id="description"
                            value={ description }
                            onChange={ (event) => setDescription(event.target.value) }
                            rows={ 3 }
                            placeholder="Ex.: sessão de acompanhamento"
                            className="w-full resize-none rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                        />
                    </div>

                    { error && (
                        <p
                            role="alert"
                            className="rounded-xl bg-[#f4e6e6] px-4 py-3 text-sm text-[#a63838]"
                        >
                            { error }
                        </p>
                    ) }

                    { appointment && (
                        <div>
                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-medium text-[#315344]"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                value={ status }
                                onChange={ (event) =>
                                    setStatus(event.target.value as AppointmentStatus)
                                }
                                className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
                            >
                                <option value="SCHEDULED">Agendada</option>
                                <option value="COMPLETED">Concluída</option>
                                <option value="CANCELED">Cancelada</option>
                            </select>
                        </div>
                    ) }
                                        <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={ onClose }
                            className="rounded-xl px-4 py-3 text-sm font-semibold text-[#60766b] hover:bg-[#f3f2eb]"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={ loading }
                            className="rounded-xl bg-[#39735b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2e604b] disabled:cursor-not-allowed disabled:opacity-60">
                            {loading ? "Salvando..." : appointment ? "Salvar alterações" : "Agendar consulta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}