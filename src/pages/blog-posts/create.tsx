import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Flex, Form, Input, Select } from "antd";

export const BlogPostCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Flex justify="space-between" align="center" className="gap-2 mb-2 md:gap-0">
          <Form.Item
            label={"Title"}
            name={["title"]}
            rules={[
              {
                required: true,
              },
            ]}
            className=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Content"}
            name="content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <MDEditor data-color-mode="light" />
          </Form.Item>
        </Flex>
        <Form.Item
          label={"Category"}
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "rejected", label: "Rejected" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
