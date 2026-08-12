import { Container } from "../../../Components/ui/Container/Container";

export function Hero() {
    return (
        <section className="py-16">
            <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* TEXTO */}
          <div className="basis-1/3 ">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
              Mais acolhimento para sua rotina <br />
              sua rotina. <br />
              Mais tempo para <br />
              <span className="text-green-700">o que importa.</span>
            </h1>

            <p className="mt-6 text-gray-600">
              O Clinic System organiza sua clínica para que você possa se dedicar ao que realmente transforma vidas.
            </p>

            {/* BOTÕES */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600 transition cursor-pointer">
                Começar agora
              </button>

              <button className="px-6 py-3 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                Ver funcionalidades
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              🔒 Não spam. Sem envio de emails.
            </p>
          </div>

          {/* IMAGEM */}
          <div className="basis-2/3 ">
        <img
          src="./dash.png"
          alt="Dashboard"
          className=""
        />
          </div>

        </div>
        </Container>
        </section>
    );
}