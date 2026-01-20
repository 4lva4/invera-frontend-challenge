'use client';

import React, { useMemo } from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts';
import { useUserStore } from '@/store/useUserStore';
import { USER_CHART_COLORS } from '@/constants';
import { UserType } from '@/enums/index.enum';
import { ChartSkeleton } from './ChartSkeleton';

export const Chart = React.memo(() => {
  const userTypes = useUserStore((state) => state.userTypes);
  const isLoading = useUserStore((state) => state.isLoading);

  const chartData = useMemo(() => {
    if (!userTypes?.distribution) return [];

    const order = [UserType.DIRECT, UserType.SOCIAL, UserType.ORGANIC];

    return order.map((type) => {
      const item = userTypes.distribution?.find((d) => d.type === type);
      return {
        name: type,
        value: item ? item.percentage : 0,
        fill: USER_CHART_COLORS[type] || '#8884d8',
      };
    });
  }, [userTypes]);

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-neutral-50/50 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-6 rounded-3xl transition-colors shadow-sm">
      <h3 className="text-neutral-900 dark:text-white text-lg font-semibold mb-6 tracking-tight">Statistics</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-around gap-12">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-4xl font-bold text-neutral-900 dark:text-white">
              {userTypes?.totalUsers ? `${(userTypes.totalUsers / 1000)}k` : '0'}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-widest">users</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="100%"
              barSize={12}
              data={chartData}
              startAngle={90}
              endAngle={-450}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: 'transparent' }} 
                dataKey="value"
                cornerRadius={15}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6 w-full max-w-xs">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors capitalize font-medium">
                  {item.name.toLowerCase()}
                </span>
              </div>
              <span className="text-neutral-900 dark:text-white font-semibold text-base">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Chart.displayName = 'Chart';