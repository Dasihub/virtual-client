import { FC, useState } from 'react'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { MAIN_ROUTING, rulesController } from '~/shared/lib'
import { Controller, useForm } from 'react-hook-form'
import { tRegistrationForm } from './types.ts'
import { ErrorText } from '~/entities/error-text'
import { useRegistration } from '~/features/registration/queries'

export const Registration: FC = () => {
	const navigate = useNavigate()
	const [message, setMessage] = useState<string>('')
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<tRegistrationForm>({
		defaultValues: {
			name: '',
			login: '',
			password: ''
		}
	})

	const { mutate, isLoading } = useRegistration(setMessage, navigate)

	const submit = (formData: tRegistrationForm) => {
		mutate(formData)
	}

	return (
		<Flex style={{ minHeight: '100vh', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Card style={{ maxWidth: '500px', width: '100%' }}>
				<Form layout='vertical'>
					<Form.Item>
						<h1 style={{ textAlign: 'center' }}>Регистрация</h1>
					</Form.Item>

					<Form.Item label='Имя' required>
						<Controller
							control={control}
							rules={rulesController}
							render={({ field }) => (
								<>
									<Input size='large' {...field} />
									{errors.name && <ErrorText>{errors.name.message}</ErrorText>}
								</>
							)}
							name='name'
						/>
					</Form.Item>

					<Form.Item label='Логин' required>
						<Controller
							control={control}
							rules={rulesController}
							render={({ field }) => (
								<>
									<Input size='large' {...field} />
									{errors.login && <ErrorText>{errors.login.message}</ErrorText>}
								</>
							)}
							name='login'
						/>
					</Form.Item>

					<Form.Item label='Пароль' required>
						<Controller
							control={control}
							rules={rulesController}
							render={({ field }) => (
								<>
									<Input.Password size='large' {...field} />
									{errors.login && <ErrorText>{errors.login.message}</ErrorText>}
								</>
							)}
							name='password'
						/>
					</Form.Item>

					<Form.Item>
						<Button onClick={handleSubmit(submit)} htmlType='submit' size='large' type='primary' style={{ width: '100%' }}>
							Зарегистрироваться
						</Button>
					</Form.Item>

					<Flex justify='center'>{!!message.length && <ErrorText>{message}</ErrorText>}</Flex>

					<Form.Item>
						<Flex justify='center' gap={10}>
							<Typography.Text>Уже зарегистрированы?</Typography.Text>
							<NavLink to={MAIN_ROUTING.AUTH}>
								<Typography.Link>Войти</Typography.Link>
							</NavLink>
						</Flex>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	)
}
