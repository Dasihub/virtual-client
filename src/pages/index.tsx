import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MAIN_ROUTING } from '~/shared/lib'
import { MainPage } from '~/pages/main-page'
import { TasksPage } from '~/pages/tasks-page'
import { RegistrationPage } from '~/pages/registration-page'
import { AuthPage } from '~/pages/auth-page'
import { NotPage } from '~/pages/not-page'

export const Routing: FC = () => {
	return (
		<Routes>
			<Route path={MAIN_ROUTING.TASKS} element={<TasksPage />} />
			<Route path={MAIN_ROUTING.REGISTRATION} element={<RegistrationPage />} />
			<Route path={MAIN_ROUTING.AUTH} element={<AuthPage />} />
			<Route path={MAIN_ROUTING.MAIN} element={<MainPage />} />
			<Route path='*' element={<NotPage />} />
		</Routes>
	)
}
