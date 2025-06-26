import Upload from '@/components/Upload'
import { Create, useForm, useSelect } from '@refinedev/antd'
import { DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router'
import { axiosInstance } from '@refinedev/simple-rest'

export const ProductCreate = () => {
	const { id } = useParams()
	const [initialValues, setInitialValues] = useState<any>(null)

	useEffect(() => {
		axiosInstance.get('/services/api/products/' + id).then(res => {
			const data = res.data?.data || res.data
			let publishedDate = data.publishedDate
			if (publishedDate && !dayjs.isDayjs(publishedDate)) {
				if (typeof publishedDate === 'number') {
					publishedDate = publishedDate.toString()
				}
				if (typeof publishedDate === 'string' || typeof publishedDate === 'number') {
					publishedDate = dayjs(publishedDate)
				} else {
					publishedDate = null
				}
			}
			if (!publishedDate) publishedDate = null
			setInitialValues({ ...data, publishedDate })
		})
	}, [id])

	const { formProps, saveButtonProps } = useForm({
		initialValues,
	})
	const [image, setImage] = useState('')

	// Thêm hook lấy danh sách categories
	const { selectProps: categorySelectProps } = useSelect({
		resource: 'categories',
		optionLabel: 'name',
		optionValue: '_id',
	})

	const handleUploadSuccess = (url: string) => {
		formProps.form?.setFieldsValue({ images: [url] }) // Cập nhật field image trong form;
		setImage(url)
	}

	const onFinish = (values) => {
		// Đảm bảo price là số
		values.price = Number(values.price);
		// Đảm bảo publishedDate là string năm
		if (typeof values.publishedDate !== 'string') {
			values.publishedDate = values.publishedDate.format('YYYY');
		}
		// ...submit values
	}

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

				{/* Thêm trường chọn danh mục */}
				<Form.Item
					label='Categories'
					name={['categories']}
					rules={[{ required: true, message: 'Please select at least one category' }]}
				>
					<Select
						{...categorySelectProps}
						mode='multiple' // Nếu chỉ chọn 1 thì bỏ dòng này
						placeholder='Select categories'
					/>
				</Form.Item>

				<Form.Item
					label={'Price'}
					name={['price']}
					rules={[{ required: true }]}
				>
					<InputNumber
						min={0}
						style={{ width: '100%' }}
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={value => value ? value.replace(/[^0-9]/g, '') : ''}
					/>
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
