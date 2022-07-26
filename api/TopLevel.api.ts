import axios from 'axios'
// interfaces
import { IMenuItem } from '../interfaces/menu.interface'
import { ITopPageModule, TopLevelCategory } from '../interfaces/page.interface'
import { IProductModule } from '../interfaces/product.interface'

export const TopLevelApi = {
	getMenuItems: async (firstCategory: TopLevelCategory) => {
		const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
			firstCategory
		})
		return menu
	},
	getMenuItemByAlias: async (alias: string) => {
		const { data: page } = await axios.get<ITopPageModule>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${alias}`)
		return page
	},
	getProductModule: async (category: string, limit: number = 10) => {
		const { data: products } = await axios.post<IProductModule[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`, {
			category: category,
			limit: 10
		})
		return products
	}
}
