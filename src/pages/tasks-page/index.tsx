import { FC } from 'react'
import { Tasks } from '~/features/task'
import { BaseLayout } from '~/widgets/ui'

export const TasksPage: FC = () => {
	return (
		<BaseLayout>
			<Tasks />
		</BaseLayout>
	)
}
