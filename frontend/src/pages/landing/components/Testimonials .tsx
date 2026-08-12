import { Quote } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-10 text-center text-2xl font-semibold sm:mb-12">
          Palavras de quem usa
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex h-full flex-col items-center rounded-lg bg-white p-8 shadow-xl/10 sm:p-10">
            <p className="relative mb-4 text-base font-medium leading-relaxed text-gray-800 sm:text-lg">
              <Quote className="mb-2 h-6 w-6 text-orange-700" />
              "O Clinic System trouxe mais organização e leveza para meus dias de clínica."
            </p>
            <p className="text-sm font-bold">Isabela Ferreira</p>
            <span className="text-sm font-light text-gray-500">Psicóloga</span>
          </div>

          <div className="flex h-full flex-col items-center rounded-lg bg-white p-8 shadow-xl/10 sm:p-10">
            <p className="relative mb-4 text-base font-medium leading-relaxed text-gray-800 sm:text-lg">
              <Quote className="mb-2 h-6 w-6 text-orange-700" />
              "A plataforma é linda, fácil de usar e completa. Amei!"
            </p>
            <p className="text-sm font-bold">Clínica Cuidar</p>
          </div>

          <div className="flex h-full flex-col items-center rounded-lg bg-white p-8 shadow-xl/10 sm:p-10">
            <p className="relative mb-4 text-base font-medium leading-relaxed text-gray-800 sm:text-lg">
              <Quote className="mb-2 h-6 w-6 text-orange-700" />
              "Consigo focar nos atendimentos e menos na burocracia."
            </p>
            <p className="text-sm font-bold">Lucas Mendes</p>
            <span className="text-sm font-light text-gray-500">Psicólogo</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
