import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
	guests: IUser[];
	submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = props => {
	const [event, setEvent] = useState<IEvent>({
		author: '',
		date: '',
		description: '',
		guest: '',
	} as IEvent);
	const { user } = useTypedSelector(state => state.auth);

	const selectDate = (date: Moment | null) => {
		if (date) {
			// делаем проверку потому что может вернуться null
			setEvent({ ...event, date: formatDate(date.toDate()) });
		}
	};

	const submitForm = () => {
		props.submit({ ...event, author: user.username });
		console.log({ ...event, author: user.username });
	};

	return (
		<Form onFinish={submitForm}>
			<Form.Item label="Описания события" name="description" rules={[rules.required()]}>
				<Input
					onChange={e => setEvent({ ...event, description: e.target.value })}
					value={event.description}
				/>
			</Form.Item>
			<Form.Item
				label="Дата события"
				name="date"
				rules={[
					rules.required(),
					rules.isDateAfter('Нельзя создавать событие в прошлом времени'),
				]}
			>
				<DatePicker onChange={date => selectDate(date)} />
			</Form.Item>

			<Form.Item label="Выберите гостя" name="guest" rules={[rules.required()]}>
				<Select onChange={(guest: string) => setEvent({ ...event, guest })}>
					{props.guests.map(guest => (
						<Select.Option key={guest.username} value={guest.username}>
							{guest.username}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Row justify="end">
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit" style={{ marginRight: 42 }}>
						Создать
					</Button>
				</Form.Item>
			</Row>
		</Form>
	);
};

export default EventForm;

// required: (message: string = 'Обязательное поле') так как мы задали месседж по умолчанию то передавтаь в rules ничего не приходится

// Всё что у нас элементы формы нужно оборачивать в Form.Item !

//Нам нужно получать и сохранять пользователей в эти <Select.Option> и для этого мы создадим еще один reducer - event

// EventFormProps - мы гостей не получаем из состояния, а принимаем пропсом, что бы эту форму можно можно было переиспользовать и в другой части приложения у нас в теории может быть другой список пользователей

/* Мы проинициализируем по-дефолту каждое свойство Объекта, что бы понимать какие они будут и чему будут равняться для того что бы в дальнейшей связывать с инпутами, с элементами формы, селектами, дейтпикарами и так далее
const [event, setEvent] = useState<IEvent>({
	author: '',
	date: '',
	description: '',
	guest: '',
} as IEvent); */
// <Select onChange={(guest) => setEvent({...event, guest})}> передаем старый евент и заменяем у него поле гость

// const selectDate = (date: Moment) => { - Moment - это из библиотечки встроенной в antd
/* Благодаря этой библиотечки после того как мы выбираем Дату мы в логах получаем вот такой вот ответ. Но мы хотим дату в объекте(мы сейчас говорим за Объект Евент с useState у которого есть поле date) как обычную строку что бы мочь ее форматировать как мы хотим и отправлять на Бек в формате строки
Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Thu Jul 14 2022 10:33:26 GMT+0200 (Центральная Европа, летнее время), …}
_d: Thu Jul 14 2022 10:33:26 GMT+0200 (Центральная Европа, летнее время) {}
_isAMomentObject: true
_isUTC: false
_isValid: true
_locale: Locale {_calendar: {…}, _longDateFormat: {…}, _invalidDate: 'Invalid date', _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: ƒ, …}
_pf: {empty: false, unusedTokens: Array(0), unusedInput: Array(0), overflow: -2, charsLeftOver: 0, …}
[[Prototype]]: Object */
//Создадим в utils файл date для форматироание этой даты

/* Если мы сейчас выберем все поля и заполним их то получим в логах такой объект. Как мы видим у нас нет поля автора, добавим туда того пользователя который на настоящий момент залогинен
author: ""
date: "2022.07.13"
description: "выфв"
guest: "user"
[[Prototype]]: Object */
// Что бы проверить какой пользователь сейчас залогинен мы можем получить из нашего Стейта => const { user } = useTypedSelector(state => state.auth);
// console.log({...event, author: user.username}); - мы сохраняем старый объект и перезаписываем на новый с изменненым автором

//так как у нас форма - переиспользаванная, мы будем логику определять логику сабмитане в форме(евентформ) а здесь в Евент(то-есть на Компонент выше), по-этому мы передаем в просы новую фцию submit: (event: IEvent) => void и реализуем ее в submitForm что бы передаавать созданный евент на уровень выше props.submit({...event, author: user.username}) и теперь логику нашего submit  обрабатывает не компонент формы EventForm, а тот компонент который нашу форма оборачивает - Event
