import Upload from '@/components/Upload'
import { Create, useForm, useSelect } from '@refinedev/antd'
import { DatePicker, Form, Input, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import Select from '@/components/Select'
export const ProductCreate = () => {
	const { formProps, saveButtonProps } = useForm({})
	const [image, setImage] = useState('')
	const { selectProps } = useSelect({
		resource: 'categories',
		optionLabel: item => item.name,
		optionValue: item => item._id,
	})
	const handleUploadSuccess = (url: string) => {
		formProps.form?.setFieldsValue({ images: [url] }) // Cập nhật field image trong form;
		setImage(url)
	}
	useEffect(() => {
		console.log(formProps.form?.getFieldValue('images'))
	}, [formProps])
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
				<Form.Item
					label={'Price'}
					name={['price']}
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item label={'images'} name={['images']}>
					<Upload form={formProps.form} onUploadSuccess={handleUploadSuccess} />
					<Input
						value={image}
						onChange={e => {
							setImage(e.target.value)
							formProps.form?.setFieldValue('images', [e.target.value])
						}}
						className='mt-2'
					/>
				</Form.Item>
				<Form.Item
					label={'Author'}
					name={['author']}
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label={'Publisher'}
					name={['publisher']}
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label={'Published Date'}
					name={['publishedDate']}
					rules={[
						{
							required: true,
						},
					]}>
					<DatePicker picker='year' format={'YYYY'} />
				</Form.Item>
				<Form.Item label={'Category'} name={['categories']} rules={[{ required: true }]}>
					<Select selectProps={selectProps} dropdownStyle={{ maxHeight: 200 }} />
				</Form.Item>
				<Form.Item
					label={'Number of pages'}
					name={['numPage']}
					rules={[
						{
							required: true,
						},
					]}>
					<InputNumber />
				</Form.Item>
			</Form>
		</Create>
	)
}
