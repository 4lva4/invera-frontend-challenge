"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useUserStore } from "@/store/useUserStore";
import { Layout } from "@/components/templates/Layout";


const UserCategory = dynamic(
  () => import("@/components/organisms/UserCategory").then((mod) => mod.UserCategory),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-22.5 bg-[#EEEFF0] dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 p-5 rounded-lg flex items-center justify-between transition-all hover:shadow-md dark:hover:border-white/10" />
        ))}
      </div>
    ),
  }
)
const UsersChart = dynamic(
  () => import("@/components/ui/chart").then((mod) => mod.Chart),
  {
    ssr: false,
    loading: () => (
      <div className="h-97.5 w-full bg-[#EEEFF0] dark:bg-[#1A1A1A] animate-pulse rounded-3xl border border-black/10 dark:border-white/10" />
    ),
  }
);
const UsersTable = dynamic(
  () => import("@/components/organisms/UsersTable").then((mod) => mod.UsersTable),
  {
    ssr: false,
    loading: () => (
       <div className="mt- h-151 flex flex-col border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm bg-neutral bg-[#EEEFF0] dark:bg-[#1A1A1A]">
    </div>
    ),
  }
)

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
      <UserCategory />
      <UsersChart />
      <UsersTable />
    </Layout>
  );
}
