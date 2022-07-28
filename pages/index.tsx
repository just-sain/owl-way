import { GetStaticProps } from 'next'
import { useState } from 'react'
import axios from 'axios'
// interfaces
import { IMenuItem } from '../interfaces/menu.interface'
import { TopLevelCategory } from '../interfaces/page.interface'
// hoc
import withLayout from '../Layout/Layout'
// components
import { HTag, Paragraph, Rating, Tag } from '../components/additional'

const Home = ({ menu }: IHomeProps): JSX.Element => {
	const [rating, setRating] = useState<number>(4)

	return (
		<section>
			<div>
				<HTag tag='h1'>Hello, World!</HTag>
				<Paragraph size='large'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil provident cum nostrum incidunt ea beatae voluptatum aperiam
					perspiciatis. Mollitia placeat, amet consequatur consectetur vitae quidem officiis natus impedit modi.
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
				<Rating rating={5}  />
			</div>
		</section>
	)
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const firstCategory = TopLevelCategory.Courses
	const { data: menu } = await axios.post<IMenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
		firstCategory
	})

	return {
		props: {
			menu,
			firstCategory
		}
	}
}

interface IHomeProps extends Record<string, unknown> {
	menu: IMenuItem[]
	firstCategory: number
}
