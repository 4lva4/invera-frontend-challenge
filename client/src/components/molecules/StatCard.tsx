import { LucideIcon, MoreVertical } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-[#1e1e1e] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#7c94ff]" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-300 transition-colors">
        <MoreVertical size={20} />
      </button>
    </div>
  );
};