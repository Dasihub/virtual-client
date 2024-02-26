import { api } from '~/shared/hooks'
import { ITask } from '~/features/task'
import { AxiosResponse } from 'axios'

class ApiTask {
	async getAllTasks(userId: string): Promise<ITask[]> {
		try {
			const {
				data: { data }
			} = await api({ url: `/task/${userId}` })
			return data
		} catch (e) {
			console.log(e)
		}
	}

	async createTask(userId: string, title: string, description: string): Promise<AxiosResponse> {
		try {
			return await api({ url: '/task', method: 'POST', data: { userId, title, description } })
		} catch (e) {
			console.log(e)
		}
	}

	async updateTask(taskId: string, title: string, description: string, completed: string): Promise<number> {
		try {
			const { status } = await api({ url: '/task', method: 'PUT', data: { taskId, title, description, completed } })
			return status
		} catch (e) {
			console.log(e)
		}
	}
}

export const apiTask = new ApiTask()
