import { useUserStore } from '@/store/useUserStore';
import { Users, UserPlus, Star, BarChart3 } from 'lucide-react';
import { StatCard } from '../molecules/StatCard';


export const UserStats = () => {
  const { statics, isLoading } = useUserStore();

  if (isLoading || !statics) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-[#1e1e1e] border border-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  const cards = [
    { title: 'Total Users', value: statics.totalUsers, icon: Users },
    { title: 'New Users', value: statics.newUsers, icon: UserPlus },
    { title: 'Top Users', value: statics.topUsers, icon: Star },
    { title: 'Other Users', value: statics.otherUsers, icon: BarChart3 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards?.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
};