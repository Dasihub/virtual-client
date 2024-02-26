import { FC } from 'react'
import { Button, Flex, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { MAIN_ROUTING } from '~/shared/lib'

export const NotPage: FC = () => {
	return (
		<Flex align='center' justify='center' style={{ height: '100vh', width: '100%' }}>
			<Flex vertical align='center' gap={10}>
				<Typography.Title level={1} style={{ margin: 0 }}>
					404
				</Typography.Title>
				<Typography.Text>Странице не найдено</Typography.Text>
				<NavLink to={MAIN_ROUTING.MAIN}>
					<Button type='primary'>Перейти на главную страницу</Button>
				</NavLink>
			</Flex>
		</Flex>
	)
}
