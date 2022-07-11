import { AppDispatch } from './../../index';
import { IUser } from '../../../models/IUser';
import {
	AuthActionEnum,
	SetAuthAction,
	SetErrorAction,
	SetIsLoadingAction,
	SetUserAction,
} from './types';
import axios from 'axios';
import UserService from '../../../api/User.service';

export const AuthActionCreators = {
	setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
	setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
	setIsLoading: (payload: boolean): SetIsLoadingAction => ({
		type: AuthActionEnum.SET_IS_LOADING,
		payload: payload,
	}),
	setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
	//login - асинхроный екшенКрейтор
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true));
			setTimeout(async () => {
				const response = await UserService.getUsers();
				const mockUser = response.data.find(
					user => user.username === username && user.password === password
				);
				if (mockUser) {
					localStorage.setItem('auth', 'true');
					localStorage.setItem('username', mockUser.username);
					dispatch(AuthActionCreators.setUser(mockUser));
					dispatch(AuthActionCreators.setIsAuth(true));
				} else {
					dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
				}
				dispatch(AuthActionCreators.setIsLoading(false));
			}, 1000);
		} catch (e) {
			dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
		}
	},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth');
		localStorage.removeItem('username');

		//Обнулим состояние
		dispatch(AuthActionCreators.setUser({} as IUser));
		dispatch(AuthActionCreators.setIsAuth(false)); //чтобы нас редиректнуло на страницу с логином
	},
};
//так как логин - асинхроный екшенкрейтор и так как мы используем Редакс-thunk то нам нужно из этой фции, вернуть новую фцию которая аргументом принимает диспатч и саму логику мы будем описывать внутри вот этой вот возвращаемой фции

//response.data.find(user => user.username === username) // мы ищем пользователя, у которого юзернейм равен тому что мы вели в форму и так же с паролем, то-есть мы сравниваем юзера из массива с теми данными которые передали в эту фцию

// if (mockUser) { если пользователь авторизовался, то нам нужно где-то хранить эту информацию и мы добавляем флаш аус ему и юссернейм в локалсторедж
// dispatch(AuthActionCreators.) помимо локалСторедж нам нужно добавлять флаг auth в состояние
// dispatch(AuthActionCreators.setUser(mockUser)) - помещаем информацию о пользователи

// {} as IUser - это пустой Объект типа IUser
