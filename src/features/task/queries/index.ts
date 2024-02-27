import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiTask, ITask } from '~/features/task'
import { notification } from 'antd'

export const useGetAllTask = (userId: string, title: string) => {
	return useQuery(
		['list-task', title],
		() => {
			return apiTask.searchTask(userId, title)
		},
		{
			enabled: !!userId.length
		}
	)
}

export const useCreateTask = (hideModal: () => void) => {
	const queryClient = useQueryClient()

	return useMutation(
		({ userId, title, description }: { userId: string; title: string; description: string }) => {
			return apiTask.createTask(userId, title, description)
		},
		{
			onSuccess: ({ data: { data }, status }) => {
				if (data && status === 201) {
					hideModal()
					queryClient.invalidateQueries('list-task')
					return notification.success({ message: 'Задача успешно создана' })
				}
				notification.success({ message: 'Не удалось создать задачу' })
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}

export const useUpdateTask = (hideModal: () => void) => {
	const queryClient = useQueryClient()
	return useMutation(
		({ taskId, title, description, completed }: { taskId: string; title: string; description: string; completed: boolean }) => {
			return apiTask.updateTask(taskId, title, description, completed)
		},
		{
			onSuccess: status => {
				if (status === 204) {
					hideModal()
					queryClient.invalidateQueries('list-task')
					return notification.success({ message: 'Задача успешно изменено' })
				}
				notification.success({ message: 'Не удалось изменить задачу' })
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}

export const useUpdateCompleted = () => {
	return useMutation(
		({ taskId, completed }: { taskId: string; completed: boolean }) => {
			return apiTask.updateCompleted(taskId, completed)
		},
		{
			// onSuccess: status => {
			// 	if (status === 204) {
			// 		return notification.success({ message: 'Статус задачи изменено' })
			// 	}
			// 	notification.success({ message: 'Не удалось изменить статус задачи' })
			// },
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}

export const useDeleteTask = () => {
	const queryClient = useQueryClient()
	return useMutation(
		({ taskId }: { taskId: string }) => {
			return apiTask.deleteTask(taskId)
		},
		{
			onSuccess: status => {
				if (status === 204) {
					queryClient.invalidateQueries('list-task')
					return notification.success({ message: 'Статус задачи изменено' })
				}
				notification.success({ message: 'Не удалось изменить статус задачи' })
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}
