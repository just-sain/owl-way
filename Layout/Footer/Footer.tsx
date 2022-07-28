import React from 'react'
import { format } from 'date-fns'
import { IFooterProps } from './Footer.props'
//styles
import cn from 'classnames'
import styles from './Footer.module.scss'
import Link from 'next/link'

const Footer = ({ className, ...props }: IFooterProps): JSX.Element => {
	const date = format(new Date(), 'yyyy')
	const dateText = date === '2022' ? '2022' : `2022 - ${date}`

	return (
		<footer {...props} className={cn(className, styles.footer)}>
			<p>Owl Way © {dateText} Все права защищены</p>
			<Link href='https://courses-top.ru/user-agreement.docx'>
				<a target='_blank'>Пользовательское соглашение</a>
			</Link>
			<Link href='https://courses-top.ru/confidenial.docx'>
				<a target='_blank'>Политика конфиденциальности</a>
			</Link>
		</footer>
	)
}

export default Footer
