import { FC, Key, ReactNode, useContext } from 'react'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons'
import { Flex, Layout, Menu, MenuProps, theme } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { MAIN_ROUTING } from '~/shared/lib'
import { AuthContext } from '~/shared/context'
import { api } from '~/shared/hooks'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem
}

// const removeFirstLetter = (text: string) => text.slice(1)

const items: MenuItem[] = [
	getItem(<NavLink to={MAIN_ROUTING.MAIN}>Главная страница</NavLink>, '', <PieChartOutlined />),
	getItem(<NavLink to={MAIN_ROUTING.TASKS}>Задачи</NavLink>, '2', <DesktopOutlined />)
	// getItem('Песочница', '3', <ContainerOutlined />),
	// getItem('Обучения', '4', <MailOutlined />)
]

export const Navigation: FC = () => {
	const {
		token: { colorBorder }
	} = theme.useToken()
	const { changeUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const logout = async () => {
		await api({ url: '/user/logout' })
		changeUser({
			_id: '',
			name: '',
			login: '',
			__v: null
		})
		navigate(MAIN_ROUTING.AUTH)
	}

	return (
		<Layout.Sider
			style={{
				position: 'fixed',
				width: 200,
				height: '100vh',
				backgroundColor: 'white',
				borderRight: `1px solid ${colorBorder}`
			}}
		>
			<Flex vertical justify='space-between' style={{ height: '100vh', padding: '20px 0' }}>
				<Menu style={{ border: 0 }} mode='inline' items={items} />
				<Menu style={{ marginTop: 20, border: 0 }} mode='inline' items={[{ label: 'Выйти', key: 'logout', onClick: logout }]} />
			</Flex>
		</Layout.Sider>
	)
}
