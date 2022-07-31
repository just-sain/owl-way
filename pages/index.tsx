import { GetStaticProps } from 'next';
import { wrapper } from '../store/store';
import { useEffect, useState } from 'react';
import { useActions } from '../hooks';
// API
import axios from 'axios';
import { API } from '../helpers/api';
// interfaces
import { IMenuItem } from '../interfaces/menu.interface';
// hoc
import withLayout from '../Layout/Layout';
// components
import { HTag, Paragraph, Rating, Tag } from '../components/additional';

const Home = ({ menu }: IHomeProps): JSX.Element => {
	const [rating, setRating] = useState<number>(4);
	const { setMenu } = useActions();

	useEffect(() => {
		if (menu.length === 0) setMenu(menu);
	}, []);

	return (
		<section>
			<div>
				<HTag tag='h1'>Hello, World!</HTag>
				<Paragraph size='large'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihilprovident cum nostrum incidunt ea beatae voluptatum
					aperiamperspiciatis. Mollitia placeat, amet consequatur consectetur vitaequidem officiis natus impedit modi.
				</Paragraph>
				<Paragraph size='medium'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil provident cum nostrum incidunt ea beatae voluptatum aperiam
					perspiciatis. Mollitia placeat, amet consequatur consectetur vitae quidem officiis natus impedit modi.
				</Paragraph>
				<Paragraph size='small'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil provident cum nostrum incidunt ea beatae voluptatum aperiam
					perspiciatis. Mollitia placeat, amet consequatur consectetur vitae quidem officiis natus impedit modi.
				</Paragraph>

				<Tag color='green' size='small' href='https://vk.com'>
					45$
				</Tag>
				<Tag color='red' size='medium'>
					hh
				</Tag>
				<Tag color='ghost' size='large'>
					what?
				</Tag>
				<Rating rating={rating} isEditable setRating={setRating} />
				<Rating rating={5} />
			</div>
		</section>
	);
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<IHomeProps> = wrapper.getStaticProps(store => async () => {
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

interface IHomeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
}
