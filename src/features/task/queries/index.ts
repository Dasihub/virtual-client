import { useMutation, useQuery } from 'react-query'
import { apiTask, ITask } from '~/features/task'
import { notification } from 'antd'

export const useGetAllTask = (userId: string) => {
	return useQuery(
		['list-task'],
		() => {
			return apiTask.getAllTasks(userId)
		},
		{
			enabled: !!userId.length
		}
	)
}

export const useCreateTask = (hideModal: () => void, setContent: (content: ITask[] | ((pre: ITask[]) => void)) => void) => {
	return useMutation(
		({ userId, title, description }: { userId: string; title: string; description: string }) => {
			return apiTask.createTask(userId, title, description)
		},
		{
			onSuccess: ({ data: { data }, status }) => {
				if (data && status === 201) {
					hideModal()
					setContent(pre => [...pre, data])
					return notification.success({ message: 'Задача успешно создана' })
				}
				return notification.success({ message: 'Не удалось создать задачу' })
			},
			onError: () => {
				notification.error({ message: 'Ошибка в сервере' })
			}
		}
	)
}
