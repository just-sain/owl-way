export interface IProductCharacteristic {
	name: string
	value: string
}

export interface IBlog {
	text: string
	_id: string
}

export interface IReviewModule {
	_id: string
	name: string
	title: string
	description: string
	rating: number
	createAt: Date
}

export interface IProductModule {
	_id: string
	categories: string[]
	tags: string[]
	title: string
	image: string
	description: string
	link: string
	price: number
	credit: number
	oldPrice: number
	characteristics: IProductCharacteristic[]
	advantages: string
	initialRating: number
	createdAt: Date
	updatedAt: Date
	__v: number
	html: string
	blog: IBlog
	companyId: string
	clicks: number
	reviews: IReviewModule[]
	reviewCount: number
	reviewAvg?: number
}
