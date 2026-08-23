import { CalendarDays, Pencil, Trash } from "lucide-react";
import type { ScheduleAvailability } from "../../../services/api";

type AvailabilityTableProps = {
    availabilities: ScheduleAvailability[];
    onEdit: (availability: ScheduleAvailability) => void;
    onDelete: (availability: ScheduleAvailability) => void;
};
const formatDateTime = (value: Date | string) => {
    return new Date(value).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
};

export function AvailabilityTable({
    availabilities,
    onEdit,
    onDelete
}: AvailabilityTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
                <thead>
                    <tr className="border-b border-[#ebe9e1] text-left">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                            Início
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                            Fim
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                            Status
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {availabilities.map((availability) => (
                        <tr
                            key={availability.id}
                            className="border-b border-[#f0eee8] last:border-b-0 hover:bg-[#fffdf8]"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[#39735b]">
                                        <CalendarDays size={17} />
                                    </span>

                                    <span className="text-sm font-semibold text-[#315344]">
                                        {formatDateTime(
                                            availability.startDate
                                        )}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-[#60766b]">
                                {formatDateTime(availability.endDate)}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={
                                        availability.isAvailable
                                            ? "rounded-full bg-[#e0f0e8] px-3 py-1 text-xs font-semibold text-[#39735b]"
                                            : "rounded-full bg-[#f4e6e6] px-3 py-1 text-xs font-semibold text-[#a63838]"
                                    }
                                >
                                    {availability.isAvailable
                                        ? "Disponível"
                                        : "Indisponível"}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEdit(availability)
                                        }
                                        aria-label="Editar disponibilidade"
                                        className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#e0f0e8] hover:text-[#39735b]"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(availability)}
                    aria-label={"Excluir a disponibilidade?"}
                                        className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#e0f0e8] hover:text-[#39735b]"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!availabilities.length && (
                <div className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-[#60766b]">
                        Nenhuma disponibilidade encontrada.
                    </p>

                    <p className="mt-1 text-xs text-[#929d96]">
                        Cadastre um novo horário para começar.
                    </p>
                </div>
            )}
        </div>
    );
}