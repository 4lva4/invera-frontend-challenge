import { MoreVertical, type LucideIcon } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { StatCardSkeleton } from "./StatCardSkeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  const isLoading = useUserStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <StatCardSkeleton icon={Icon} />
    );
  }

  return (
    <div className="bg-neutral-50/50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-5 rounded-lg flex items-center justify-between transition-all hover:shadow-md dark:hover:border-white/10 group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-4xl bg-neutral-100 dark:bg-[#2E3448] flex items-center justify-center transition-colors">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-[#7B99FF]" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold ext-neutral-900 dark:text-[#BABABA] uppercase tracking-widest cursor-default">
            {title}
          </p>
          <h3 className="text-1x1 font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
            {value}
          </h3>
        </div>
      </div>
      <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
};
