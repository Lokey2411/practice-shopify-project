import { Create, useForm } from '@refinedev/antd'
import { Flex, Form, Input, Upload } from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'

export const CategoryCreate = () => {
	const { formProps, saveButtonProps } = useForm({})

	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout='vertical'>
				<Form.Item
					label={'Name'}
					name={['name']}
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Flex gap={8} align='center'>
					<FormItemLabel prefixCls='' label='Is New Arrival'></FormItemLabel>
					<Form.Item className='mb-0' label='' name={['isNewArrival']}>
						<Input type='checkbox' />
					</Form.Item>
				</Flex>
				<Form.Item label={'Image'} name={['image']}>
					<Upload></Upload>
				</Form.Item>
			</Form>
		</Create>
	)
}
