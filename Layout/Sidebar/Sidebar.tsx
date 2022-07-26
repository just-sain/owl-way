import Router from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
//interfaces
import { ISidebarProps } from './Sidebar.props'
// components
import { Logo, Button, HTag, Input, Textarea } from '../../components'
import Menu from '../Menu/Menu'
//styles
import styles from './Sidebar.module.scss'

interface ISearchForm {
	search: string
}

const Sidebar = ({ setThemeMode, className, ...props }: ISidebarProps): JSX.Element => {
	const { handleSubmit, control } = useForm<ISearchForm>({ defaultValues: { search: '' }, mode: 'onSubmit' })

	const onSubmit: SubmitHandler<ISearchForm> = ({ search }) => {
		debugger
		Router.push({
			pathname: '/search',
			query: { q: search }
		})
	}

	return (
		<aside className={className} {...props}>
			<div className={styles.sidebar}>
				<Logo className={styles.fragment} />

				<form className={`${styles.fragment} ${styles.search}`} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='search'
						control={control}
						defaultValue=''
						render={({ field }) => <Input {...field} withButton placeholder='Поиск...' type='text' />}
					/>
				</form>

				<div className={styles.fragment}>
					<HTag tag='h2' className={styles.title}>
						Меню
					</HTag>
					<Menu />
				</div>

				<div className={styles.fragment}>
					<HTag tag='h2' className={styles.title}>
						Тема
					</HTag>
					<Button appearance='primary' arrow='right' onClick={() => setThemeMode('dark')}>
						Темная
					</Button>
					<Button appearance='ghost' arrow='right' onClick={() => setThemeMode('light')}>
						Светлая
					</Button>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
