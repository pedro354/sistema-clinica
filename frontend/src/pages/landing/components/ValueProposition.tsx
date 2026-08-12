import { CheckCheck } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function ValueProposition(){
    return(
        <section className="py-16">
  <Container>
    <div className="flex flex-col md:flex-row items-center gap-12 ">

      <div className="basis-1/3 ">
        <h2 className="text-4xl font-semibold mb-8 w-full ">
          Um sistema feito para facilitar sua vida
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center gap-2 text-black text-2xl"><CheckCheck className="w-6 h-6 text-green-700"/>Interface intuitiva</li>
          <li className="flex items-center gap-2 text-black text-2xl"><CheckCheck className="w-6 h-6 text-green-700"/>Informações sempre à mão</li>
          <li className="flex items-center gap-2 text-black text-2xl"><CheckCheck className="w-6 h-6 text-green-700"/>Acesso de qualquer lugar</li>
          <li className="flex items-center gap-2 text-black text-2xl"><CheckCheck className="w-6 h-6 text-green-700"/>Visual moderno e acolhedor</li>
        </ul>
      </div>

      <div className="basis-2/3  ">
        <img
          src="./dash_2.png"
          alt="Dashboard"
          className="w-full"
        />
      </div>

    </div>
  </Container>
</section>
    )
}