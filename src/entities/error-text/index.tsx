import { FC, ReactNode } from 'react'
import { Typography } from 'antd'

export const ErrorText: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Typography.Text type='danger' style={{ fontSize: 13 }}>
			{children}
		</Typography.Text>
	)
}
