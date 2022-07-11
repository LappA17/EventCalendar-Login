import { Button, Form, Input } from 'antd';
import { FC, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { rules } from '../utils/rules';

const LoginForm: FC = () => {
	const { login } = useActions();
	const { error, isLoading } = useTypedSelector(state => state.auth);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => {
		login(username, password);
	};
	return (
		<Form onFinish={submit}>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<Form.Item
				label="Имя пользователя"
				name="username"
				rules={[rules.required('Пожалуйста ведите имя пользователя')]}
			>
				<Input value={username} onChange={e => setUsername(e.target.value)} />
			</Form.Item>
			<Form.Item
				label="Пароль"
				name="password"
				rules={[rules.required('Пожалуйста ведите пароль')]}
			>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
				/>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Войти
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;

/*Этот участок кода заначит что если будет ошибка то мы отрисовываем этот див 
{error && <div style={{color: 'red'}}>
    {error}
</div>} */

// type="password" - что бы не было видно какие символы вводит пользователь
