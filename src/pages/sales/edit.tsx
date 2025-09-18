import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/core";
import { Flex, Form, Input, InputNumber } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";

export const SaleEdit = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { options } = useSelect({
    resource: "products",
    optionLabel: "name",
    optionValue: "_id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label={'Product'}
          name={['product']}
          rules={[
            {
              required: true,
            },
          ]}>
          <select>
            {options.map(opt => {
              return (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )
            })}
          </select>
        </Form.Item>
        <Flex gap={8} align='center'>
          <FormItemLabel prefixCls='' label='Is Flash Sale'></FormItemLabel>
          <Form.Item className='mb-0' label='' name={['isFlashSale']}>
            <Input type='checkbox' />
          </Form.Item>
        </Flex>
        <Form.Item label={'Percentage'} name={['percentage']}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Edit>
  );
};
