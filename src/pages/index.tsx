import { FC, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MAIN_ROUTING } from '~/shared/lib'
import { MainPage } from '~/pages/main-page'
import { TasksPage } from '~/pages/tasks-page'
import { RegistrationPage } from '~/pages/registration-page'
import { AuthPage } from '~/pages/auth-page'
import { NotPage } from '~/pages/not-page'
import { AuthContext } from '~/shared/context/auth-context'

export const Routing: FC = () => {
	const { user } = useContext(AuthContext)

	if (user._id.length) {
		return (
			<Routes>
				<Route path={MAIN_ROUTING.REGISTRATION} element={<Navigate to={MAIN_ROUTING.MAIN} replace />} />
				<Route path={MAIN_ROUTING.AUTH} element={<Navigate to={MAIN_ROUTING.MAIN} replace />} />
				<Route path={MAIN_ROUTING.TASKS} element={<TasksPage />} />
				<Route path={MAIN_ROUTING.MAIN} element={<MainPage />} />
				<Route path='*' element={<NotPage />} />
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path={MAIN_ROUTING.REGISTRATION} element={<RegistrationPage />} />
			<Route path={MAIN_ROUTING.AUTH} element={<AuthPage />} />
			<Route path={MAIN_ROUTING.TASKS} element={<Navigate to={MAIN_ROUTING.AUTH} replace />} />
			<Route path={MAIN_ROUTING.MAIN} element={<Navigate to={MAIN_ROUTING.AUTH} replace />} />
			<Route path='*' element={<NotPage />} />
		</Routes>
	)
}
