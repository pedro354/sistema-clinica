import type { AppointmentStatus } from "../../../services/api";

export type AppointmentPeriod = "today" | "week" | "month" | "all";

type AppointmentFiltersProps = {
  search: string;
  status: AppointmentStatus | "";
  period: AppointmentPeriod;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AppointmentStatus | "") => void;
  onPeriodChange: (value: AppointmentPeriod) => void;
};

const statusLabels: Record<AppointmentStatus, string> = {
  SCHEDULED: "Agendada",
  COMPLETED: "Concluída",
  CANCELED: "Cancelada",
};

export function AppointmentFilters({
  search,
  status,
  period,
  onSearchChange,
  onStatusChange,
  onPeriodChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#ebe9e1] p-5 sm:flex-row sm:flex-wrap sm:p-6">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar paciente..."
        className="min-w-56 flex-1 rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-2.5 text-sm text-[#315344] outline-none placeholder:text-[#a0aaa4] focus:border-[#39735b]"
      />

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as AppointmentStatus | "")
        }
        aria-label="Filtrar por status"
        className="rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-3 py-2.5 text-sm text-[#315344] outline-none focus:border-[#39735b]"
      >
        <option value="">Todos os status</option>

        {(Object.keys(statusLabels) as AppointmentStatus[]).map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>

      <select
        value={period}
        onChange={(event) =>
          onPeriodChange(event.target.value as AppointmentPeriod)
        }
        aria-label="Filtrar por período"
        className="rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-3 py-2.5 text-sm text-[#315344] outline-none focus:border-[#39735b]"
      >
        <option value="today">Hoje</option>
        <option value="week">Próximos 7 dias</option>
        <option value="month">Próximos 30 dias</option>
        <option value="all">Próximos 12 meses</option>
      </select>
    </div>
  );
}