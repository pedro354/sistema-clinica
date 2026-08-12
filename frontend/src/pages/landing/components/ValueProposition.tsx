import { CheckCheck } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function ValueProposition() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
          <div className="w-full md:basis-1/3">
            <h2 className="mb-8 text-3xl font-semibold leading-tight sm:text-4xl">
              Um sistema feito para facilitar sua vida
            </h2>

            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2 text-base text-black sm:text-lg">
                <CheckCheck className="h-6 w-6 shrink-0 text-green-700" />
                Interface intuitiva
              </li>
              <li className="flex items-center gap-2 text-base text-black sm:text-lg">
                <CheckCheck className="h-6 w-6 shrink-0 text-green-700" />
                Informações sempre à mão
              </li>
              <li className="flex items-center gap-2 text-base text-black sm:text-lg">
                <CheckCheck className="h-6 w-6 shrink-0 text-green-700" />
                Acesso de qualquer lugar
              </li>
              <li className="flex items-center gap-2 text-base text-black sm:text-lg">
                <CheckCheck className="h-6 w-6 shrink-0 text-green-700" />
                Visual moderno e acolhedor
              </li>
            </ul>
          </div>

          <div className="w-full md:basis-2/3">
            <img
              src="./dash_2.png"
              alt="Dashboard do Clinic System"
              className="mx-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
