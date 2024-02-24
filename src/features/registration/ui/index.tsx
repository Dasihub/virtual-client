import { FC } from 'react'
import { Button, Card, Flex, Form, Input } from 'antd'

export const Registration: FC = () => {
	return (
		<Flex style={{ minHeight: '100vh', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Card style={{ maxWidth: '500px', width: '100%' }}>
				<Form layout='vertical'>
					<Form.Item>
						<h1 style={{ textAlign: 'center' }}>Регистрация</h1>
					</Form.Item>

					<Form.Item label='Имя' required>
						<Input size='large' />
					</Form.Item>

					<Form.Item label='Логин' required>
						<Input size='large' />
					</Form.Item>

					<Form.Item label='Пароль' required>
						<Input.Password size='large' />
					</Form.Item>

					<Form.Item>
						<Button size='large' type='primary' style={{ width: '100%' }}>
							Вход
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	)
}
