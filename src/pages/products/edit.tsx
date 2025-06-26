import { MAX_PRODUCT_IMAGE_COUNT } from '@/commons/constants';
import DeleteButton from '@/components/DeleteButton';
import { DoubleRightOutlined, FileImageOutlined } from '@ant-design/icons';
import { CreateButton, Edit, EditButton, useForm, useSelect } from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { axiosInstance } from '@refinedev/simple-rest';
import { Button, Col, Flex, Form, Image, Input, InputNumber, Modal, ModalProps, Row, Select, Space, Table } from 'antd';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DatePicker } from 'antd';
import Upload from '@/components/Upload';
import dayjs from 'dayjs';

export const ProductEdit = () => {
	const { form, formProps, saveButtonProps } = useForm({});
	const [modal, setModal] = useState('');
	const { selectProps } = useSelect({
		resource: 'categories',
		optionLabel: 'name',
		optionValue: 'id',
		defaultValue: formProps?.form?.getFieldValue('category_id'),
	});
	const { id } = useParams();
	const [variants, setVariants] = useState([]);

	// Lấy danh sách variants nếu cần (không động đến images nữa)
	useEffect(() => {
		axiosInstance.get('/services/api/products/' + id + '/variants').then(res => {
			setVariants(res.data);
		});
	}, [id]);

	// Đảm bảo publishedDate luôn là dayjs hoặc null
	useEffect(() => {
		if (formProps.form) {
			let publishedDate = formProps.form.getFieldValue('publishedDate');
			if (publishedDate && !dayjs.isDayjs(publishedDate)) {
				if (typeof publishedDate === 'number') {
					publishedDate = publishedDate.toString();
				}
				if (typeof publishedDate === 'string' || typeof publishedDate === 'number') {
					formProps.form.setFieldsValue({
						publishedDate: dayjs(publishedDate),
					});
				} else {
					formProps.form.setFieldsValue({
						publishedDate: null,
					});
				}
			}
			if (!publishedDate) {
				formProps.form.setFieldsValue({
					publishedDate: null,
				});
			}
		}
	}, [formProps.form, formProps.initialValues]);

	// Custom onFinish to transform data before submit
	const handleFinish = (values: any) => {
		if (values.publishedDate && typeof values.publishedDate !== 'string') {
			values.publishedDate = values.publishedDate.format('YYYY');
		}
		if (values.price && typeof values.price !== 'number') {
			values.price = Number(values.price);
		}
		if (formProps.onFinish) {
			return formProps.onFinish(values);
		}
	};

	// Lấy ảnh từ trường images của sản phẩm
	const images = formProps.form?.getFieldValue('images') || [];

	return (
		<Edit
			saveButtonProps={saveButtonProps}
			headerButtons={({ defaultButtons }) => {
				return (
					<>
						{defaultButtons}
						<Button
							type="primary"
							onClick={() => {
								setModal('image');
							}}
							icon={<FileImageOutlined />}>
							Image
						</Button>
						<Button type="primary" onClick={() => setModal('variant')} icon={<DoubleRightOutlined />}>
							Variant
						</Button>
					</>
				);
			}}>
			<Modal open={modal === 'image'} onCancel={() => setModal('')} title="Image">
				<div className="flex justify-end items-center my-2 gap-4">
					<p className="text-md font-bold">
						{images.length}/{MAX_PRODUCT_IMAGE_COUNT}
					</p>
				</div>
				<Table dataSource={images.map((url, idx) => ({ id: idx + 1, imageUrl: url }))} rowKey="id" pagination={false}>
					<Table.Column dataIndex="id" title="Id" />
					<Table.Column dataIndex="imageUrl" title="imageUrl" render={url => <Image src={url} preview={false} />} />
				</Table>
			</Modal>
			<Modal open={modal === 'variant'} onCancel={() => setModal('')} title="Variant">
				<div className="flex justify-end mt-2">
					<CreateButton
						href={'/products/' + id + '/variants/create'}
						size="large"
						onClick={() => {
							window.location.href = '/products/' + id + '/variants/create';
						}}
					/>
				</div>
				<Table dataSource={variants} rowKey="id" pagination={false}>
					<Table.Column dataIndex="name" title="Name" />
					<Table.Column dataIndex="price" title="Price" />
					<Table.Column dataIndex="variantType" title="Type" />
					<Table.Column
						title="Actions"
						render={(_, record: BaseRecord) => (
							<Space>
								<EditButton
									hideText
									size="small"
									recordItemId={record.id}
									href={'/products/' + id + '/variants/edit/' + record.id}
								/>
								<DeleteButton id={record.id!} />
							</Space>
						)}
					/>
				</Table>
			</Modal>
			<Form {...formProps} form={form} layout="vertical" onFinish={handleFinish}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form.Item label="Tên sách" name={['name']} rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Tác giả" name={['author']} rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form.Item label="Nhà xuất bản" name={['publisher']} rules={[{ required: true, message: 'Vui lòng nhập nhà xuất bản!' }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Năm xuất bản" name={['publishedDate']} rules={[{ required: true, message: 'Vui lòng chọn năm xuất bản!' }]}>
							<DatePicker picker='year' format={'YYYY'} className='w-full' />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<Form.Item label="Số trang" name={['numPage']} rules={[{ required: true, message: 'Vui lòng nhập số trang!' }]}>
							<InputNumber className='w-full' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item label="Giá" name={['price']} rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
							<InputNumber className='w-full' min={0} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Mô tả" name={['description']}>
					<TextArea rows={3} />
				</Form.Item>
				<Form.Item label="Danh mục" name={['category_id']} rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
					<Select {...selectProps} placeholder='Chọn danh mục' />
				</Form.Item>
				<Form.Item label="Ảnh sản phẩm" name={['images']}>
					<Upload form={formProps.form} onUploadSuccess={() => { }} />
				</Form.Item>
				<Flex gap={8} align="center">
					<FormItemLabel label="Best sale" prefixCls="" />
					<Form.Item label="" name={['isBestSale']} style={{ marginBottom: 0, marginTop: 4 }} valuePropName="checked">
						<Input type="checkbox" />
					</Form.Item>
				</Flex>
			</Form>
		</Edit>
	);
};