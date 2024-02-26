import { tTaskForm } from '~/features/task'

export interface IProps {
	hideModal: () => void
	isLoadingCreate: boolean
	createTask: (formData: tTaskForm) => void
}
