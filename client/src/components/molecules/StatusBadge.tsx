import React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/helpers';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isOnline = status.toLowerCase() === 'online';

  const config = isOnline 
    ? {
        container: cn(
          "border-black/5 dark:border-white/5 rounded-9",
          isDark
            ? "bg-[#0A2A12] text-[#4ADE80]"
            : "bg-green-100 text-green-700"
        ),
        dot: isDark ? "bg-[#4ADE80]" : "bg-green-600",
        label: "Online"
      }
    : {
        container: cn(
          "border-black/5 dark:border-white/5 rounded-9",
          isDark
            ? "bg-[#1A1A1A] text-[#888888]"
            : "bg-slate-200 text-slate-700"
        ),
        dot: isDark ? "bg-[#888888]" : "bg-slate-500",
        label: "Offline"
      };

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-1xl border text-[11px] font-medium tracking-wide
      ${config.container}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      
      {config.label}
    </div>
  );
};