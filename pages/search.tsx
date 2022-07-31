import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useActions } from '../hooks';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { wrapper } from '../store/store';
import { API } from '../helpers/api';
import withLayout from '../Layout/Layout';
import { IMenuItem } from '../interfaces/menu.interface';

const search = ({ menu }: ISearchProps): JSX.Element => {
	const { setMenu } = useActions();

	useEffect(() => {
		if (menu.length === 0) setMenu(menu);
	}, []);

	const { query } = useRouter();

	return <div>Your search was: {query.q}</div>;
};

export default withLayout(search);

export const getStaticProps: GetStaticProps<ISearchProps> = wrapper.getStaticProps(store => async () => {
	const firstCategory = store.getState().menu.firstCategory;
	const menu = store.getState().menu.menu;
	let resultMenu;
	if (menu.length === 0) {
		const { data } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory
		});
		resultMenu = data;
	}

	return {
		props: {
			menu: resultMenu as IMenuItem[],
			firstCategory
		}
	};
});

interface ISearchProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
}
