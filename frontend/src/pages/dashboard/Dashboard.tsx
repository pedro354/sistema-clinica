import { useEffect, useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  Clock3,
  UsersRound,
} from "lucide-react";
import api, { type Patient, type Appointment, type ScheduleAvailability } from "../../services/api";
import { MetricCard } from "./components/MetricCard";
import { UpcomingAppointments } from "./components/UpcomingAppointments";
import { QuickActions } from "./components/QuickActions";




export default function Dashboard() {
  const [user, setUser] = useState<{ id: number, name: string } | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
  const [schedule, setSchedule] = useState<ScheduleAvailability[]>([]);

  const totalAvailableHours = schedule.reduce((total, schedule) => {
    const start = new Date(schedule.startDate).getTime();
    const end = new Date(schedule.endDate).getTime();

    return total + (end - start) / (1000 * 60 * 60);
  }, 0);


  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await api.getUser(1);
        if (currentUser) {
          setUser(currentUser);
        }
        const currentPatients = await api.getPatients(1);
        setPatients(currentPatients);

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const currentAppointment = await api.getAppointments(1, todayStart, todayEnd);
        setAppointment(currentAppointment);

        const upcomingStart = new Date();

        const upcomingEnd = new Date();
        upcomingEnd.setDate(upcomingStart.getDate() + 30);

        const futureAppointments = await api.getUpcomingAppointments(1, upcomingStart, upcomingEnd);
        setUpcomingAppointments(futureAppointments);

        const scheduleStart = new Date();
        scheduleStart.setHours(0, 0, 0, 0);

        const scheduleEnd = new Date();
        scheduleEnd.setHours(23, 59, 59, 999);

        const currentSchedule = await api.getScheduleAvailability(1, scheduleStart, scheduleEnd);

        setSchedule(currentSchedule);

        const today = new Date();

        const weekStart = new Date(today);
        const day = weekStart.getDay();

        const diff = day === 0 ? -6 : 1 - day;

        weekStart.setDate(weekStart.getDate() + diff);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weeklyCompletedAppointments = await api.getAppointments(1, weekStart, weekEnd, "COMPLETED");
        setCompletedAppointments(weeklyCompletedAppointments);

      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    loadUser();
  }, []);


  return (

    <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-[#7b8981]">Quarta-feira, 14 de agosto de 2026</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#244638] sm:text-[34px]">Bom dia, { user?.name } <span aria-hidden="true">🌿</span></h1>
          <p className="mt-2 text-sm text-[#839087]">Tenha um dia tranquilo e produtivo.</p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-xl bg-[#39735b] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(57,115,91,0.18)] transition-colors hover:bg-[#2e604b]">
          <CalendarDays size={ 17 } />
          Nova consulta
        </button>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do dia">
        <MetricCard label="Consultas hoje" value={ appointment.length.toString() } detail="" icon={ CalendarDays } tone="bg-[#e0f0e8]" />
        <MetricCard label="Pacientes ativos" value={ patients.length.toString() } detail="Cadastrados" icon={ UsersRound } tone="bg-[#f4e6d2]" />
        <MetricCard label="Horas disponíveis" value={ `${totalAvailableHours} horas` } detail="Hoje" icon={ Clock3 } tone="bg-[#e4e6f3]" />
        <MetricCard label="Consultas realizadas" value={ completedAppointments.length.toString() } detail="esta semana" icon={ ClipboardList } tone="bg-[#f1e5e0]" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <UpcomingAppointments appointments={ upcomingAppointments } />
        <QuickActions />
      </section>
    </div>


  );
}
