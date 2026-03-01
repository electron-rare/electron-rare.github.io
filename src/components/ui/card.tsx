import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-violet-200/20 bg-violet-100/5 p-5 shadow-[0_12px_30px_rgba(7,6,20,0.25),0_0_0_1px_rgba(255,255,255,0.03)_inset]',
        className
      )}
      {...props}
    />
  );
}
