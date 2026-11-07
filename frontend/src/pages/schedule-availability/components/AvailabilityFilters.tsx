
type AvailabilityFiltersProps = {
    period: AvailabilityPeriod;
    isAvailable: boolean | "";
    onPeriodChange: (value: AvailabilityPeriod) => void;
    onAvailabilityChange: (value: boolean | "") => void;
};

export type AvailabilityPeriod =
    | "today"
    | "week"
    | "month"
    | "all";

export function AvailabilityFilters({
    period,
    isAvailable,
    onPeriodChange,
    onAvailabilityChange,
}: AvailabilityFiltersProps) {
    return (
        <div className="flex flex-col gap-3 border-b border-[#ebe9e1] p-5 sm:flex-row sm:flex-wrap sm:p-6">
            <select
                value={period}
                onChange={(event) =>
                    onPeriodChange(
                        event.target.value as AvailabilityPeriod
                    )
                }
                aria-label="Filtrar por período"
                className="rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-3 py-2.5 text-sm text-[#315344] outline-none focus:border-[#39735b]"
            >
                <option value="today">Hoje</option>
                <option value="week">Próximos 7 dias</option>
                <option value="month">Próximos 30 dias</option>
                <option value="all">Próximos 12 meses</option>
            </select>

            <select
                value={
                    isAvailable === ""
                        ? ""
                        : isAvailable
                          ? "true"
                          : "false"
                }
                onChange={(event) => {
                    const value = event.target.value;

                    if (value === "") {
                        onAvailabilityChange("");
                        return;
                    }

                    onAvailabilityChange(value === "true");
                }}
                aria-label="Filtrar por disponibilidade"
                className="rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-3 py-2.5 text-sm text-[#315344] outline-none focus:border-[#39735b]"
            >
                <option value="">Todos</option>
                <option value="true">Disponíveis</option>
                <option value="false">Indisponíveis</option>
            </select>
        </div>
    );
}