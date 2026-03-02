import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center rounded-[0.7rem] border px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--electric)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--electric)] text-[var(--bg)] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_26px_rgba(8,247,255,0.33)] hover:-translate-y-0.5 hover:bg-[var(--electric-strong)]',
        secondary:
          'border-[color:var(--trace-cyan)] bg-[rgba(10,22,43,0.82)] text-[var(--text)] shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_0_0_1px_rgba(8,247,255,0.12)_inset] hover:-translate-y-0.5 hover:border-[var(--electric-strong)]'
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
