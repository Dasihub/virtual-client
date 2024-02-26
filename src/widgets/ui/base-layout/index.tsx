import { FC, ReactNode } from 'react'
import { Flex } from 'antd'
import { AppHeader, Navigation } from '~/widgets/ui'

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Flex>
			<Navigation />

			<div style={{ marginLeft: 200 }}>
				<AppHeader />
				<div style={{ margin: '20px' }}>{children}</div>
			</div>
		</Flex>
	)
}
