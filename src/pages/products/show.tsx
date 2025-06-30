import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Image, Row, Col, Tag, Badge } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const ProductShow = () => {
	const { queryResult } = useShow({});
	const { data, isLoading } = queryResult;
	const record = data?.data;

	return (
		<Show isLoading={isLoading}>
			<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
				{/* Ảnh sản phẩm */}
				<div className="flex-1 flex flex-col items-center justify-center">
					{record?.images && record.images.length > 0 ? (
						<Badge.Ribbon text={record?.isNewArrival ? 'Mới' : ''} color="red" className="mb-2">
							<Image
								src={record.images[0]}
								alt={record?.name}
								width={320}
								height={400}
								className="rounded-xl shadow-lg object-cover mb-4"
								preview={{ mask: 'Click để phóng to' }}
							/>
						</Badge.Ribbon>
					) : (
						<div className="w-80 h-96 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
							Không có ảnh
						</div>
					)}
					{/* Hiển thị các ảnh nhỏ nếu có nhiều ảnh */}
					{record?.images && record.images.length > 1 && (
						<Row gutter={8} className="mt-2">
							{record.images.slice(1).map((img: string, idx: number) => (
								<Col key={idx}>
									<Image src={img} width={60} height={60} className="rounded shadow" preview={false} />
								</Col>
							))}
						</Row>
					)}
				</div>
				{/* Thông tin sản phẩm */}
				<div className="flex-1 flex flex-col gap-2">
					<div className="flex items-center gap-2 mb-2">
						<Title level={2} className="!text-blue-800 !mb-0">{record?.name || record?.title}</Title>
						{record?.isBestSale && <Tag color="gold" className="font-bold text-base">Best Sale</Tag>}
					</div>
					<Tag color="blue" className="text-lg font-bold px-4 py-1 w-fit mb-2">{record?.price?.toLocaleString()}₫</Tag>
					<Paragraph className="text-gray-700 text-base mb-2">
						{record?.description || 'Không có mô tả.'}
					</Paragraph>
					<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-2">
						<div>
							<Text strong>Tác giả:</Text> <Text>{record?.author || '-'}</Text>
						</div>
						<div>
							<Text strong>Nhà xuất bản:</Text> <Text>{record?.publisher || '-'}</Text>
						</div>
						<div>
							<Text strong>Năm xuất bản:</Text> <Text>{record?.publishedDate || '-'}</Text>
						</div>
						<div>
							<Text strong>Số trang:</Text> <Text>{record?.numPage || '-'}</Text>
						</div>
						<div>
							<Text strong>Danh mục:</Text> <Text>{record?.category?.name || '-'}</Text>
						</div>
						<div>
							<Text strong>ID:</Text> <Text copyable>{record?.id}</Text>
						</div>
						<div>
							<Text strong>Tồn kho:</Text> <Text type={record?.stock === 0 ? 'danger' : undefined}>{record?.stock ?? '-'}</Text>
						</div>
					</div>
				</div>
			</div>
		</Show>
	);
};