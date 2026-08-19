import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type {
  Appointment,
  AppointmentStatus,
} from "../../../services/api";

type AppointmentTableProps = {
  appointments: Appointment[];
  getPatientName: (patientId: number) => string;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
};

const statusLabels: Record<AppointmentStatus, string> = {
  SCHEDULED: "Agendada",
  COMPLETED: "Concluída",
  CANCELED: "Cancelada",
};

const statusStyles: Record<AppointmentStatus, string> = {
  SCHEDULED: "bg-[#e0f0e8] text-[#39735b]",
  COMPLETED: "bg-[#e4e6f3] text-[#53618e]",
  CANCELED: "bg-[#f4e6e6] text-[#a63838]",
};

const formatDate = (value: Date | string) => {
  return new Date(value).toLocaleDateString("pt-BR");
};

const formatTime = (value: Date | string) => {
  return new Date(value).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function AppointmentTable({
  appointments,
  getPatientName,
  onEdit,
  onDelete,
}: AppointmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-180">
        <thead>
          <tr className="border-b border-[#ebe9e1] text-left">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
              Data e horário
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
              Paciente
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
              Status
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
              Descrição
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-b border-[#f0eee8] last:border-b-0 hover:bg-[#fffdf8]"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[#39735b]">
                    <CalendarDays size={17} />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#315344]">
                      {formatDate(appointment.date)}
                    </p>

                    <p className="text-xs text-[#839087]">
                      {formatTime(appointment.date)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm font-semibold text-[#315344]">
                {getPatientName(appointment.patientId)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[appointment.status]
                  }`}
                >
                  {statusLabels[appointment.status]}
                </span>
              </td>

              <td className="max-w-xs truncate px-6 py-4 text-sm text-[#60766b]">
                {appointment.description || "—"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(appointment)}
                    aria-label={`Editar consulta de ${getPatientName(
                      appointment.patientId
                    )}`}
                    className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#e0f0e8] hover:text-[#39735b]"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(appointment)}
                    aria-label={`Excluir consulta de ${getPatientName(
                      appointment.patientId
                    )}`}
                    className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#f4e6e6] hover:text-[#a63838]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}