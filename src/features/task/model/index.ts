export interface ITask {
	_id: string
	userId: string
	title: string
	description: string
	completed: boolean
	__v: number
}

export type tTaskForm = {
	title: string
	description: string
	completed: boolean
}
