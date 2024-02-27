import { ITask, tTaskForm } from '~/features/task'

export interface IProps {
	task?: ITask
	isLoading: boolean
	hideModal: () => void
	createUpdateTask: (formData: tTaskForm) => void
}
