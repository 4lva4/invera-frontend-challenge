import { LucideIcon, MoreVertical } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
}

export const StatCardSkeleton = ( {icon: Icon }: StatCardProps) => { 
    return (
         <div className="bg-neutral-50/50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-5 rounded-lg flex items-center justify-between transition-all hover:shadow-md dark:hover:border-white/10 group">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-4xl bg-neutral-100 dark:bg-[#2E3448] flex items-center justify-center transition-colors">
            <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-[#7B99FF]" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {/* Skeleton para el Título (p) */}
            <div className="h-3 w-20 bg-neutral-300 dark:bg-white/5 animate-pulse rounded-full" />

            {/* Skeleton para el Valor (h3) */}
            <div className="h-7 w-12 bg-neutral-300 dark:bg-white/5 animate-pulse rounded-md" />
          </div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    )
}