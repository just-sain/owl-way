import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { ThemeModeType } from '../Layout'

export interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setThemeMode: (themeMode: ThemeModeType) => void
}
