import { FC } from 'react';
import { Layout, Menu, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const NavBar: FC = () => {
	const { logout } = useActions();
	const router = useHistory();
	const { isAuth, user } = useTypedSelector(state => state.auth);
	return (
		<Layout.Header>
			<Row justify="end">
				{isAuth ? (
					<>
						<div style={{ color: 'white' }}>{user.username}</div>

						<Menu theme="dark" mode="horizontal" selectable={false}>
							<Menu.Item onClick={logout} key={1}>
								Выйти
							</Menu.Item>
						</Menu>
					</>
				) : (
					<Menu theme="dark" mode="horizontal" selectable={false}>
						<Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>
							Логин
						</Menu.Item>
					</Menu>
				)}
			</Row>
		</Layout.Header>
	);
};

export default NavBar;

// selectable={false} - что бы после нажатия кнока не была активной

// достаем из const { isAuth, user } = useTypedSelector(state => state.auth); имя пользователя и вставляем в  <div style={{ color: 'white' }}>{user.username}</div>
