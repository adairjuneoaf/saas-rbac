'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const Separator = ({
  ref,
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-border shrink-0',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
