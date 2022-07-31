import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import up from './arrow-up.svg';
import close from './close.svg';
import menu from './menu.svg';

export const icons = {
	up,
	close,
	menu,
};
export type IconNameType = keyof typeof icons;

export interface IButtonIconProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  appearance?: 'primary' | 'white';
  icon: IconNameType;
  logic: 'just-btn' | 'up';
}
