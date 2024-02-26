import { FC, Key, ReactNode } from 'react'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'

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

const items: MenuItem[] = [
	getItem('Главная страница', '1', <PieChartOutlined />),
	getItem('Задачи', '2', <DesktopOutlined />),
	getItem('Песочница', '3', <ContainerOutlined />),
	getItem('Обучения', 'sub1', <MailOutlined />)
]
export const Navigation: FC = () => {
	return (
		<Layout.Sider style={{ position: 'fixed', width: 200, height: '100vh', backgroundColor: 'white' }}>
			<Menu style={{ marginTop: 20, border: 0 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' items={items} />
		</Layout.Sider>
	)
}
