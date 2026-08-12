import { Headset, HeartHandshake, ShieldCheck, ThumbsUp } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Benefits() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-y-10 text-center sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-black/5 md:gap-y-0">
          <div className="flex flex-col items-center px-4">
            <HeartHandshake className="h-12 w-12 text-green-700 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
              Feito para psicólogos
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Desenvolvido por quem entende sua rotina
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <ShieldCheck className="h-12 w-12 text-green-700 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
              Seguro e confiável
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Seus dados protegidos com segurança
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <ThumbsUp className="h-12 w-12 text-green-700 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
              Fácil de usar
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Interface intuitiva para o seu dia a dia
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <Headset className="h-12 w-12 text-green-700 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <h2 className="text-base font-medium text-gray-900 sm:text-lg">
              Suporte humano
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Atendimento próximo sempre que precisar
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
