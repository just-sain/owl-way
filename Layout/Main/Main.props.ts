import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IMainProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode
}
