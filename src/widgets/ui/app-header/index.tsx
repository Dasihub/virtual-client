import { FC, useContext } from 'react'
import { Flex, Layout, theme, Typography } from 'antd'
import { AuthContext } from '~/shared/context'

export const AppHeader: FC = () => {
	const { user } = useContext(AuthContext)
	const {
		token: { colorBorder }
	} = theme.useToken()

	return (
		<Layout.Header
			style={{
				backgroundColor: 'white',
				width: 'calc(100vw - 200px)',
				borderBottom: `1px solid ${colorBorder}`,
				padding: '10px 20px',
				height: 'fit-content'
			}}
		>
			<Flex justify='space-between' align='center'>
				<img src='/vite.svg' alt='vite' />

				<Typography.Title style={{ margin: 0 }} level={3}>
					{user.name}
				</Typography.Title>
			</Flex>
		</Layout.Header>
	)
}
