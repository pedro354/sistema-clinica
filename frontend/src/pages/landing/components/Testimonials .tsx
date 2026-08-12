import { Quote } from "lucide-react";
import { Container } from "../../../Components/ui/Container/Container";

export function Testimonials (){
  return(

    <section className="py-16">
  <Container>
    <h2 className="text-center text-2xl font-semibold mb-12">
      Palavras de quem usa
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="p-10 bg-white rounded-lg shadow-xl/10 flex flex-col items-center flex-wrap content-center relative">
        <p className="font-medium text-2xl text-gray-800 mb-4 relative">
        <Quote className="w-6 h-6 text-orange-700"/>
          "O Clinic System trouxe mais organização e leveza para meus dias de clínica."
        </p>
        <p className="text-sm font-bold">Isabela Ferreira</p>
                <span className="text-sm font-light text-gray-500">Psicóloga</span>
      </div>
      <div className="p-10 bg-white rounded-lg shadow-xl/10 flex flex-col items-center flex-wrap content-center relative">
        <p className="font-medium text-2xl text-gray-800 mb-13 relative ">
        <Quote className="w-6 h-6 text-orange-700"/>
          "A plataforma é linda, fácil de usar e completa. Amei!"
        </p>
        <p className="text-sm font-bold">Clínica Cuidar</p>
                <span className="text-sm font-light text-gray-500"></span>
      </div>
      <div className="p-10 bg-white rounded-lg shadow-xl/10 flex flex-col items-center flex-wrap content-center ">
        <p className="font-medium text-2xl text-gray-800 mb-4 relative ">
        <Quote className="w-6 h-6 text-orange-700"/>
          "Consigo focar nos atendimentos e menos na burocracia."
        </p>
        <p className="text-sm font-bold">Lucas Mendes</p>
                <span className="text-sm font-light text-gray-500">Psicólogo</span>
      </div>

    </div>
  </Container>
</section>
  )
}