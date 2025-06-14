import { Show, TextField } from '@refinedev/antd'; // Chỉ import từ @refinedev/antd những gì cần thiết
import { useShow } from '@refinedev/core';
import { Typography, Image, Row, Col } from 'antd'; // Import Image, Row, Col từ antd

const { Title } = Typography;

export const ProductShow = () => {
	const { queryResult } = useShow({});
	const { data, isLoading } = queryResult;

	const record = data?.data;

	return (
		<Show isLoading={isLoading}>
			<Title level={5}>ID</Title>
			<TextField value={record?.id} />
			<Title level={5}>Title</Title>
			<TextField value={record?.title} />
			<Title level={5}>Images</Title>
			{record?.images && record.images.length > 0 ? (
				<Row gutter={[16, 16]}>
					{record.images.map((imageUrl, index) => (
						<Col key={index} xs={24} sm={12} md={8} lg={6}>
							<Image
								src={imageUrl}
								alt={`Product Image ${index + 1}`}
								width={200}
								height={200}
								preview={{ mask: 'Click to enlarge' }}
							/>
						</Col>
					))}
				</Row>
			) : (
				<TextField value="No images available" />
			)}
		</Show>
	);
};