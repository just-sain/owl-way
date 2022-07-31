import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IParagraphProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
}
