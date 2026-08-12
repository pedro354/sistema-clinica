import { CalendarFold, ChartNoAxesCombined, FolderArchive, UserPlus } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-10 text-center text-2xl font-semibold sm:mb-12">
          Como funciona
        </h2>

        <div className="grid grid-cols-1 gap-8 rounded-[10px] border-t-3 border-[#e6d3a0] shadow-[0_-1px_1px_0_#e6d3a0] sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex flex-col rounded-xl bg-[#f1e8d3] px-6 pb-6 pt-12 shadow-xl shadow-[#d3c8af] ring-2 ring-[#e6d3a0]">
            <UserPlus className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9dba6] py-3 text-orange-700" />
            <div className="flex min-h-30 flex-col items-center justify-center gap-5 text-center">
              <h3 className="text-lg font-bold sm:text-xl">Crie sua conta</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Cadastre sua clínica em poucos minutos e grátis
              </p>
            </div>
          </div>

          <div className="relative flex flex-col rounded-xl bg-[#f1e8d3] px-6 pb-6 pt-12 shadow-xl shadow-[#d3c8af] ring-2 ring-[#e6d3a0]">
            <FolderArchive className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9dba6] py-3 text-orange-700" />
            <div className="flex min-h-30 flex-col items-center justify-center gap-5 text-center">
              <h3 className="text-lg font-bold sm:text-xl">Adicione pacientes</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Cadastre e organize todos os pacientes em um só lugar
              </p>
            </div>
          </div>

          <div className="relative flex flex-col rounded-xl bg-[#f1e8d3] px-6 pb-6 pt-12 shadow-xl shadow-[#d3c8af] ring-2 ring-[#e6d3a0]">
            <CalendarFold className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9dba6] py-3 text-orange-700" />
            <div className="flex min-h-30 flex-col items-center justify-center gap-5 text-center">
              <h3 className="text-lg font-bold sm:text-xl">Gerencie sua agenda</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Defina horários e receba lembretes com praticidade
              </p>
            </div>
          </div>

          <div className="relative flex flex-col rounded-xl bg-[#f1e8d3] px-6 pb-6 pt-12 shadow-xl shadow-[#d3c8af] ring-2 ring-[#e6d3a0]">
            <ChartNoAxesCombined className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9dba6] py-3 text-orange-700" />
            <div className="flex min-h-30 flex-col items-center justify-center gap-5 text-center">
              <h3 className="text-lg font-bold sm:text-xl">Acompanhe consultas</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Registre e acompanhe toda a evolução em detalhes
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
