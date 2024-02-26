import { api } from '~/shared/hooks'
import { AxiosResponse } from 'axios'
import { tAuthForm } from '~/features/auth'

class ApiAuth {
	async login({ login, password }: tAuthForm): Promise<AxiosResponse> {
		try {
			return await api({ url: '/user/auth', method: 'POST', data: { login, password } })
		} catch (e) {
			console.log(e)
		}
	}
}

export const apiAuth = new ApiAuth()
