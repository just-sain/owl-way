import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/app/app.slice';
import { menuActions } from '../store/menu/menu.slice';
import { productsActions } from '../store/products/products.slice';

const allActions = {
	...appActions,
	...productsActions,
	...menuActions,
};

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActions, dispatch);
};
