import { useEffect, useState } from "react";
import api, {
    type ScheduleAvailability,
    type Appointment,
    type Patient,
} from "../../services/api";
import { PlannerTimeline } from "./components/PlannerTimeline";
import { AppointmentForm } from "../appointments/components/AppointmentForm";

async function fetchPlannerData(date: Date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const [appointmentData, availabilityData, patientData] = await Promise.all([
        api.getAppointments(1, startDate, endDate),
        api.getScheduleAvailability(1, startDate, endDate),
        api.getPatients(1)
    ]);
    console.log("AVAILABILITY RESULT:", availabilityData);
    console.log("PLANNER REQUEST:", {
        startDate,
        endDate,
    });
    console.log("PLANNER RESPONSE:", {
        appointmentData,
        availabilityData,
    });


    return { appointmentData, availabilityData, patientData };
}

export default function Planner() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [availabilities, setAvailabilities] = useState<ScheduleAvailability[]>([])
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
    const [patients, setPatients] = useState<Patient[]>([])

    const loadAppointments = async (date: Date) => {
        try {
            const { appointmentData, availabilityData } =
                await fetchPlannerData(date);
            const patientData = await api.getPatients(8)

            setPatients(patientData)
            setAppointments(appointmentData);
            setAvailabilities(availabilityData);
        } catch (error) {
            console.error("Erro ao carregar planner:", error);
        }
    };

    const handleDateChange = async (date: Date) => {
        setSelectedDate(date);
        await loadAppointments(date);
    };

    const goToPreviousDay = async () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - 1);

        await handleDateChange(date);
    };

    const goToNextDay = async () => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 1);

        await handleDateChange(date);
    };

    const goToToday = async () => {
        await handleDateChange(new Date());
    };

    const isToday = (date: Date) => {
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    useEffect(() => {
        let ignore = false;

        fetchPlannerData(new Date())

            .then(({ appointmentData, availabilityData, patientData }) => {
                if (ignore) return;

                setAppointments(appointmentData);
                setAvailabilities(availabilityData);
                setPatients(patientData)
            })
            .catch((error) => {
                if (ignore) return;

                console.error("Erro ao carregar planner:", error);
            });
        return () => {
            ignore = true;
        };
    }, []);
    return (
        <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-[#7b8981]">
                        Agenda da clínica
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#244638]">
                        Agenda
                    </h1>

                    <p className="mt-2 text-sm text-[#839087]">
                        Acompanhe os atendimentos e horários disponíveis.
                    </p>
                </div>
            </section>

            <section className="mt-8 rounded-2xl border border-[#ebe9e1] bg-white shadow-[0_4px_18px_rgba(50,74,61,0.04)]">
                <div className="flex items-center justify-between border-b border-[#ebe9e1] p-5 sm:p-6">
                    <button
                        type="button"
                        onClick={ goToPreviousDay }
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-[#60766b] hover:bg-[#f3f2eb]"
                    >
                        Anterior
                    </button>

                    <div className="text-center">
                        <p className="text-sm font-semibold capitalize text-[#315344] ">
                            <span className="sm:hidden">
                                { selectedDate.toLocaleDateString("pt-BR", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                }) }
                            </span>

                            <span className="hidden sm:inline">
                                { selectedDate.toLocaleDateString("pt-BR", {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "long",
                                }) }
                            </span>

                        </p>

                        <button
                            type="button"
                            onClick={ goToToday }
                            className="mt-1 text-xs font-semibold text-[#39735b] hover:underline"
                        >
                            <p className="mt-1 text-xs font-semibold text-[#39735b]">
                                { isToday(selectedDate) ? "Hoje" : "" }
                            </p>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={ goToNextDay }
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-[#60766b] hover:bg-[#f3f2eb]"
                    >
                        Próximo
                    </button>
                </div>
                <PlannerTimeline appointments={ appointments } availabilities={ availabilities } onEdit={ setEditingAppointment } />

            </section>
            { editingAppointment && (
                <AppointmentForm
                    appointment={ editingAppointment }
                    patients={ patients }
                    onClose={ () => setEditingAppointment(null) }
                    onSuccess={ async () => {
                        setEditingAppointment(null);
                        await loadAppointments(selectedDate);
                    } }
                />
            ) }
            
        </div>

    );
}
