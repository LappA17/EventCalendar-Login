import Event from '../pages/Event';
import Login from '../pages/Login';

interface IRoutes {
	path: string; //путь до компонента
	component: React.ComponentType; //сам компонент
	exact?: boolean; //позволяет однозначно индефицировать маршрут
}

export enum RouteNames {
	LOGIN = '/login',
	EVENT = '/',
}

export const publicRoutes: IRoutes[] = [{ path: RouteNames.LOGIN, exact: true, component: Login }];

export const privateRoutes: IRoutes[] = [
	{ path: RouteNames.EVENT, exact: false, component: Event },
];

//У нас на календарь могут попасть только авторизованные пользователи, а неавторизованные попадают только на маршрут с логином, по-этому создадим два путя

// У евента сделаем стартовый путь - просто Слеш
