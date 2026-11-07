import { ChevronRight, Stethoscope, X } from "lucide-react";
import { navigationItems } from "./navigation";
import { NavLink } from "react-router-dom";

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      { mobileOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-[#19372c]/30 lg:hidden"
          onClick={ onClose }
        />
      ) }
      <aside
        className={ `fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-[#e9e6dc] bg-[#fffdf8] px-5 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }` }
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 text-[#1d4f3f]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dceee5]">
              <Stethoscope size={ 19 } strokeWidth={ 2.2 } />
            </span>
            <span className="text-lg font-semibold tracking-[-0.02em]">Clinic System</span>
          </div>
          <button aria-label="Fechar menu" className="text-[#708078] lg:hidden" onClick={ onClose }>
            <X size={ 20 } />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9aa49e]">Menu principal</p>
        <nav className="space-y-1.5" aria-label="Navegação principal">
          { navigationItems.map(({ label, icon: ItemIcon, path }) => (
            <NavLink to={ path }
              key={ label }
              aria-current={ path ? "page" : undefined }
              className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive
                ? "bg-[#e0f0e8] text-[#1d5a46]"
                : "text-[#6f7d76] hover:bg-[#f3f2eb] hover:text-[#1d4f3f]"
                }` }
              onClick={ onClose }
            >
              <ItemIcon size={ 18 } strokeWidth={ path ? 2.2 : 1.8 } />
              <span>{ label }</span>
              { path && <ChevronRight className="ml-auto" size={ 15 } /> }

            </NavLink>
          )) }
        </nav>

        <div className="mt-auto rounded-2xl bg-[#f5f0e6] p-4">
          <p className="text-sm font-semibold text-[#31584a]">Precisa de ajuda?</p>
          <p className="mt-1 text-xs leading-5 text-[#829087]">Nossa equipe está pronta para apoiar você.</p>
          <button className="mt-3 text-xs font-semibold text-[#39735b] hover:text-[#1d4f3f]">Falar com suporte</button>
        </div>
      </aside>
    </>
  );
}
