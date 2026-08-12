import { Container } from "../../../Components/ui/Container/Container";

export function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-12">
          {/* TEXTO */}
          <div className="w-full md:basis-1/3">
            <h1 className="text-4xl font-semibold leading-tight text-gray-800 sm:text-5xl">
              Mais acolhimento <br />
              na sua rotina. <br />
              Mais tempo para <br />
              <span className="text-green-700">o que importa.</span>
            </h1>

            <p className="mt-6 max-w-xl leading-relaxed text-gray-600">
              O Clinic System organiza sua clínica para que você possa se dedicar ao que realmente transforma vidas.
            </p>

            {/* BOTÕES */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="cursor-pointer rounded-md bg-orange-500 px-6 py-3 text-sm text-white transition hover:bg-orange-600">
                Começar agora
              </button>

              <button className="cursor-pointer rounded-md border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                Ver funcionalidades
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              🔒 Não spam. Sem envio de emails.
            </p>
          </div>

          {/* IMAGEM */}
          <div className="w-full md:basis-2/3">
            <img
              src="./dash.png"
              alt="Dashboard do Clinic System"
              className="mx-auto w-full max-w-3xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
