import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import axios from 'axios';
// interfaces
import { IMenuItem } from '../../interfaces/menu.interface';
// hoc
import withLayout from '../../Layout/Layout';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';

const Type = ({ firstCategory }: ITypeProps): JSX.Element => {
	return <section>type: {firstCategory}</section>;
};

export default withLayout(Type);

// path
export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<IMenuItem[]>(
			`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
			{
				firstCategory: m.id,
			}
		);
		paths = paths.concat(menu.flatMap((s) => s.pages.map(() => `/${m.route}`)));
	}

	return {
		paths: firstLevelMenu.map((m) => `/${m.route}`),
		fallback: true,
	};
};
// props
export const getStaticProps: GetStaticProps<ITypeProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) return { notFound: true };
	const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
	if (!firstCategoryItem) return { notFound: true };

	const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
		firstCategory: firstCategoryItem.id,
	});
	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id,
		},
	};
};

interface ITypeProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: number;
}
