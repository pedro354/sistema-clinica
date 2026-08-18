import type { Home } from "lucide-react";

type Icon = typeof Home;

export function MetricCard({ label, value, detail, icon: MetricIcon, tone }: { label: string; value: string; detail: string; icon: Icon; tone: string }) {

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

