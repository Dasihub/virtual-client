import { api } from '~/shared/hooks'
import { AxiosResponse } from 'axios'
import { tRegistrationForm } from '~/features/registration'

class ApiRegistration {
	async registration({ login, password, name }: tRegistrationForm): Promise<AxiosResponse> {
		try {
			return await api({ url: '/user/registration', method: 'POST', data: { login, password, name } })
		} catch (e) {
			console.log(e)
		}
	}
}

export const apiRegistration = new ApiRegistration()
