import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Button, Card, Collapse, CollapseProps, Flex, Skeleton, Switch, Typography } from 'antd'
import { ITask, ModalTask, tTaskForm, useCreateTask, useGetAllTask } from '~/features/task'
import { AuthContext } from '~/shared/context'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export const Tasks: FC = () => {
	const { user } = useContext(AuthContext)
	const { data, isLoading } = useGetAllTask(user._id)
	const [isShowModal, setIsShowModal] = useState<boolean>(false)

	const [content, setContent] = useState<ITask[]>([])
	const showModal = () => {
		setIsShowModal(true)
	}
	const hideModal = () => {
		setIsShowModal(false)
	}

	const { mutate: mutateCreate, isLoading: isLoadingCreate } = useCreateTask(hideModal, setContent)

	const createTask = ({ description, title }: tTaskForm) => {
		mutateCreate({ userId: user._id, description, title })
	}

	const itemsData = useMemo(() => {
		if (content.length) {
			const items: CollapseProps['items'] = content.map(item => ({
				key: item._id,
				label: (
					<Flex justify='space-between' align='center'>
						<Typography.Text style={item.completed ? { textDecoration: 'line-through' } : undefined}>
							{item.title}
						</Typography.Text>

						<Flex onClick={e => e.stopPropagation()} gap={20} align='center'>
							<Flex gap={10} align='center'>
								<Typography.Text>{item.completed ? 'Задача выполено' : 'Задача не выполнено'}</Typography.Text>
								<Switch checked={item.completed} />
							</Flex>

							<Button type='primary' danger>
								<DeleteOutlined />
							</Button>

							<Button type='primary'>
								<EditOutlined />
							</Button>
						</Flex>
					</Flex>
				),
				children: <Typography.Text>{item.description}</Typography.Text>
			}))
			return items
		}
		return []
	}, [data, content])

	useEffect(() => {
		if (Array.isArray(data)) {
			setContent(data)
		}
	}, [data])

	return (
		<>
			{isShowModal && <ModalTask isLoadingCreate={isLoadingCreate} createTask={createTask} hideModal={hideModal} />}

			<Flex vertical gap={20}>
				<Card>
					<Flex justify='flex-end'>
						<Button size='large' type='primary' onClick={showModal}>
							Создать
						</Button>
					</Flex>
				</Card>

				{isLoading ? (
					new Array(5).fill(5).map(() => <Skeleton.Button style={{ width: '100%', height: 68 }} active />)
				) : (
					<Collapse size='large' items={itemsData} />
				)}
			</Flex>
		</>
	)
}
