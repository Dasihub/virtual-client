import { FC, useEffect, useState } from 'react'
import { Routing } from '~/pages'
import './styles/index.css'
import { IUser } from '~/shared/types'
import { AuthContext } from '~/shared/context'
import { Flex, Spin } from 'antd'
import { api } from '~/shared/hooks'

const App: FC = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [user, setUser] = useState<IUser>({
		_id: '',
		name: '',
		login: '',
		__v: null
	})

	const checkAuth = async () => {
		try {
			const {
				data: { data }
			} = await api({ url: '/user/check-auth' })
			if (data) {
				setUser(data)
			}
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	const changeUser = (newUser: IUser) => {
		setUser(newUser)
	}

	useEffect(() => {
		checkAuth()
	}, [])

	if (loading) {
		return (
			<Flex style={{ height: '100vh' }} justify='center' align='center'>
				<Spin size='large' />
			</Flex>
		)
	}

	return (
		<AuthContext.Provider value={{ user, changeUser }}>
			<Routing />
		</AuthContext.Provider>
	)
}

export default App
