import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface IButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode;
  appearance: 'primary' | 'ghost' | 'transparent';
  arrow?: 'right' | 'down' | 'none';
  href?: string;
}
