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

export const Chart = React.memo(() => {
  const userTypes = useUserStore((state) => state.userTypes);
  const isLoading = useUserStore((state) => state.isLoading);

  const chartData = useMemo(() => {
  if (!userTypes?.distribution) return [];

  const order = [UserType.DIRECT, UserType.SOCIAL, UserType.ORGANIC];

  return order?.map((type) => {
    const item = userTypes.distribution?.find((d) => d.type === type);
    return {
      name: type,
      value: item ? item.percentage : 0,
      fill: USER_CHART_COLORS[type] || '#8884d8',
    };
  });
}, [userTypes]);

  if (isLoading && !userTypes) {
    return <div className="h-[350px] w-full bg-[#1e1e1e] animate-pulse rounded-3xl border border-white/5" />;
  }

  return (
    <div className="bg-[#1e1e1e] border border-white/5 p-8 rounded-3xl relative shadow-2xl">
      <h3 className="text-white text-lg font-semibold mb-6">Statistics</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-around gap-12">
        <div className="relative h-[280px] w-[280px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-4xl font-bold text-white">
              {userTypes?.totalUsers ? `${(userTypes.totalUsers / 1000)}k` : '0'}
            </span>
            <span className="text-gray-500 text-sm font-medium">users</span>
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
              endAngle={450}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: '#252525' }}
                dataKey="value"
                cornerRadius={15}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6 w-full max-w-[220px]">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" 
                  style={{ backgroundColor: item.fill }} 
                />
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-white font-semibold text-base">
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