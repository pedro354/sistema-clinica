import { useState, useEffect } from "react";
import api, {
  type Appointment,
  type AppointmentStatus,
  type Patient,
} from "../../services/api";
import { AppointmentForm } from "./components/AppointmentForm";
import {
  AppointmentFilters,
  type AppointmentPeriod,
} from "./components/AppointmentFilters";
import { AppointmentTable } from "./components/AppointmentTable";

async function fetchAppointments(
  period: AppointmentPeriod,
  status: AppointmentStatus | "",
) {
  const startDate = new Date();
  const endDate = new Date();

  if (period === "today") {
    endDate.setHours(23, 59, 59, 999);
  } else if (period === "week") {
    endDate.setDate(startDate.getDate() + 7);
  } else if (period === "month") {
    endDate.setDate(startDate.getDate() + 30);
  } else {
    endDate.setDate(startDate.getDate() + 1);
  }

  const [appointmentData, patientData] = await Promise.all([
    api.getAppointments(1, startDate, endDate, status || undefined),
    api.getPatients(1),
  ]);

  return { appointmentData, patientData };
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AppointmentStatus | "">("");
  const [period, setPeriod] = useState<AppointmentPeriod>("month");

  const loadAppointments = async () => {
    try {
      const { appointmentData, patientData } = await fetchAppointments(
        period,
        status,
      );

      setAppointments(appointmentData);
      setPatients(patientData);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  useEffect(() => {
    let ignore = false;

    fetchAppointments(period, status)
      .then(({ appointmentData, patientData }) => {
        if (ignore) return;

        setAppointments(appointmentData);
        setPatients(patientData);
      })
      .catch((error) => {
        console.error("Erro ao buscar consultas:", error);
      });

    return () => {
      ignore = true;
    };
  }, [period, status]);

  const getPatientName = (patientId: number) => {
    const patient = patients.find(
      (patient) => patient.id === patientId
    );

    return patient?.name ?? "Paciente não encontrado";
  };

  const visibleAppointments = appointments.filter((appointment) => {
    const patientName = getPatientName(appointment.patientId);

    return patientName
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  const handleDelete = async (appointment: Appointment) => {
    const patientName = getPatientName(appointment.patientId);

    const confirmed = window.confirm(
      `Deseja realmente excluir a consulta de ${patientName}?`
    );

    if (!confirmed) return;

    try {
      await api.deleteAppointment(appointment.id);

      await loadAppointments();
    } catch (error) {
      console.error("Erro ao excluir consulta:", error);
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
              Consultas
            </h1>

            <p className="mt-2 text-sm text-[#839087]">
              Acompanhe e organize os atendimentos dos seus pacientes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-[#39735b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2e604b]"
          >
            Nova consulta
          </button>
        </section>

        <section className="mt-8 rounded-2xl border border-[#ebe9e1] bg-white shadow-[0_4px_18px_rgba(50,74,61,0.04)]">
          <AppointmentFilters
            search={search}
            status={status}
            period={period}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onPeriodChange={setPeriod}
          />

          <AppointmentTable
            appointments={visibleAppointments}
            getPatientName={getPatientName}
            onEdit={setEditingAppointment}
            onDelete={handleDelete}
          />
        </section>

        {showForm && (
          <AppointmentForm
            patients={patients}
            onClose={() => setShowForm(false)}
            onSuccess={loadAppointments}
          />
        )}

        {editingAppointment && (
          <AppointmentForm
            appointment={editingAppointment}
            patients={patients}
            onClose={() => setEditingAppointment(null)}
            onSuccess={loadAppointments}
          />
        )}
      </div>
  );
}
