import { ChevronRight } from "lucide-react";
import { type Appointment } from "../../../services/api";

type UpcomingAppointmentProps = {
  appointments: Appointment[  ];
};



export function UpcomingAppointments({appointments}: UpcomingAppointmentProps){
    return(
                  <article className="rounded-2xl border border-[#ebe9e1] bg-white p-5 shadow-[0_4px_18px_rgba(50,74,61,0.04)] sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#2b5141]">Próximas consultas</p>
                    <p className="mt-1 text-xs text-[#8a968f]">Sua agenda dos próximos dias</p>
                  </div>
                  <button className="text-xs font-semibold text-[#39735b] hover:text-[#1d4f3f]">Ver agenda</button>
                </div>
                <div className="mt-5 divide-y divide-[#f0eee8]">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <time className="w-12 text-sm font-semibold text-[#60766b]">
                        <span className="block">
                        {new Date(appointment.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit"
                        })}
                        </span>
                        <span className="block">
                          {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                        </time>

                      <span className={`flex h-10 items-center justify-center rounded-full text-xs font-semibold text-[#47705d] bg-[#ffebcd] w-10`}>
                        {appointment.patient?.name.split(" ").map((word) => word[0]).join("").toUpperCase()}

                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#315344]">{appointment.patient?.name}</p>
                        <p className="mt-1 text-xs text-[#929d96]">{appointment.description}</p>
                      </div>
                      <button aria-label={`Abrir consulta de ${appointment.patient?.name}`} className="text-[#a2ada6] hover:text-[#39735b]"><ChevronRight size={17} /></button>
                    </div>
                  ))}
                </div>
              </article>

    )
    }