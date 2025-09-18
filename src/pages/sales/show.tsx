import { BooleanField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const SaleShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"Product"}</Title>
      <TextField value={record?.product.name} />
      <Title level={5}>{"Percentage"}</Title>
      <TextField value={record?.percentage} />
      <Title level={5}>{"isFlashSale"}</Title>
      <BooleanField value={record?.isFlashSale} />
    </Show>
  );
};
