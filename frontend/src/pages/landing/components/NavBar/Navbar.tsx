import { Container } from "../../../../Components/ui/Container/Container";

export function Navbar() {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="/logo.png"
              className="w-32 sm:w-40"
              alt="Clinic System"
            />
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              <a>Funcionalidades</a>
              <a>Benefícios</a>
              <a>Sobre</a>
              <a>Contato</a>
            </nav>

            <button className="cursor-pointer rounded-sm border-2 border-solid px-4 py-2 text-sm transition-colors duration-200 hover:bg-orange-300 hover:text-white">
              Entrar
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
