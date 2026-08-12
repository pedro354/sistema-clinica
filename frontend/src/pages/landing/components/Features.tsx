import { CalendarCheck2, ClipboardPen, Cookie, UsersRound } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Features() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-10 text-center text-2xl font-semibold sm:mb-12">
          Tudo em um só lugar
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-[#f1deb375] p-6 shadow-sm">
            <div className="flex h-60 flex-col items-center justify-center gap-8">
              <CalendarCheck2 className="h-14 w-14 rounded-full bg-[#e9dba6] py-3 text-orange-700 sm:h-16 sm:w-16" />
              <h3 className="text-lg font-bold sm:text-xl">Agenda sem stress</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Organize seus horários de forma inteligente
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-[#f1deb375] p-6 shadow-sm">
            <div className="flex h-60 flex-col items-center justify-center gap-8">
              <UsersRound className="h-14 w-14 rounded-full bg-[#e9dba6] py-3 text-orange-700 sm:h-16 sm:w-16" />
              <h3 className="text-lg font-bold sm:text-xl">Pacientes bem cuidados</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Tenha as informações dos seus pacientes em um só lugar
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-[#f1deb375] p-6 shadow-sm">
            <div className="flex h-60 flex-col items-center justify-center gap-8">
              <ClipboardPen className="h-14 w-14 rounded-full bg-[#e9dba6] py-3 text-orange-700 sm:h-16 sm:w-16" />
              <h3 className="text-lg font-bold sm:text-xl">Consultas e evolução</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Registre atendimentos e acompanhe a evolução com facilidade
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-lg bg-[#f1deb375] p-6 shadow-sm">
            <div className="flex h-60 flex-col items-center justify-center gap-8">
              <Cookie className="h-14 w-14 rounded-full bg-[#e9dba6] py-3 text-orange-700 sm:h-16 sm:w-16" />
              <h3 className="text-lg font-bold sm:text-xl">Seus dados protegidos</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Segurança e privacidade para você e para seus pacientes
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
