import { Layout } from 'antd';
import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

function App() {
	const { setUser, setIsAuth } = useActions();
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setUser({
				username: localStorage.getItem('username' || ''),
			} as IUser);
			setIsAuth(true);
		}
	}, []);
	return (
		<Layout className="App">
			<NavBar />
			<Layout.Content>
				<AppRouter />
			</Layout.Content>
		</Layout>
	);
}

export default App;

//Что бы решить проблему того что после того как мы залогинились и перезагрузили страницу - нас снова выбрасивыет на страницу с Лоигиным создадим useEffect с пустым массивом зависимостей что бы коллбек который мы передаем заработал лишь единожды при первом запуске приложения

//мы будем логинить пользователя по ключу аус if (localStorage.getItem('auth')) {
// мы в setUser передаем объект пользователя(неполный, а только username), который мы опять же получаем из локалСтореджа
