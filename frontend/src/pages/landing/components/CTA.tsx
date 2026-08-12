import { Container } from "../../../Components/ui/Container/Container";

export function CTA() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative flex min-h-70 items-center justify-center overflow-hidden rounded-2xl px-4 py-10 text-center sm:px-8">
          <img
            src="./cta.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative flex w-full max-w-xl flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
              Organize sua clínica com mais leveza e eficiência.
            </h2>

            <p className="text-base leading-relaxed sm:text-lg md:text-2xl">
              Comece agora gratuitamente e sinta a diferença no seu dia a dia.
            </p>

            <button className="cursor-pointer rounded-md bg-orange-500 px-6 py-3 text-sm text-white transition hover:bg-orange-600">
              Começar agora
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
