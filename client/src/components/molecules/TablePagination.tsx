import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/useUserStore";

export const TablePagination = React.memo(() => {
  const currentPage = useUserStore((state) => state.currentPage);
  const totalResults = useUserStore((state) => state.totalResults);
  const itemsPerPage = useUserStore((state) => state.itemsPerPage);
  const setCurrentPage = useUserStore((state) => state.setCurrentPage);
  const setItemsPerPage = useUserStore((state) => state.setItemsPerPage);

  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const from = totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between px-6 py-4 mt-0">
      <div className="text-black dark:text-neutral-300 text-sm font-medium">
        <span className="text-black dark:text-neutral-300">{from}-{to}</span> of {totalResults}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-black dark:text-neutral-300 text-sm font-medium">Rows per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(v) => setItemsPerPage(Number(v))}
          >
            <SelectTrigger className="cursor-pointer w-17 h-8 border-nonefocus:ring-0 bg-[#EEEFF0] dark:bg-[#1A1A1A]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="cursor-pointer border-black/10 dark:border-white/10">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || totalResults === 0}
            className="h-8 w-8 border border-black/10 dark:border-white/10 dark:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] text-indigo-600 dark:text-indigo-400 disabled:opacity-20 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </Button>
          <span className="text-neutral-900 dark:text-neutral-300 text-sm font-medium w-12 text-center">
            {currentPage}/{totalPages || 1}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages || totalResults === 0}
            className="h-8 w-8 border border-black/10 dark:border-white/10 dark:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] text-indigo-600 dark:text-indigo-400 disabled:opacity-20 cursor-pointer"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
});

TablePagination.displayName = "TablePagination";