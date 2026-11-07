import { Bell, Menu } from "lucide-react";
type HeaderProps = {
  user: {
    id: number;
    name: string;
  } | null;
  onMenuClick: () => void;
};
export default function Header ({ user, onMenuClick }: HeaderProps) {
    return(
        
                  <header className="flex h-20.5 items-center justify-between border-b border-[#ebe9e1] bg-[#fffdf8] px-5 sm:px-8 lg:px-10">
            {/* Botão que abre o sidebar */ }
            <button aria-label="Abrir menu" className="text-[#49675a] lg:hidden" onClick={ () => {onMenuClick()} }>
              <Menu size={ 23 } />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4 sm:gap-6">
              <button aria-label="Notificações" className="relative text-[#687b72] transition-colors hover:text-[#a63838]">
                <Bell size={ 20 } strokeWidth={ 1.8 } />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#fffdf8] bg-[#d98d5b]" />
              </button>
              <span className="h-7 w-px bg-[#e8e7df]" />
              <button className="flex items-center gap-3 text-left">
                {/* Abreviação do nome */ }
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e9df] text-sm font-semibold text-[#356b55]">{ user?.name.split(" ").map((word) => word[0]).join("").toUpperCase() }</span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold text-[#2c5042]">{ user?.name }</span>
                  <span className="block text-[11px] text-[#8a968f]">Psicóloga</span>
                </span>
              </button>
            </div>
          </header>

    )


}