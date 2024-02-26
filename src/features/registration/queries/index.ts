import { useMutation } from 'react-query'
import { notification } from 'antd'
import { apiRegistration } from '~/features/registration/api'
import { tRegistrationForm } from '~/features/registration'
import { MAIN_ROUTING } from '~/shared/lib'

export const useRegistration = (setMessage: (str: string | ((sts: string) => void)) => void, navigate: (to: string) => void) => {
	return useMutation(
		(formData: tRegistrationForm) => {
			return apiRegistration.registration(formData)
		},
		{
			onSuccess: ({ data: { data, message }, status }) => {
				if (data && status === 201) {
					notification.success({ message })
					return navigate(MAIN_ROUTING.AUTH)
				}
				setMessage(message)
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}
