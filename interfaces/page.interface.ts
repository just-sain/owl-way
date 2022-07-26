export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface ITopPageAdvantage {
	title: string
	description: string
	_id: string
}

export interface IHhData {
	count: number
	juniorSalary: number
	middleSalary: number
	seniorSalary: number
	updatedAt: Date
	_id: string
}

export interface Blog {
	h1: string
	metaTitle: string
	metaDescription: string
	views: number
	_id: string
}

export interface ISravnikus {
	metaTitle: string
	metaDescription: string
	qas: any[]
	_id: string
}

export interface ILearningClub {
	metaTitle: string
	metaDescription: string
	qas: any[]
	_id: string
}

export interface ITopPageModule {
	_id: string
	tags: string[]
	secondCategory: string
	alias: string
	title: string
	category: string
	seoText?: string
	tagsTitle: string
	metaTitle: string
	metaDescription: string
	firstCategory: number
	advantages?: ITopPageAdvantage[]
	createdAt: Date
	updatedAt: Date
	hh?: IHhData
	qas: any[]
	addresses: any[]
	categoryOn: string
	blog: Blog
	sravnikus: ISravnikus
	learningclub: ILearningClub
}
