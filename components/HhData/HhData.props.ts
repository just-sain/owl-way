import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { ICardProps } from '../Card/Card.props'

export interface IHhDataProps extends ICardProps {
	count: number
	juniorSalary: number
	middleSalary: number
	seniorSalary: number
}
