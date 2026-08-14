import { useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  Home,
  Menu,
  MessageCircle,
  PanelLeftOpen,
  Settings,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type Icon = typeof Home;

type NavigationItem = {
  label: string;
  icon: Icon;
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Agenda", icon: CalendarDays },
  { label: "Pacientes", icon: UsersRound },
  { label: "Consultas", icon: ClipboardList },
  { label: "Disponibilidade", icon: Clock3 },
  { label: "Mensagens", icon: MessageCircle },
  { label: "Relatórios", icon: BarChart3 },
  { label: "Configurações", icon: Settings },
];

const appointments = [
  { time: "09:00", name: "Mariana Costa", type: "Sessão de terapia", color: "bg-[#dbeee6]" },
  { time: "11:30", name: "Rafael Mendes", type: "Acompanhamento", color: "bg-[#f4e6d2]" },
  { time: "15:00", name: "Beatriz Alves", type: "Primeira consulta", color: "bg-[#e4e6f3]" },
];

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-[#19372c]/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-[#e9e6dc] bg-[#fffdf8] px-5 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 text-[#1d4f3f]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dceee5]">
              <Stethoscope size={19} strokeWidth={2.2} />
            </span>
            <span className="text-lg font-semibold tracking-[-0.02em]">Clinic System</span>
          </div>
          <button aria-label="Fechar menu" className="text-[#708078] lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9aa49e]">Menu principal</p>
        <nav className="space-y-1.5" aria-label="Navegação principal">
          {navigationItems.map(({ label, icon: ItemIcon, active }) => (
            <a
              key={label}
              href="#"
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#e0f0e8] text-[#1d5a46]"
                  : "text-[#6f7d76] hover:bg-[#f3f2eb] hover:text-[#1d4f3f]"
              }`}
              onClick={onClose}
            >
              <ItemIcon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
              {active && <ChevronRight className="ml-auto" size={15} />}
            </a>
          ))}
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

function MetricCard({ label, value, detail, icon: MetricIcon, tone }: { label: string; value: string; detail: string; icon: Icon; tone: string }) {
  return (
    <article className="rounded-2xl border border-[#ebe9e1] bg-white p-5 shadow-[0_4px_18px_rgba(50,74,61,0.04)]">
      <div className="flex items-start justify-between">
        <p className="text-sm text-[#7b8881]">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
          <MetricIcon size={18} className="text-[#356b55]" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#244638]">{value}</p>
      <p className="mt-1 text-xs text-[#8c9890]">{detail}</p>
    </article>
  );
}

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-shell min-h-screen bg-[#f8f8f4] text-[#244638]">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="min-w-0 flex-1">
          <header className="flex h-[82px] items-center justify-between border-b border-[#ebe9e1] bg-[#fffdf8] px-5 sm:px-8 lg:px-10">
            <button aria-label="Abrir menu" className="text-[#49675a] lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu size={23} />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4 sm:gap-6">
              <button aria-label="Notificações" className="relative text-[#687b72] transition-colors hover:text-[#1d5a46]">
                <Bell size={20} strokeWidth={1.8} />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#fffdf8] bg-[#d98d5b]" />
              </button>
              <span className="h-7 w-px bg-[#e8e7df]" />
              <button className="flex items-center gap-3 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e9df] text-sm font-semibold text-[#356b55]">AS</span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold text-[#2c5042]">Ana Souza</span>
                  <span className="block text-[11px] text-[#8a968f]">Psicóloga</span>
                </span>
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium text-[#7b8981]">Quarta-feira, 14 de agosto de 2026</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#244638] sm:text-[34px]">Bom dia, Ana <span aria-hidden="true">🌿</span></h1>
                <p className="mt-2 text-sm text-[#839087]">Tenha um dia tranquilo e produtivo.</p>
              </div>
              <button className="flex w-fit items-center gap-2 rounded-xl bg-[#39735b] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(57,115,91,0.18)] transition-colors hover:bg-[#2e604b]">
                <CalendarDays size={17} />
                Nova consulta
              </button>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do dia">
              <MetricCard label="Consultas hoje" value="08" detail="+2 em relação à terça" icon={CalendarDays} tone="bg-[#e0f0e8]" />
              <MetricCard label="Pacientes ativos" value="124" detail="+6 este mês" icon={UsersRound} tone="bg-[#f4e6d2]" />
              <MetricCard label="Horas atendidas" value="05h 30" detail="de 08h disponíveis" icon={Clock3} tone="bg-[#e4e6f3]" />
              <MetricCard label="Mensagens novas" value="06" detail="2 aguardando resposta" icon={MessageCircle} tone="bg-[#f1e5e0]" />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
              <article className="rounded-2xl border border-[#ebe9e1] bg-white p-5 shadow-[0_4px_18px_rgba(50,74,61,0.04)] sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#2b5141]">Próximas consultas</p>
                    <p className="mt-1 text-xs text-[#8a968f]">Sua agenda para hoje</p>
                  </div>
                  <button className="text-xs font-semibold text-[#39735b] hover:text-[#1d4f3f]">Ver agenda</button>
                </div>
                <div className="mt-5 divide-y divide-[#f0eee8]">
                  {appointments.map((appointment) => (
                    <div key={appointment.time} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <time className="w-12 text-sm font-semibold text-[#60766b]">{appointment.time}</time>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${appointment.color} text-xs font-semibold text-[#47705d]`}>{appointment.name.split(" ").map((part) => part[0]).join("")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#315344]">{appointment.name}</p>
                        <p className="mt-1 text-xs text-[#929d96]">{appointment.type}</p>
                      </div>
                      <button aria-label={`Abrir consulta de ${appointment.name}`} className="text-[#a2ada6] hover:text-[#39735b]"><ChevronRight size={17} /></button>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-[#ebe9e1] bg-[#eaf3ed] p-5 shadow-[0_4px_18px_rgba(50,74,61,0.04)] sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-[#2b5141]">Acesso rápido</p>
                  <PanelLeftOpen size={18} className="text-[#69907c]" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="flex min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><UserRound size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Novo paciente</span></button>
                  <button className="flex min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><FileText size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Anotações</span></button>
                  <button className="flex min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><CalendarDays size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Minha agenda</span></button>
                  <button className="flex min-h-24 flex-col items-start justify-between rounded-xl bg-white/80 p-4 text-left transition-colors hover:bg-white"><MessageCircle size={19} className="text-[#39735b]" /><span className="text-xs font-semibold text-[#416250]">Mensagens</span></button>
                </div>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
