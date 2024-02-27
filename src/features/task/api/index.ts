import { api } from '~/shared/hooks'
import { ITask } from '~/features/task'
import { AxiosResponse } from 'axios'

class ApiTask {
	async searchTask(userId: string, title: string): Promise<ITask[]> {
		try {
			const {
				data: { data }
			} = await api({ url: `/task/${userId}/search?title=${title}` })
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

	async updateTask(taskId: string, title: string, description: string, completed: boolean): Promise<number> {
		try {
			const { status } = await api({ url: '/task', method: 'PUT', data: { taskId, title, description, completed } })
			return status
		} catch (e) {
			console.log(e)
		}
	}

	async updateCompleted(taskId: string, completed: boolean) {
		try {
			const { status } = await api({ url: `/task/${taskId}?completed=${completed}`, method: 'PATCH' })
			return status
		} catch (e) {
			console.log(e)
		}
	}

	async deleteTask(taskId: string) {
		try {
			const { status } = await api({ url: `/task/${taskId}`, method: 'DELETE' })
			return status
		} catch (e) {
			console.log(e)
		}
	}
}

export const apiTask = new ApiTask()
