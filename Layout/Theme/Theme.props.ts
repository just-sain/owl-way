import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ThemeModeType } from '../../store/app/app.interface';

export interface IThemeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setThemeMode: (themeMode: ThemeModeType) => void;
	themeMode: ThemeModeType;
}
