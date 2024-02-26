import { useMutation } from 'react-query'
import { apiAuth, tAuthForm } from '~/features/auth'
import { IUser } from '~/shared/types'
import { notification } from 'antd'

export const useAuth = (changeUser: (newUser: IUser) => void, setMessage: (str: string | ((sts: string) => void)) => void) => {
	return useMutation(
		(formData: tAuthForm) => {
			return apiAuth.login(formData)
		},
		{
			onSuccess: ({ data: { data, message }, status }) => {
				if (data && status === 203) {
					return changeUser(data)
				}
				setMessage(message)
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}
