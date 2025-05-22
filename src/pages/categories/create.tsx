import { Create, useForm } from '@refinedev/antd'
import { axiosInstance } from '@refinedev/simple-rest'
import { Flex, Form, Input, Upload } from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import { useState } from 'react'

export const CategoryCreate = () => {
	const { formProps, saveButtonProps } = useForm({})
	const [imageUploaded, setImageUploaded] = useState('')
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
					<Form.Item className='mb-0' label='' name={['isNewArrival']} valuePropName='checked'>
						<Input type='checkbox' />
					</Form.Item>
				</Flex>
				<FormItemLabel prefixCls='' label='Image'></FormItemLabel>
				<Upload
					isImageUrl={file => true}
					accept='image/*'
					maxCount={1}
					listType='picture'
					style={{ width: '100%' }}
					rootClassName='w-full'
					onChange={e => {
						axiosInstance
							.post(
								'/services/api/upload',
								{ image: e.file.originFileObj },
								{
									headers: {
										'Content-Type': 'multipart/form-data',
									},
								},
							)
							.then(res => {
								setImageUploaded(res.data.imageUrl)
							})
					}}>
					<div className=''>Click or drag file to this area to upload</div>
				</Upload>
				<Form.Item label={''} name={['image']}>
					<input type='hidden' value={imageUploaded} />
				</Form.Item>
			</Form>
		</Create>
	)
}
