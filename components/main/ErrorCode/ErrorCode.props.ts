import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IErrorCodeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	errorCode: '404' | '500';
}
