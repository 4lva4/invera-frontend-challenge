import { TableRow, TableCell } from "@/components/ui/table";


export const UserTableSkeleton = ({ index }: { index: number }) => (
  <TableRow   className={`animate-pulse border-b border-black/5 dark:border-[#1A1A1A] transition-colors hover:bg-neutral-50 dark:hover:bg-[#ffffff03] ${
        index % 2 === 0 ? "bg-white dark:bg-[#212121]" : "bg-[#EEEFF0] dark:bg-[#1A1A1A]"
      }`}>
    <TableCell className="w-16 pl-6 py-4"><div className="w-4 h-4 bg-neutral-200 dark:bg-white/10 rounded" /></TableCell>
    <TableCell className="w-[28%] py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-white/10 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-neutral-300 dark:bg-white/10 rounded" />
          <div className="h-2 w-32 bg-neutral-200 dark:bg-white/5 rounded" />
        </div>
      </div>
    </TableCell>
    <TableCell className="w-[18%] py-4"><div className="h-3 w-20 bg-neutral-300 dark:bg-white/5 rounded" /></TableCell>
    <TableCell className="w-[16%] py-4"><div className="h-3 w-16 bg-neutral-300 dark:bg-white/5 rounded" /></TableCell>
    <TableCell className="w-[20%] py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-white/10 shrink-0" />
        <div className="h-3 w-20 bg-neutral-200 dark:bg-white/5 rounded" />
      </div>
    </TableCell>
    <TableCell className="w-32 py-4"><div className="h-6 w-16 bg-neutral-300 dark:bg-white/10 rounded-full" /></TableCell>
    <TableCell className="w-20 pr-6 py-4"><div className="flex justify-end gap-2"><div className="w-4 h-4 bg-neutral-300 dark:bg-white/10 rounded" /></div></TableCell>
  </TableRow>
);