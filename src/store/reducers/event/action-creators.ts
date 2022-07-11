import axios from 'axios';
import { AppDispatch } from '../..';
import UserService from '../../../api/User.service';
import { IEvent } from '../../../models/IEvent';
import { IUser } from '../../../models/IUser';
import { EventActionEnum, SetEventsAction, SetGuestsAction } from './types';

export const EventActionCreators = {
	setGuests: (payload: IUser[]): SetGuestsAction => ({
		type: EventActionEnum.SET_GUESTS,
		payload,
	}),
	setEvents: (payload: IEvent[]): SetEventsAction => ({
		type: EventActionEnum.SET_EVENTS,
		payload,
	}),
	fetchGuests: () => async (dispatch: AppDispatch) => {
		try {
			const response = await UserService.getUsers();
			dispatch(EventActionCreators.setGuests(response.data));
		} catch (e) {
			console.log(e);
		}
	},
	createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem('events') || '[]';
			const json = JSON.parse(events) as IEvent[];
			json.push(event);
			dispatch(EventActionCreators.setEvents(json));
			localStorage.setItem('events', JSON.stringify(json));
		} catch (e) {
			console.log(e);
		}
	},
	fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem('events') || '[]';
			const json = JSON.parse(events) as IEvent[];
			const currentUserEvents = json.filter(
				ev => ev.author === username || ev.guest === username
			);
			dispatch(EventActionCreators.setEvents(currentUserEvents));
		} catch (e) {
			console.log(e);
		}
	},
};

// fetchGuests - с помощью этого екшена будем получаь пользователей из файла

// dispatch(EventActionCreators.setGuests(response.data)) - у нас ошибка потому что диспатч не воспринимает этот екшенКрейтор, по той приччине что мы не добавили в корневой радьюсер редьюсер который связан с эвентами, по-этому пропишем следующее ниже
/*import auth from './auth';
import event from './event'

export default {
	auth,
	event
}; */

//createEvent
// const events = localStorage.getItem('events') - так как мы еветы храним в локалсторедже и если нам ничего не вернулось то будем получать пустой массив
// поскольку мы в локалсторедж храним наши данные как строку, то нам нужно приобразоывать их в к джаваскрипт объектам const json = JSON.parse(events)
// json.push(event) - добавляем в массив новосозоданный event
// dispatch(EventActionCreators.setEvents(json)) - помещаем этот массив в состояние что бы мы увидели обновление интерфейса и новое созданное событие
// localStorage.setItem('events', JSON.stringify(json)) - после помещаем этот массив в локалсторедж что бы после ОБНОВЛЕНИЯ страницы вся эта информация не пропалa

//fetchEvents
/*Мы так же получаем данные из локалстореджа, расспармсим их и помещаем в состояние
const events = localStorage.getItem('events') || '[]';
const json = JSON.parse(events) as IEvent[]; */
//const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username) - Но в локалсторедж мы храним все данные, а нам необходимо получать данные конкретного пользователя, либо он является гостем либо автором того или инного события
//dispatch(EventActionCreators.setEvents(currentUserEvents)) - диспатчем екшенКрейтор и передаем туда отфильтрованный массив
