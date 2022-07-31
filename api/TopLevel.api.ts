import axios from 'axios';
import { API } from '../helpers/api';
// interfaces
import { IMenuItem } from '../interfaces/menu.interface';
import { ITopPageModule, TopLevelCategory } from '../interfaces/page.interface';
import { IProductModule } from '../interfaces/product.interface';

export const topLevelApi = {
	getMenuItems: async (firstCategory: TopLevelCategory) => {
		const { data } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory
		});
		return data;
	},
	getMenuItemByAlias: async () => {
		const { data } = await axios.get<ITopPageModule>(API.topPage.byAlias);
		return data;
	},
	getProductModule: async (category: string, limit = 10) => {
		const { data } = await axios.post<IProductModule[]>(API.product.find, {
			category,
			limit
		});
		return data;
	}
};
