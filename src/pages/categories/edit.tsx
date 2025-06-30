import { Edit, useForm } from '@refinedev/antd'
import { axiosInstance } from '@refinedev/simple-rest'
import { Flex, Form, Input, Upload } from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import { useEffect, useState } from 'react'

export const CategoryEdit = () => {
	const { formProps, saveButtonProps } = useForm({})

	const [imageUploaded, setImageUploaded] = useState(formProps.initialValues?.image ?? '')

	// Đồng bộ imageUploaded với form
	useEffect(() => {
		formProps.form?.setFieldsValue({ image: imageUploaded })
	}, [imageUploaded, formProps.form])
	console.log(formProps.initialValues)
	return (
		<Edit saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout='vertical'>
				<Form.Item label={'Name'} name={['name']} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Flex gap={8} align='center'>
					<FormItemLabel prefixCls='' label='Is New Arrival' />
					<Form.Item className='mb-0' label='' name={['isNewArrival']} valuePropName='checked'>
						<Input type='checkbox' />
					</Form.Item>
				</Flex>
				<FormItemLabel prefixCls='' label='Image' />
				<Upload
					isImageUrl={file => true}
					accept='image/*'
					maxCount={1}
					listType='picture'
					style={{ width: '100%' }}
					rootClassName='w-full'
					fileList={
						formProps.initialValues?.image
							? [
								{
									uid: '-1',
									name: 'image',
									status: 'done',
									url: formProps.initialValues.image,
								},
							]
							: []
					}
					onChange={e => {
						if (e.file.originFileObj) {
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
									formProps.form?.setFieldsValue({ image: res.data.imageUrl })
								})
						}
					}}>
					<div>Click or drag file to this area to upload</div>
				</Upload>
				<Form.Item label='' name={['image']} hidden>
					<Input type='hidden' />
				</Form.Item>
			</Form>
		</Edit>
	)
}
