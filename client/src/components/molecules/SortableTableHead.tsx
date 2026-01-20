import React from 'react';
import { useTheme } from 'next-themes';
import { LucideIcon, ChevronUp, ChevronDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/helpers";

interface SortableTableHeadProps {
  icon: LucideIcon;
  label: string;
  sortKey: string;
  currentSort: { key: string; order: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  className?: string;
}

export const SortableTableHead = ({
  icon: Icon,
  label,
  sortKey,
  currentSort,
  onSort,
  className,
}: SortableTableHeadProps) => {
  const { theme } = useTheme();
  const isActive = currentSort?.key === sortKey;
  const isDark = theme === 'dark';

  return (
    <TableHead
      className={cn(
        "py-4 cursor-pointer transition-all group select-none border-none",
        isDark 
          ? "hover:bg-white/2"
          : "hover:bg-neutral-100",
        className
      )}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          className={cn(
            "transition-colors",
            isActive 
              ? isDark ? "text-white" : "text-indigo-600"
              : isDark 
                ? "text-gray-400 group-hover:text-gray-300" 
                : "text-neutral-500 group-hover:text-neutral-900"
          )}
        />
        <span
          className={cn(
            "font-medium transition-colors text-sm whitespace-nowrap",
            isActive 
              ? isDark ? "text-white" : "text-indigo-600"
              : isDark 
                ? "text-gray-400 group-hover:text-gray-300" 
                : "text-neutral-500 group-hover:text-neutral-900"
          )}
        >
          {label}
        </span>
        
        <div className="flex flex-col ml-1 shrink-0">
          <ChevronUp
            size={12}
            className={cn(
              "h-3 transition-all",
              isActive && currentSort?.order === 'asc'
                ? isDark ? "text-white opacity-100" : "text-indigo-700 opacity-100"
                : isDark 
                  ? "text-gray-400 opacity-30 group-hover:opacity-60"
                  : "text-slate-500 opacity-50 group-hover:text-slate-700 group-hover:opacity-100"
            )}
          />
          <ChevronDown
            size={12}
            className={cn(
              "h-3 transition-all",
              isActive && currentSort?.order === 'desc'
                ? isDark ? "text-white opacity-100" : "text-indigo-700 opacity-100"
                : isDark 
                  ? "text-gray-400 opacity-30 group-hover:opacity-60"
                  : "text-slate-500 opacity-50 group-hover:text-slate-700 group-hover:opacity-100"
            )}
          />
        </div>
      </div>
    </TableHead>
  );
};