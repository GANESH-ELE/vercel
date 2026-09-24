import { AVAILABILITY } from '@/lib/data';
import { CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AvailabilityBadge({ availability, className }) {
  const map = {
    [AVAILABILITY.AVAILABLE]: {
      icon: CheckCircle2,
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    [AVAILABILITY.MADE_TO_ORDER]: {
      icon: Clock,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    [AVAILABILITY.ENQUIRE]: {
      icon: HelpCircle,
      classes: 'bg-slate-100 text-slate-600 border-slate-200',
    },
  };
  const cfg = map[availability] || map[AVAILABILITY.ENQUIRE];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        cfg.classes,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {availability}
    </span>
  );
}
