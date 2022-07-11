import axios, { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
	static async getUsers(): Promise<AxiosResponse<IUser[]>> {
		return axios.get<IUser[]>('./user.json');
	}
}

//Так как у нас повторяется обращение к одному и тому же url для получения данных то хорошим тонном есть выношение логики в отдельный файл

//Так как фция асинхрона она всегда будет возвращать Прромис.
//В промис всегда завернуты какие-то данные и в нашем случае AxiosResponse, то-есть то что получит axios, а в поле data как раз будет массив пользователей

//сделаем фцию статичной что бы можно обращаться к ней без создание экземляра класса
