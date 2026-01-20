export const ChartSkeleton = () => (
  <div className="bg-[#EEEFF0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-6 rounded-3xl animate-pulse shadow-sm">
    <div className="h-7 w-32 bg-neutral-300 dark:bg-white/5 rounded-lg mb-6" />
    <div className="flex flex-col md:flex-row items-center justify-around gap-12">
      <div className="relative w-72 h-72 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-[12px] bg-neutral-300 dark:bg-black/10 dark:border-white/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-20 bg-neutral-300 dark:bg-white/10 rounded-lg" />
            <div className="h-3 w-16 bg-neutral-200 dark:bg-white/5 rounded" />
          </div>
        </div>
      </div>
      <div className="space-y-6 w-full max-w-xs">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-white/10" />
              <div className="h-4 w-24 bg-neutral-300 dark:bg-white/5 rounded" />
            </div>
            <div className="h-4 w-10 bg-neutral-300 dark:bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
