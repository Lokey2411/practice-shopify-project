import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow = () => {
	const { queryResult } = useShow({});
	const { data, isLoading } = queryResult;

	const record = data?.data;

	return (
		<Show isLoading={isLoading}>
			<Title level={5}>ID</Title>
			<TextField value={record?.id || record?._id} />

			<Title level={5}>Tên</Title>
			<TextField value={record?.name} />

			<Title level={5}>Email</Title>
			<TextField value={record?.email} />


			<Title level={5}>Số điện thoại</Title>
			<TextField value={record?.phone} />

			<Title level={5}>Địa chỉ</Title>
			<TextField value={record?.address} />

			<Title level={5}>Ngày tạo</Title>
			<TextField value={record?.createdAt} />
		</Show>
	);
};

export default UserShow;
