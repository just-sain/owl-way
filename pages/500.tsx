import { ErrorCode } from '../components/main';
import withLayout from '../Layout/Layout';

const Error500 = (): JSX.Element => {
	return <ErrorCode errorCode='500'>Внутренняя ошибка сервера</ErrorCode>;
};

export default withLayout(Error500);
