import Upload from '@/components/Upload'
import { Create, useForm, useSelect } from '@refinedev/antd'
import { DatePicker, Form, Input, InputNumber, Button } from 'antd'
import { useState } from 'react'

export const ProductCreate = () => {
	const { formProps, saveButtonProps } = useForm({})
	const [image, setImage] = useState('')

	const { selectProps: categorySelectProps } = useSelect({
		resource: 'categories',
		optionLabel: 'name',
		optionValue: '_id',
	})

	const handleUploadSuccess = (url: string) => {
		formProps.form?.setFieldsValue({ images: [url] }) // Cập nhật field image trong form;
		setImage(url)
	}

	function formatCurrency(value: string | number | null | undefined) {
		if (value == null || value === '') return '';
		const number = Number(value);
		if (isNaN(number)) return '';
		return number.toLocaleString('vi-VN') + ' đ';
	}

	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form
				{...formProps}
				layout='vertical'
			>
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
					label="Categories"
					name="categories"
					rules={[{ required: true, message: "Please select at least one category" }]}
				>
					<select className="w-full rounded-lg border-blue-300">
						{categorySelectProps.options?.map(opt => (
							<option key={opt.value} value={opt.value ?? ''}>
								{opt.label}
							</option>
						))}
					</select>
				</Form.Item>

				<Form.Item
					label="Price"
					name="price"
					rules={[{ required: true, message: "Please enter Price" }]}
				>
					<InputNumber
						min={0}
						style={{ width: '100%' }}
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
				<Button htmlType="submit">Tạo sản phẩm</Button>
			</Form>
		</Create>
	)
}
