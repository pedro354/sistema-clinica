import { Headset, HeartHandshake, ShieldCheck, ThumbsUp } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Benefits(){
    return (
        <section className="py-16">
  <Container>
    <div className="grid grid-cols-2 divide-x divide-black/5 md:grid-cols-4 gap-8 text-center">

      <div className="flex flex-col items-center">
        <HeartHandshake className="w-16 h-16 text-green-700"/>
        <h1 className="text-xl text-600 text-black-600">Feito para psicólogos</h1>
        <p className="text-3 text-gray-500">Desenvolvido por quem entende sua rotina</p>
      </div>

      <div className="flex flex-col items-center">
        <ShieldCheck className="w-16 h-16 text-green-700" />
        <h1 className="text-xl text-600 text-black-600">Seguro e confiável</h1>
                <p className="text-3 text-gray-500">Seus dados protegidos com segurança</p>
      </div>

      <div className="flex flex-col items-center">
        <ThumbsUp className="w-16 h-16 text-green-700" />
        <h1 className="text-xl text-600 text-black-600">Fácil de usar</h1>
                <p className="text-3 text-gray-500">Interface intuitiva para o seu dia a dia</p>
      </div>

      <div className="flex flex-col items-center">
        <Headset className="w-16 h-16 text-green-700"  />
        <h1 className="text-xl text-600 text-black-600">Suporte humano</h1>
                <p className="text-3 text-gray-500">Atendimento próximo sempre que precisar</p>
      </div>
      </div>

  </Container>
</section>
    )
}