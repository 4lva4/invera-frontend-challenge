import React from 'react';
import { Users, UserCheck, UserPlus, Star } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { StatCard } from '../molecules/StatCard';

export const UserCategory = () => {
  const statics = useUserStore((state) => state.statics);
  const statsConfig = [
    {
      title: "Total Users",
      value: statics?.totalUsers || 0,
      icon: Users,
    },
    {
      title: "New Users",
      value: statics?.newUsers || 0,
      icon: UserPlus,
    },
    {
      title: "Top Users",
      value: statics?.topUsers || 0,
      icon: Star,
    },
    {
      title: "Other Users",
      value: statics?.otherUsers || 0,
      icon: UserCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};