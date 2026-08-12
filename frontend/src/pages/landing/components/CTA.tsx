import { Container } from "../../../Components/ui/Container/Container";

export function CTA(){
    return(
      <section className="py-16 ">
          <Container>
    <section className="">
  <div className="relative overflow-hidden h-70 flex flex-col justify-center flex-wrap items-center text-center gap-2">
    <img src="./cta.png" alt="cta" className="w-full rounded-2xl absolute inset-0 h-full object-cover" />

    <div className="relative flex gap-4 flex-wrap flex-col w-96">
      <h2 className="text-4xl font-semibold">Organize sua clínica com mais leveza e eficiência.</h2>
    <p className="text-2xl">Comece agora gratuitamente e sinta a diferença no seu dia a dia.</p>
      <div>
        <button className="px-6 py-3 rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600 transition cursor-pointer">Começar agora</button>
      </div>
    </div>
  </div>
</section>
  </Container>
</section>
    )
}