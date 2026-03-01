import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-cyan-400 text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_22px_rgba(53,220,255,0.26)] hover:-translate-y-0.5 hover:bg-cyan-300',
        secondary:
          'border border-fuchsia-300/35 bg-fuchsia-950/16 text-violet-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] hover:-translate-y-0.5 hover:border-fuchsia-300/55'
      },
      size: {
        md: 'h-11',
        lg: 'h-12 px-5 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
