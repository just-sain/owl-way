import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface IRatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isEditable?: boolean
	rating: number
	setRating?: (rating: number) => void
}
