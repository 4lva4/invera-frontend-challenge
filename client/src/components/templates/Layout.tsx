import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="max-w-300 mx-auto pt-10 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="bg-[#7c94ff] hover:bg-[#6b82e6] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
          Add user
        </button>
      </header>
      
      <main className="max-w-300 mx-auto p-6 space-y-8">
        {children}
      </main>
    </div>
  );
};