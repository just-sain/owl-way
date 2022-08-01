import withLayout from '../Layout/Layout';
import { ErrorCode } from '../components/main';

export const Error404 = (): JSX.Element => {
	return <ErrorCode errorCode='404'>Страница не найдена</ErrorCode>;
};

export default withLayout(Error404);
