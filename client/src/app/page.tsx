'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/store/useUserStore';
import { UserStats } from '@/components/organisms/UserStats';
import { Layout } from '@/components/templates/Layout';

const Chart = dynamic(
  () => import('@/components/ui/chart').then((mod) => mod.Chart),
  { 
    ssr: false,
    loading: () => <div className="h-[350px] w-full bg-[#1e1e1e] animate-pulse rounded-3xl" />
  }
);

export default function DashboardPage() {
  const fetchData = useUserStore((state) => state.fetchData);

useEffect(() => {
  const controller = new AbortController();
  const currentUsers = useUserStore.getState().users;

  if (currentUsers.length === 0) {
    fetchData(controller.signal); 
  }

  return () => {
    controller.abort();
  };
}, [fetchData]);

  return (
    <Layout>
      <UserStats />
      <Chart />
    </Layout>
  );
}