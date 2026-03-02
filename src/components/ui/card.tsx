import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={cn(
        'circuit-card rounded-2xl p-5 border-[color:var(--line-soft)] shadow-[0_12px_30px_rgba(7,6,20,0.25),0_0_0_1px_rgba(255,255,255,0.03)_inset]',
        className
      )}
      {...props}
    />
  );
}
