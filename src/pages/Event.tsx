import { Button, Layout, Modal, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const { fetchGuests, createEvent, fetchEvents } = useActions();
	const { guests, events } = useTypedSelector(state => state.event);
	const { user } = useTypedSelector(state => state.auth);

	useEffect(() => {
		fetchGuests();
		fetchEvents(user.username);
	}, []);

	const addNewEvent = (event: IEvent) => {
		setModalVisible(false);
		createEvent(event);
	};

	return (
		<Layout>
			<EventCalendar events={events} />
			<Row justify="center">
				<Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
			</Row>
			<Modal
				title="Добавить событие"
				visible={modalVisible}
				footer={null}
				onCancel={() => setModalVisible(false)}
			>
				<EventForm guests={guests} submit={addNewEvent} />
			</Modal>
		</Layout>
	);
};

export default Event;

// у модалки этой библиотечки есть фция visible которая регулирует показыывать ли модалку или нет
// footer={null} потому что по умолчанию в этой библиотечки есть две кнопки ок и закрыть и мы их хотим убрать

//всопользуем Эффектом для подругзки списка пользователей что бы он сразу же при первой отрисовки показался

// const {guests} = useTypedSelector(state => state.event) - Мы с помощью хука useTypedSelector получаем из нашего состояние список гостей guests который потом передаем в EventForm в качестве пропсов где уже по ним иттерируемся и из них делаем option для нашего селекта

//так как у нас форма - переиспользаванная, мы будем логику определять логику сабмитане в форме(евентформ) а здесь в Евент(то-есть на Компонент выше)
//В одном случае мы созданный евент добавляем в локальное состояние компонента, в другом в глобальное.
//Создадим новый екшенКрейтор что бы добавлять новый созданный евент в наше глобальное хранилище

//что бы убедится что состояние обновляется и туда добавляется новый элемент мы в шаблон добавим {JSON.stringify(events)}, а events мы получили с стейта

//Если мы сейчас добавим евенты, потом обнов страницу то евенты пропадут, но если мы добавим еще раз евент то при прлюсуется уже к тем что мы добавили раньше не смотря на то что они пропали со страницы. Эта ошбика проихсодит потому что у нас нет первчиной загрузки этих событий createEvent(event) из локалсторедж, потому что пока что мы их только создаем

//addNewEvent - что бы создание событий у нас закрывалось модальное окно

// fetchEvents - благодрая этому екшенкрейторы когда мы обновляем или первично заходим на страницу у нас сохраняются все евенты и первично рендерятся
