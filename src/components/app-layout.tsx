"use client";

import BottomNav from '@/components/bottom-nav';
import Header from '@/components/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary">
      <main className="mx-auto max-w-md bg-background">
        <div className="relative flex h-screen flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto pb-20">{children}</div>
          <BottomNav />
        </div>
      </main>
    </div>
  );
}
