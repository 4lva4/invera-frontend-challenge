import React, { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { AddUserModal } from '../molecules/AddUserModal';
import { ModeToggle } from '../ui/ModeToggle';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e3e5e6] dark:bg-[#212121] text-neutral-900 dark:text-white font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      <header className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center border-b border-black/5 dark:border-white/5">
        <h1 className="text-2xl font-bold tracking-tighter">Users</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#7B99FF] hover:bg-indigo-700 text-white px-9 py-0.5 font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            Add user
          </Button>
        </div>
        <AddUserModal 
          isOpen={isAddModalOpen} 
          onOpenChange={setIsAddModalOpen} 
          userToEdit={null} 
        />
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {children}
      </main>
      <Toaster position="bottom-right" closeButton richColors />
    </div>
  );
};