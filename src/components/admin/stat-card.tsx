import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  badge?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  isPositive,
  badge,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </p>
          {badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-3xl font-extrabold text-charcoal">{value}</h3>
        {change && (
          <p
            className={`text-xs mt-1 font-medium ${
              isPositive ? "text-green-600" : "text-gray-500"
            }`}
          >
            {change}
          </p>
        )}
      </div>

      <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
