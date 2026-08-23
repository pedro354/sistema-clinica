import { BarChart3, CalendarDays, ClipboardList, Clock3, Home, MessageCircle, Settings, UsersRound } from "lucide-react";

type Icon = typeof Home;

type NavigationItem = {
  label: string;
  icon: Icon;
  path: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: Home, path: "/dashboard", },
  { label: "Agenda", icon: CalendarDays, path: "/agenda" },
  { label: "Pacientes", icon: UsersRound, path: "/patients" },
  { label: "Consultas", icon: ClipboardList, path: "/appointments" },
  { label: "Disponibilidade", icon: Clock3, path: "/scheduleavailability" },
  { label: "Mensagens", icon: MessageCircle, path: "/messages" },
  { label: "Relatórios", icon: BarChart3, path: "/reports" },
  { label: "Configurações", icon: Settings, path: "/settings" },
];

