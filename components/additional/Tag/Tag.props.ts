import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ITagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode
	size: 'small' | 'medium' | 'large'
	color: 'ghost' | 'red' | 'green' | 'gray' | 'primary'
	href?: string
}
