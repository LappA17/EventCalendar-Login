export interface IEvent {
	author: string; //username автора
	guest: string; //гость которого будем приглашать на это событие
	date: string; //укажем осознанно стрингу что бы приводить к нужному нам формату для отправки на Бек-енд
	description: string;
}
