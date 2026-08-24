import { CalendarDays, FileText, MessageCircle, PanelLeftOpen, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

export function QuickActions(){
    return(
                  <article className="rounded-2xl border border-[#ebe9e1] bg-[#eaf3ed] p-5 shadow-[0_4px_18px_rgba(50,74,61,0.04)] sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-[#2b5141]">Acesso rápido</p>
                  <PanelLeftOpen size={18} className="text-[#69907c]" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <NavLink to="/patients">
                  <button className="flex min-h-24 w-full flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><UserRound size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Novo paciente</span></button>
                  </NavLink>
                  <NavLink to="/reports">
                  <button className="flex w-full min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><FileText size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Laudos</span></button>
                  </NavLink>
                  <NavLink to="/appointments">
                  <button className="flex w-full min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><CalendarDays size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Nova Consulta</span></button>
                  </NavLink>
                  <NavLink to="scheduleavailability">
                  <button className="flex w-full min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><MessageCircle size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Disponibilidade</span></button>
                  </NavLink>
                </div>
              </article>

    )
}