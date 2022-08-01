import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '../../helpers/helpers';
// interfaces
import { IMenuItem } from '../../interfaces/menu.interface';
import { ITopPageModule, TopLevelCategory } from '../../interfaces/page.interface';
import { IProductModule } from '../../interfaces/product.interface';
// hoc
import withLayout from '../../Layout/Layout';
// component
import Head from 'next/head';
import { Error404 } from '../404';
import { TopPageComponent } from '../../components/main';
import { API } from '../../helpers/api';

const TopPage = ({ page, products, firstCategory }: ITopPageProps): JSX.Element => {
	if (!page || !products) return <Error404 />;

	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name='description' content={page.metaDescription} />
				<meta property='og:title' content={page.metaTitle} />
				<meta name='og:description' content={page.metaDescription} />
				<meta name='og:type' content='article' />
			</Head>
			<TopPageComponent firstCategory={firstCategory} page={page} products={products} />
		</>
	);
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
			firstCategory: m.id
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
	}
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) return { notFound: true };
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
	if (!firstCategoryItem) return { notFound: true };

	try {
		const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id
		});
		if (menu.length == 0) return { notFound: true };
		const { data: page } = await axios.get<ITopPageModule>(API.topPage.byAlias + params.alias);
		const { data: products } = await axios.post<IProductModule[]>(API.product.find, {
			category: page.category,
			limit: 10
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		};
	} catch {
		return { notFound: true };
	}
};

interface ITopPageProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: TopLevelCategory;
	page: ITopPageModule;
	products: IProductModule[];
}
