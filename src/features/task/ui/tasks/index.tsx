import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Button, Card, Collapse, CollapseProps, Flex, Input, Skeleton, Switch, Typography } from 'antd'
import {
	ITask,
	ModalTask,
	tTaskForm,
	useCreateTask,
	useDeleteTask,
	useGetAllTask,
	useUpdateCompleted,
	useUpdateTask
} from '~/features/task'
import { AuthContext } from '~/shared/context'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'

export const Tasks: FC = () => {
	const { control, watch } = useForm<{ search: string }>({
		defaultValues: {
			search: ''
		}
	})
	const { user } = useContext(AuthContext)
	const { data, isLoading, isFetching } = useGetAllTask(user._id, watch('search'))

	const [isShowModal, setIsShowModal] = useState<boolean>(false)
	const [taskId, setTaskId] = useState<string>('')

	const [content, setContent] = useState<ITask[]>([])
	const showModal = () => {
		setIsShowModal(true)
	}

	const hideModal = () => {
		setIsShowModal(false)
		setTaskId('')
	}

	const changeTaskId = (taskId: string) => {
		showModal()
		setTaskId(taskId)
	}

	const { mutate: mutateDelete } = useDeleteTask()
	const { mutate: mutateUpdateCompleted } = useUpdateCompleted()
	const { mutate: mutateCreate, isLoading: isLoadingCreate } = useCreateTask(hideModal)
	const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useUpdateTask(hideModal)

	const createUpdateTask = ({ description, title, completed }: tTaskForm) => {
		if (taskId.length) {
			return mutateUpdate({ taskId, title, description, completed })
		}
		mutateCreate({ userId: user._id, description, title })
	}

	const changeCompleted = (completed: boolean, taskId: string) => {
		mutateUpdateCompleted({ completed, taskId })
		const updateContent = content.map(item => {
			if (item._id === taskId) {
				return { ...item, completed }
			}
			return item
		})
		setContent(updateContent)
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
								<Switch onChange={completed => changeCompleted(completed, item._id)} checked={item.completed} />
							</Flex>

							<Button type='primary' danger onClick={() => mutateDelete({ taskId: item._id })}>
								<DeleteOutlined />
							</Button>

							<Button type='primary' onClick={() => changeTaskId(item._id)}>
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
			{isShowModal && (
				<ModalTask
					hideModal={hideModal}
					createUpdateTask={createUpdateTask}
					task={content.find(item => item._id === taskId)}
					isLoading={isLoadingCreate || isLoadingUpdate}
				/>
			)}

			<Flex vertical gap={20}>
				<Card>
					<Flex justify='flex-end' gap={20}>
						<Controller
							control={control}
							render={({ field }) => <Input.Search {...field} size='large' allowClear />}
							name='search'
						/>
						<Button size='large' type='primary' onClick={showModal}>
							Создать
						</Button>
					</Flex>
				</Card>

				{isLoading ? (
					new Array(5).fill(5).map((_, index) => <Skeleton.Button key={index} style={{ width: '100%', height: 68 }} active />)
				) : content.length ? (
					<Collapse size='large' items={itemsData} />
				) : (
					<Typography.Title level={4} style={{ textAlign: 'center' }}>
						Нет задач
					</Typography.Title>
				)}
			</Flex>
		</>
	)
}
