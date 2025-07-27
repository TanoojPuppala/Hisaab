"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, History, LayoutDashboard, Upload, Wallet2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'AI Chat', icon: Bot },
  { href: '/upload', label: 'Upload', icon: Upload },
  { href: '/history', label: 'History', icon: History },
  { href: '/wallet', label: 'Wallet', icon: Wallet2 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 mx-auto h-16 max-w-md border-t bg-background/95 backdrop-blur-sm">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
