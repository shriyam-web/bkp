'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type ModeToggleProps = {
  /** Always-dark surfaces (mobile menu) — styles ignore site theme */
  inverted?: boolean;
  className?: string;
};

/** Direct light/dark toggle. Plain button avoids shadcn outline/theme conflicts. */
export function ModeToggle({ inverted = false, className }: ModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
        inverted
          ? 'bg-white/10 text-white hover:bg-white/20'
          : 'border border-border bg-background text-foreground hover:bg-muted',
        className
      )}
    >
      {!mounted ? (
        <Sun className="h-4 w-4 opacity-40" />
      ) : isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
