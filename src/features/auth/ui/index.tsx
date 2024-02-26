import { FC, useContext, useState } from 'react'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { MAIN_ROUTING } from '~/shared/lib'
import { tAuthForm } from './types.ts'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '~/features/auth'
import { AuthContext } from '~/shared/context'
import { ErrorText } from '~/entities/error-text'

export const Auth: FC = () => {
	const { changeUser } = useContext(AuthContext)
	const [message, setMessage] = useState<string>('')
	const { control, handleSubmit, formState } = useForm<tAuthForm>({
		defaultValues: {
			login: '',
			password: ''
		}
	})

	const { mutate, isLoading } = useAuth(changeUser, setMessage)

	const submit = (formData: tAuthForm) => {
		setMessage('')
		mutate(formData)
	}

	return (
		<Flex style={{ minHeight: '100vh', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Card style={{ maxWidth: '500px', width: '100%' }}>
				<Form onFinish={submit} layout='vertical'>
					<Form.Item>
						<h1 style={{ textAlign: 'center' }}>Авторизация</h1>
					</Form.Item>

					<Form.Item label='Логин'>
						<Controller
							control={control}
							rules={{ required: true }}
							render={({ field }) => <Input size='large' {...field} />}
							name='login'
						/>
					</Form.Item>

					<Form.Item label='Пароль'>
						<Controller
							control={control}
							rules={{ required: true }}
							render={({ field }) => <Input.Password size='large' {...field} />}
							name='password'
						/>
					</Form.Item>

					<Form.Item>
						<Button
							disabled={!formState.isValid || isLoading}
							loading={isLoading}
							onClick={handleSubmit(submit)}
							htmlType='submit'
							size='large'
							type='primary'
							style={{ width: '100%' }}
						>
							Вход
						</Button>
					</Form.Item>

					<Flex justify='center'>{!!message.length && <ErrorText>{message}</ErrorText>}</Flex>

					<Form.Item>
						<Flex justify='center' gap={10}>
							<Typography.Text>Нет аккаунта?</Typography.Text>
							<NavLink to={MAIN_ROUTING.REGISTRATION}>
								<Typography.Link>Зарегистрироваться</Typography.Link>
							</NavLink>
						</Flex>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	)
}
