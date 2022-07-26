import React from 'react'
import { IHeaderProps } from './Header.props'
//styles
import styles from './Header.module.scss'

const Header = ({ ...props }: IHeaderProps): JSX.Element => {
	return (
		<div {...props}>
			<h1>Header</h1>
		</div>
	)
}

export default Header
