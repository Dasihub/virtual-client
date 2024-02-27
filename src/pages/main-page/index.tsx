import { FC } from 'react'
import { BaseLayout } from '~/widgets/ui'
import { Card, Flex, Typography } from 'antd'
import NoFound from 'antd/es/result/noFound'

export const MainPage: FC = () => {
	return (
		<BaseLayout>
			<div style={{ display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 1fr' }}>
				<Card>
					<Typography.Title level={3} style={{ textAlign: 'center' }}>
						Платформа №1 для повышение класификации в области цифровой криминалистике
					</Typography.Title>

					<Flex>
						<Typography.Text type='secondary'>
							Forensic.kg дает вам инструмент, необхоимые для постоянного улучшения своих возмоностей в обсласти цифровой
							криминилистике - <Typography.Text>и все это в одном месте</Typography.Text>
						</Typography.Text>
					</Flex>
				</Card>
				<Card>
					<Typography.Title style={{ textAlign: 'center' }} level={2}>
						Задачи
					</Typography.Title>

					<Flex justify='center'>
						<NoFound />
					</Flex>
				</Card>
			</div>
		</BaseLayout>
	)
}
