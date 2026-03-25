import { STATUS_CONFIG } from "./features";

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-[11px] font-medium ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
