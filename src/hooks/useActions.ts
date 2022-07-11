import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allActionCreators } from '../store/reducers/action-creators';

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActionCreators, dispatch);
};
//Мы возвращаем екшенКрейторы к которым уже прибиндин этот диспатч

// можно AuthActionCreators получать с конкретного файла, но у нас может быть много редьюсеров, по-этому в корни папки reducer создадим action-creators в который уже будет запихивать все екшены со всего приложения
