import { Pencil } from "lucide-react";
import type {
    Appointment,
    ScheduleAvailability,
} from "../../../services/api";

type PlannerTimelineProps = {
    appointments: Appointment[];
    availabilities: ScheduleAvailability[];
    onEdit: (appointment: Appointment) => void;
};

const formatTime = (value: Date | string) => {
    return new Date(value).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getMinutesFromMidnight = (value: Date | string) => {
    const date = new Date(value);

    return date.getHours() * 60 + date.getMinutes();
};

export function PlannerTimeline({
    appointments,
    availabilities,
    onEdit
}: PlannerTimelineProps) {
    if (
        appointments.length === 0 &&
        availabilities.length === 0
    ) {
        return (
            <div className="py-10 text-center text-sm text-[#839087]">
                Nenhuma informação disponível para este dia.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            { availabilities.map((availability) => {
                const startMinutes = getMinutesFromMidnight(
                    availability.startDate
                );

                const endMinutes = getMinutesFromMidnight(
                    availability.endDate
                );

                const availabilityAppointments = appointments
                    .filter((appointment) => {
                        const appointmentMinutes =
                            getMinutesFromMidnight(appointment.date);

                        return (
                            appointmentMinutes >= startMinutes &&
                            appointmentMinutes <= endMinutes
                        );
                    })
                    .sort(
                        (first, second) =>
                            getMinutesFromMidnight(first.date) -
                            getMinutesFromMidnight(second.date)
                    );

                return (
                    <div
                        key={ availability.id }
                        className="rounded-2xl border border-[#dcebe3] bg-[#f3f8f5] p-5"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[#315344]">
                                    Horário disponível
                                </p>

                                <p className="mt-1 text-xs text-[#60766b]">
                                    { formatTime(availability.startDate) }
                                    { " — " }
                                    { formatTime(availability.endDate) }
                                </p>

                            </div>

                            <span className="rounded-full bg-[#e0f0e8] px-3 py-1 text-xs font-semibold text-[#39735b]">
                                Disponível
                            </span>
                        </div>

                        <div className="relative mt-5 space-y-3 border-l border-[#cbded4] pl-5">
                            { availabilityAppointments.length === 0 ? (
                                <div className="relative">
                                    <span className="absolute -left-[25px] top-2 h-2.5 w-2.5 rounded-full bg-[#39735b]" />

                                    <p className="text-sm text-[#60766b]">
                                        Nenhuma consulta agendada neste
                                        período.
                                    </p>
                                </div>
                            ) : (
                                availabilityAppointments.map(
                                    (appointment) => (
                                        <div
                                            key={ appointment.id }
                                            className="relative rounded-xl border border-[#ebe9e1] bg-white p-4 shadow-[0_2px_8px_rgba(50,74,61,0.03)]"
                                        >
                                            <span className="absolute -left-[25px] top-5 h-2.5 w-2.5 rounded-full bg-[#39735b]" />

                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-[#315344]">
                                                        { formatTime(appointment.date) }
                                                    </p>

                                                    <p className="mt-1 text-sm text-[#60766b]">
                                                        { appointment.patient?.name ??
                                                            `Consulta #${appointment.id}` }
                                                    </p>

                                                    { appointment.description && (
                                                        <p className="mt-1 text-xs text-[#839087]">
                                                            { appointment.description }
                                                        </p>
                                                    ) }
                                                </div>

                                                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                                                    <button
                                                        type="button"
                                                        onClick={ () => onEdit(appointment) }
                                                        className="shrink-0 rounded-lg p-2 text-[#71857b] transition hover:bg-[#f3f8f5] hover:text-[#39735b]"
                                                        aria-label="Editar consulta"
                                                    >
                                                        <Pencil className="size-5" />
                                                    </button>

                                                    <span className="w-fit rounded-full bg-[#e0f0e8] px-3 py-1 text-xs font-semibold text-[#39735b]">
                                                        { appointment.status === "SCHEDULED"
                                                            ? "Agendada"
                                                            : appointment.status === "COMPLETED"
                                                                ? "Concluída"
                                                                : "Cancelada" }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                )
                            ) }
                        </div>
                    </div>
                );
            }) }
        </div>
    );
}