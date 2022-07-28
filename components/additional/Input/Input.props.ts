import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { RefCallBack } from 'react-hook-form'

export interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	withButton?: boolean
	inputRef?: RefCallBack
}
