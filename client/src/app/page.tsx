'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Layout } from '@/components/layout/Layout';
import { UserStats } from '@/components/organisms/UserStats';

export default function DashboardPage() {
  const fetchData = useUserStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <UserStats />
      <div className="mt-8 bg-[#1e1e1e] border border-white/5 rounded-2xl p-20 text-center text-gray-500">
        Statistics Chart Section
      </div>
      <div className="mt-8 bg-[#1e1e1e] border border-white/5 rounded-2xl p-20 text-center text-gray-500">
        All Users Table Section
      </div>
    </Layout>
  );
}