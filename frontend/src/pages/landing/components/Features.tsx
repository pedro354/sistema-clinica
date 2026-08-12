import { CalendarCheck2, ClipboardPen, Cookie, UsersRound } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Features(){
    return (
<section className="py-16">
  <Container>
    <h2 className="text-center text-2xl font-semibold mb-12">
      Tudo em um só lugar
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center w-full">

      <div className="p-6 bg-[#f1deb375] rounded-lg shadow-sm flex flex-col">
        <div className="flex flex-col items-center h-60 justify-center gap-10 ">
      <CalendarCheck2 className="w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <h3 className="font-bold text-xl mb-2">Agenda sem stress</h3>
        <p className="text-sm text-gray-600">
          Organize seus horários te forma inteligente
        </p>
        </div>
      </div>

      <div className="p-6 bg-[#f1deb375] rounded-lg shadow-sm flex flex-col items-center ">
                <div className="flex flex-col items-center h-60 justify-center gap-10 ">
        <UsersRound className="w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <h3 className="font-bold text-xl mb-2">Pacientes bem cuidados</h3>
        <p className="text-sm text-gray-600">
          Tenha as informações dos seus pacientes em um só lugar
        </p>
        </div>
      </div>

      <div className="p-6 bg-[#f1deb375] rounded-lg shadow-sm flex flex-col items-center ">
                <div className="flex flex-col items-center h-60 justify-center gap-10 ">
        <ClipboardPen className="w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3" />
        <h3 className="font-bold text-xl mb-2">Consultas e evolução</h3>
        <p className="text-sm text-gray-600">
          Registre atendimentos e acompanhe a evolução com facilidade
        </p>
      </div>
      </div>


      <div className="p-6 bg-[#f1deb375] rounded-lg shadow-sm flex flex-col items-center ">
                <div className="flex flex-col items-center h-60 justify-center gap-10 ">
        <Cookie className="w-16 h-16 text-orange-700 bg-[#e9dba6] rounded-full py-3"/>
        <h3 className="font-bold text-xl mb-2">Seus dados protegidos</h3>
        <p className="text-sm text-gray-600">
          Segurança e privacidade para você e para seus pacientes
        </p>
      </div>
      </div>
      </div>
  </Container>
</section>    )
}