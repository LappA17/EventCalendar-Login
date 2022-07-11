import { Calendar } from 'antd';
import { Moment } from 'moment';
import { FC } from 'react';
import { IEvent } from '../models/IEvent';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
	events: IEvent[];
}
const EventCalendar: FC<EventCalendarProps> = props => {
	function dateCellRender(value: Moment) {
		const formatedData = formatDate(value.toDate());
		const currentDayEvents = props.events.filter(ev => ev.date === formatedData);
		return (
			<div>
				{currentDayEvents.map((ev, i) => (
					<div key={i}>{ev.description}</div>
				))}
			</div>
		);
	}

	return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;

// const currentDayEvents = props.events.filter(ev => ev.date === formatDate()) -  пробежимся по массиву с событиями и убедимся что там есть объект с такой датой, мы используем не find а фильтер поскольку на одну дату у нас может быть несколько событий, и нам нужно получить не конкретное событие, а массив этих событий, что бы отрисовать сразу все
//укажем ключу индекс потому что у ev нет ничего уникального, здесь так можно сделать по-сколько удаление событий не подурузумивается

//Если мы сейчас под юзером добавим события, потом перелогинимся и зайдем к примеру под админом то у нас событие не будут видны юзера, но после обновления страницы они появятся, так происходит потому что в момент когда мы логинимся при фильтрации в fetchEvents(в екшенКрейторе) наш юзернейм - пустой. Что бы это подправить нужно мы в auth=>acriton-creators мы вызываем isAuth раньше чем setUser
/*dispatch(AuthActionCreators.setIsAuth(true));
  dispatch(AuthActionCreators.setUser(mockUser)); */
//И получается так что у нас отрисовывается этот компонент
/*
useEffect(() => {
		fetchGuests();
		fetchEvents(user.username);
	}, []);
Эти два запрос отработали но юзернейм у нас пустой
Что бы это решить нужно просто поменять местами   dispatch(AuthActionCreators.setUser(mockUser));  и dispatch(AuthActionCreators.setIsAuth(true));
Теперь у нас сначало будет устанавливаться пользователь и только потом перерисовываься интерфейс */
