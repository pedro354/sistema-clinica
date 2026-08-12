import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mx-4 grid gap-4 sm:mx-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {/* Identidade */}
        <div className="flex flex-col items-start gap-4">
          <img src="/logo.png" className="h-10 w-40" alt="Clinic System" />
          <p className="text-sm leading-relaxed">
            Feito com cuidado para psicólogos como você.
          </p>

          <div className="flex gap-4">
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </div>

        {/* Produto */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-bold">Produto</h3>
          <a href="">Funcionalidades</a>
          <a href="">Benefícios</a>
          <a href="">Preços</a>
          <a href="">Novidade</a>
        </div>

        {/* Recursos */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-bold">Recursos</h3>
          <a href="">Agenda</a>
          <a href="">Pacientes</a>
          <a href="">Consultas</a>
          <a href="">Relatórios</a>
        </div>

        {/* Empresa */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-bold">Empresa</h3>
          <a href="">Sobre nós</a>
          <a href="">Blog</a>
          <a href="">Contato</a>
          <a href="">Carreiras</a>
        </div>

        {/* Suporte */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-bold">Suporte</h3>
          <a href="">Central de Ajuda</a>
          <a href="">Tutoriais</a>
          <a href="">Fale Conosco</a>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="flex flex-col gap-4 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Clinic System. Todos os direitos reservados.</p>

        <div className="flex flex-wrap gap-4">
          <a>Política de Privacidade</a>
          <a>Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
