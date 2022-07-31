import Router, { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
//interfaces
import { ISidebarProps } from './Sidebar.props';
// components
import { Logo, HTag } from '../../components/additional';
import { SearchInput } from '../../components/forms';
import Menu from '../Menu/Menu';
import Theme from '../Theme/Theme';
//styles
import styles from './Sidebar.module.scss';
import { useActions, useTypedSelector } from '../../hooks';

interface ISearchForm {
	search: string;
}

const Sidebar = ({ className, ...props }: ISidebarProps): JSX.Element => {
	const router = useRouter();
	const { changeThemeMode } = useActions();
	const themeMode = useTypedSelector(state => state.app.themeMode);
	const { register, handleSubmit } = useForm<ISearchForm>({
		defaultValues: { search: (router.query.q as string) ?? '' },
		mode: 'onSubmit'
	});

	const onSubmit: SubmitHandler<ISearchForm> = ({ search }) => {
		Router.push({
			pathname: '/search',
			query: { q: search }
		});
	};

	return (
		<aside className={className} {...props}>
			<div className={styles.sidebar}>
				<Logo className={styles.fragment} />

				<form role={'search'} className={`${styles.fragment} ${styles.search}`} onSubmit={handleSubmit(onSubmit)}>
					<SearchInput {...register('search')} placeholder='Поиск...' type='text' />
				</form>

				<div className={styles.fragment}>
					<HTag tag='h2' className={styles.title}>
						Меню
					</HTag>
					<Menu />
				</div>

				<Theme themeMode={themeMode} setThemeMode={() => changeThemeMode(themeMode === 'dark' ? 'light' : 'dark')} className={styles.fragment} />
			</div>
		</aside>
	);
};

export default Sidebar;
