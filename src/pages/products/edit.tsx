import Select from '@/components/Select'
import Upload from '@/components/Upload'
import { Edit, useForm, useSelect } from '@refinedev/antd'
import { DatePicker, Form, Input, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface DatePickerValueProps {
	value?: Dayjs | null
}

export const ProductEdit = () => {
	const { formProps, saveButtonProps } = useForm({
		queryOptions: {
			select: (data: any) => {
				return {
					...data,
					categories: data.categories?.[0]?._id,
					publishedDate: data.publishedDate ? dayjs(data.publishedDate).format('YYYY') : null,
				}
			},
		},
	})

	const [image, setImage] = useState('')

	const { selectProps } = useSelect({
		resource: 'categories',
		optionLabel: item => item.name,
		optionValue: item => item._id,
	})

	const handleUploadSuccess = (url: string) => {
		if (!url) return
		formProps.form?.setFieldsValue({ images: [url] })
		setImage(url)
	}

	// Sync state image với form khi dữ liệu load xong
	useEffect(() => {
		console.log('formProps.form?.getFieldValue(images):', formProps.form?.getFieldsValue())
		const images = formProps.form?.getFieldValue('images')
		if (Array.isArray(images) && images.length > 0 && images[0]) {
			setImage(images[0])
		}
	}, [formProps])

	return (
		<Edit saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout='vertical'>
				<Form.Item label='Name' name={['name']} rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item label='Price' name={['price']} rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item label='images' name={['images']}>
					<Upload form={formProps.form} onUploadSuccess={handleUploadSuccess} />
					<Input
						className='mt-2'
						value={image}
						onChange={e => {
							setImage(e.target.value)
							if (e.target.value) {
								formProps.form?.setFieldValue('images', [e.target.value])
							}
						}}
					/>
				</Form.Item>

				<Form.Item label='Author' name={['author']} rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item label='Publisher' name={['publisher']} rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item
					label='Published Date'
					name={['publishedDate']}
					rules={[{ required: true }]}
					// @ts-ignore
					getValueProps={(value: string): DatePickerValueProps => ({
						value: value && dayjs(value).isValid() ? dayjs(value) : null,
					})}
					normalize={value => (value ? dayjs(value).format('YYYY') : null)}>
					<DatePicker picker='year' format='YYYY' />
				</Form.Item>

				<Form.Item label='Category' name={['categories']} rules={[{ required: true }]}>
					<Select selectProps={selectProps} dropdownStyle={{ maxHeight: 200 }} />
				</Form.Item>

				<Form.Item label='Number of pages' name={['numPage']} rules={[{ required: true }]}>
					<InputNumber />
				</Form.Item>
			</Form>
		</Edit>
	)
}
