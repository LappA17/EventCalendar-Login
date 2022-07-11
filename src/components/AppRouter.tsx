import React from 'react';
//import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

const AppRouter = () => {
	const { isAuth } = useTypedSelector(state => state.auth);
	return isAuth ? (
		<Switch>
			{privateRoutes.map(route => (
				<Route
					path={route.path}
					exact={route.exact}
					component={route.component}
					key={route.path}
				/>
			))}
			<Redirect to={RouteNames.EVENT} />
		</Switch>
	) : (
		<Switch>
			{publicRoutes.map(route => (
				<Route
					path={route.path}
					exact={route.exact}
					component={route.component}
					key={route.path}
				/>
			))}
			<Redirect to={RouteNames.LOGIN} />
		</Switch>
	);
};

export default AppRouter;

//switch позволяет выбрать один маршрут из тех которые находятся внутри него, и если не один из маршрутов не был найден то можем сделать редирект

// <Redirect to={RouteNames.LOGIN}/> - если пользователь не попал не в один из наших роутов то редиректним на логин

// После того как мы создали export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; мы сразу можем увидеть какие у нас есть редьюсеры, какие есть поля, у нас есть автокомплит , то-есть мы вместо этого const {} = useSelector(state => state.) сделали вот это const {} = useTypedSelector(state => state.)
