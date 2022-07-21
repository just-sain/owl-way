import Head from 'next/head'
import { useState } from 'react'
import Button from '../components/Button/Button'
import HTag from '../components/HTag/HTag'
import Paragraph from '../components/Paragraph/Paragraph'
import Rating from '../components/Rating/Rating'
import Tag from '../components/Tag/Tag'

const Home = (): JSX.Element => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
	const [rating, setRating] = useState<number>(4)

	return (
		<div className={isDarkMode ? 'dark' : 'light'}>
			<Head>
				<link rel='stylesheet' href={isDarkMode ? '/style-modes/darkMode.css' : '/style-modes/lightMode.css'} />

				<title>Owl way | by just.sain</title>
			</Head>
			<div>
				<HTag tag='h1'>Hello, World!</HTag>

				<Button appearance='primary' arrow='right' onClick={() => setIsDarkMode(true)}>
					dark
				</Button>
				<Button appearance='ghost' arrow='right' onClick={() => setIsDarkMode(false)}>
					light
				</Button>

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
				<Rating rating={5} isEditable={false} />
			</div>
		</div>
	)
}

export default Home
