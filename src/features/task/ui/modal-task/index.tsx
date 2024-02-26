import { FC } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { tTaskForm } from '~/features/task'
import { rulesController } from '~/shared/lib'
import { ErrorText } from '~/entities/error-text'
import { IProps } from './types.ts'

export const ModalTask: FC<IProps> = ({ hideModal, createTask, isLoadingCreate }) => {
	const {
		control,
		formState: { errors },
		handleSubmit
	} = useForm<tTaskForm>({
		defaultValues: {
			title: '',
			description: ''
		}
	})

	const submit = (formData: tTaskForm) => {
		createTask(formData)
	}

	return (
		<Modal
			title={'Создать задачу'}
			open
			cancelText='Закрыть'
			okText='Сохранить'
			onCancel={hideModal}
			onOk={handleSubmit(submit)}
			confirmLoading={isLoadingCreate}
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
			</Form>
		</Modal>
	)
}
