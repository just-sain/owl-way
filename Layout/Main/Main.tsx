import React from 'react'
import { IMainProps } from './Main.props'
//styles
import styles from './Main.module.scss'

const Main = ({ children, ...props }: IMainProps): JSX.Element => {
	return <main {...props}>{children}</main>
}

export default Main
