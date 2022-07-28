import { RefCallBack } from 'react-hook-form'
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

export interface ITextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	inputRef?: RefCallBack
}
