import { MAX_PRODUCT_IMAGE_COUNT } from '@/commons/constants';
import BooleanField from '@/components/BooleanField';
import DeleteButton from '@/components/DeleteButton';
import Select from '@/components/Select';
import { DoubleRightOutlined, EditOutlined } from '@ant-design/icons';
import { CreateButton, Edit, EditButton, useForm, useSelect } from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { axiosInstance } from '@refinedev/simple-rest';
import { Button, Flex, Form, Image, Input, InputNumber, Modal, Space, Table, message, Upload } from 'antd';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const ProductEdit = () => {
	const { formProps, saveButtonProps, queryResult } = useForm({});
	const [modal, setModal] = useState('');
	const { selectProps } = useSelect({
		resource: 'categories',
		optionLabel: 'name',
		optionValue: 'id',
	});
	const { id } = useParams();
	const [variants, setVariants] = useState([]);
	const [images, setImages] = useState<string[]>([]);
	const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
	const [newImageUrl, setNewImageUrl] = useState('');
	const [editImageUrl, setEditImageUrl] = useState('');
	const [loadingImage, setLoadingImage] = useState(false);

	useEffect(() => {
		axiosInstance.get('/services/api/products/' + id + '/variants').then(res => {
			setVariants(res.data);
		});
		axiosInstance.get('/services/api/products/' + id + '/images').then(res => {
			setImages(res.data);
		});
	}, []);

	useEffect(() => {
		if (queryResult?.data?.data) {
			formProps.form?.setFieldsValue({
				category_id: String(queryResult.data.data.category_id),
			});
		}
	}, [queryResult?.data?.data]);

	const fetchImages = () => {
		axiosInstance.get('/services/api/products/' + id + '/images').then(res => {
			setImages(res.data);
		});
	};

	const fetchVariants = () => {
		axiosInstance.get('/services/api/products/' + id + '/variants').then(res => {
			setVariants(res.data);
		});
	};

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
							icon={<EditOutlined />}>
							Image
						</Button>
						<Button type="primary" onClick={() => setModal('variant')} icon={<DoubleRightOutlined />}>
							Variant
						</Button>
					</>
				);
			}}>
			<Modal open={modal === 'image'} onCancel={() => { setModal(''); setEditingImageIndex(null); }} title="Image">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Input
							placeholder="Nhập link ảnh mới"
							value={newImageUrl}
							onChange={e => setNewImageUrl(e.target.value)}
							style={{ width: 300 }}
						/>
						<Button
							type="primary"
							loading={loadingImage}
							onClick={async () => {
								if (!newImageUrl) return message.warning('Vui lòng nhập link ảnh');
								setLoadingImage(true);
								try {
									await axiosInstance.post('/services/api/products/' + id + '/images', { imageUrl: newImageUrl });
									setNewImageUrl('');
									fetchImages();
									message.success('Thêm ảnh thành công');
								} catch (err) {
									message.error('Lỗi khi thêm ảnh');
								} finally {
									setLoadingImage(false);
								}
							}}
						>Thêm ảnh</Button>
					</div>
					<Table
						dataSource={images.map((img, idx) => ({ imageUrl: img, key: idx }))}
						rowKey="key"
						pagination={false}
					>
						<Table.Column dataIndex="key" title="#" render={idx => idx + 1} />
						<Table.Column dataIndex="imageUrl" title="Image" render={url => <Image src={url} width={80} />} />
						<Table.Column
							title="Actions"
							render={(_, record) => (
								<Upload
									showUploadList={false}
									accept="image/*"
									customRequest={async ({ file, onSuccess, onError }) => {
										const formData = new FormData();
										formData.append('image', file);
										try {
											const res = await axiosInstance.post('/services/api/upload', formData, {
												headers: { 'Content-Type': 'multipart/form-data' },
											});
											await axiosInstance.put('/services/api/products/' + id + '/images/' + record.key, { imageUrl: res.data.imageUrl });
											fetchImages();
											onSuccess && onSuccess({}, file);
											message.success('Thay ảnh thành công');
										} catch (err) {
											onError && onError(err as any);
											message.error('Lỗi khi thay ảnh');
										}
									}}
								>
									<Button size="small">Thay ảnh</Button>
								</Upload>
							)}
						/>
					</Table>
				</div>
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
								<DeleteButton id={record.id!} afterDelete={fetchVariants} />
							</Space>
						)}
					/>
				</Table>
			</Modal>
			<Form {...formProps} layout="vertical">
				<Form.Item
					label="Tên tác phẩm"
					name={['name']}
					rules={[
						{ required: true, message: "Please enter book name" },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Tác giả"
					name={['author']}
					rules={[
						{ required: true, message: "Please enter author" },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Nhà xuất bản"
					name={['publisher']}
					rules={[
						{ required: true, message: "Please enter publisher" },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Description"
					name={['description']}
					rules={[
						{
							required: false,
						},
					]}>
					<TextArea />
				</Form.Item>
				<Flex gap={8} align="center">
					<FormItemLabel label="Price" prefixCls="" />
					<Form.Item name={['price']} style={{ marginBottom: 0, marginTop: 4 }}>
						<InputNumber
							style={{ width: 120 }}
							min={0}
							step={1000}
							formatter={value =>
								value !== undefined && value !== null
									? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: ''
							}

						/>
					</Form.Item>
				</Flex>
				<Form.Item label="Category" name={['categories', 0, '_id']}>
					<Select
						selectProps={selectProps}
						showSearch
						placeholder="Chọn category"
						optionFilterProp="label"
					/>
				</Form.Item>
				<Flex gap={8} align="center">
					<FormItemLabel label="Best sale" prefixCls="" />
					<Form.Item
						label=""
						name={['isBestSale']}
						style={{
							marginBottom: 0,
							marginTop: 4,
						}}
						valuePropName="checked">
						<Input type="checkbox" />
					</Form.Item>
				</Flex>
				<Form.Item label="Images">
					<Upload
						listType="picture-card"
						fileList={images.map((url, idx) => ({
							uid: String(idx),
							name: `image-${idx}`,
							status: 'done',
							url,
						}))}
						customRequest={async ({ file, onSuccess, onError }) => {
							const formData = new FormData();
							formData.append('image', file);
							try {
								const res = await axiosInstance.post('/services/api/upload', formData, {
									headers: { 'Content-Type': 'multipart/form-data' },
								});
								await axiosInstance.post('/services/api/products/' + id + '/images', { imageUrl: res.data.imageUrl });
								fetchImages();
								onSuccess && onSuccess({}, file);
								message.success('Thêm ảnh thành công');
							} catch (err) {
								onError && onError(err as any);
								message.error('Lỗi khi upload ảnh');
							}
						}}
						onRemove={async (file) => {
							const idx = images.findIndex(url => url === file.url);
							if (idx > -1) {
								await axiosInstance.delete('/services/api/products/' + id + '/images/' + idx);
								fetchImages();
								message.success('Xóa ảnh thành công');
							}
						}}
						showUploadList={{ showRemoveIcon: true }}
						accept="image/*"
						multiple
					>
						{images.length < MAX_PRODUCT_IMAGE_COUNT && '+ Thêm ảnh'}
					</Upload>
				</Form.Item>
			</Form>
		</Edit>
	);
};