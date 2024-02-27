import { FC, useEffect } from 'react'
import { Form, Input, Modal, Switch } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { tTaskForm } from '~/features/task'
import { rulesController } from '~/shared/lib'
import { ErrorText } from '~/entities/error-text'
import { IProps } from './types.ts'

export const ModalTask: FC<IProps> = ({ hideModal, createUpdateTask, isLoading, task }) => {
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm<tTaskForm>({
		defaultValues: {
			title: '',
			description: '',
			completed: false
		}
	})

	const submit = (formData: tTaskForm) => {
		createUpdateTask(formData)
	}

	useEffect(() => {
		if (task) {
			setValue('title', task.title)
			setValue('description', task.description)
			setValue('completed', task.completed)
		}
	}, [])

	return (
		<Modal
			title={task ? 'Изменить задачу' : 'Создать задачу'}
			open
			cancelText='Закрыть'
			okText='Сохранить'
			onCancel={hideModal}
			onOk={handleSubmit(submit)}
			confirmLoading={isLoading}
		>
			<Form layout='vertical' onFinish={handleSubmit(submit)}>
				<Form.Item label='Наименование задачи' required>
					<Controller
						control={control}
						rules={rulesController}
						render={({ field }) => (
							<>
								<Input {...field} />
								{errors.title && <ErrorText>{errors.title.message}</ErrorText>}
							</>
						)}
						name='title'
					/>
				</Form.Item>

				<Form.Item label='Описание задачи'>
					<Controller
						control={control}
						render={({ field }) => <Input.TextArea {...field} autoSize={{ minRows: 3, maxRows: 5 }} />}
						name='description'
					/>
				</Form.Item>

				{!!task && (
					<Form.Item label='Изменить статус задачи'>
						<Controller control={control} render={({ field }) => <Switch {...field} />} name='completed' />
					</Form.Item>
				)}
			</Form>
		</Modal>
	)
}
