import { CalendarFold, ChartNoAxesCombined, FolderArchive, UserPlus } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function HowItWorks(   ){
    return(
        <section className="py-16">
  <Container>
    <h2 className="text-center text-2xl font-semibold mb-12">
      Como funciona
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center shadow-[0_-1px_1px_0_#e6d3a0] border-t-3 border-[#e6d3a0] rounded-[10px] ">

      <div className="p-6 bg-[#f1e8d3] rounded-xl shadow-xl ring-2 ring-[#e6d3a0] shadow-[#d3c8af] flex flex-col ">
        <UserPlus className="relative bottom-12 left-22 w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <div className="flex flex-col items-center h-30 justify-center gap-5">
        <h1 className="font-bold text-xl mb-2">Crie sua conta</h1>
                <p className="text-sm text-gray-600">
Cadastre sua clínica em poucos minutos e grátis        </p>
      </div>
      </div>
            <div className="p-6 bg-[#f1e8d3] rounded-xl shadow-xl ring-2 ring-[#e6d3a0] shadow-[#d3c8af] flex flex-col ">
        <FolderArchive className="relative bottom-12 left-22 w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <div className="flex flex-col items-center h-30 justify-center gap-5">
        <h1 className="font-bold text-xl mb-2">Adicione pacientes</h1>
                <p className="text-sm text-gray-600">
Cadastre e organize todos os pacientes em um só lugar        </p>
      </div>
      </div>
      <div className="p-6 bg-[#f1e8d3] rounded-xl shadow-xl ring-2 ring-[#e6d3a0] shadow-[#d3c8af] flex flex-col ">
        <CalendarFold className="relative bottom-12 left-22 w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <div className="flex flex-col items-center h-30 justify-center gap-5">
        <h1 className="font-bold text-xl mb-2">Gerencie sua agenda</h1>
                <p className="text-sm text-gray-600">
Defina horários e receba lembretes com praticidade        </p>
      </div>
      </div>
      <div className="p-6 bg-[#f1e8d3] rounded-xl shadow-xl ring-2 ring-[#e6d3a0] shadow-[#d3c8af] flex flex-col ">
        <ChartNoAxesCombined className="relative bottom-12 left-22 w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <div className="flex flex-col items-center h-30 justify-center gap-5">
        <h1 className="font-bold text-xl mb-2">Acompanhe consultas</h1>
                <p className="text-sm text-gray-600">
Registre e acompanhe toda a evolução em detalhes        </p>
      </div>
      </div>

      


    </div>
  </Container>
</section>
    )
}