import { Container } from "../../../../Components/ui/Container/Container";

export function Navbar() {
  return (
      <header className="">
        <Container>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 w-3xs">
        <img src="/logo.png" className="" alt="logo" />
          </div>

      <div className="flex gap-8 items-center">
        <nav className="hidden md:flex gap-8">
          <a>Funcionalidades</a>
          <a>Benefícios</a>
          <a>Sobre</a>
          <a>Contato</a>
        </nav>

            <button className="border-solid border-2 px-4 py-2 rounded-sm cursor-pointer hover:bg-orange-300 transition-colors duration-200 hover:text-white">
                Entrar
        </button>
      </div>
    </div>
    </Container>
</header>
  );
}