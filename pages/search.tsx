import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import withLayout from '../Layout/Layout'

const search = (): JSX.Element => {
	const { query } = useRouter()

	return <div>Your search was: {query.q}</div>
}

export default withLayout(search)

export const getStaticProps: GetStaticProps<ISearchProps> = async () => {
	const firstCategory = 0

	return {
		props: {}
	}
}

interface ISearchProps extends Record<string, unknown> {}
