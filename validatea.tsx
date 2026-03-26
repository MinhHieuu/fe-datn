
import React from "react";
import { Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProductForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Dữ liệu hợp lệ:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {/* Tên sản phẩm */}
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[
          { required: true, message: "Không được để trống" },
          { min: 3, message: "Ít nhất 3 ký tự" }
        ]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      {/* Giá */}
      <Form.Item
        label="Giá"
        name="price"
        rules={[
          { required: true, message: "Nhập giá" },
          {
            type: "number",
            min: 1,
            message: "Giá phải > 0"
          }
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      {/* Số lượng */}
      <Form.Item
        label="Số lượng"
        name="quantity"
        rules={[
          { required: true, message: "Nhập số lượng" },
          {
            type: "number",
            min: 0,
            message: "Không được âm"
          }
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      {/* Ảnh */}
      <Form.Item
        label="Ảnh sản phẩm"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[
          { required: true, message: "Vui lòng upload ảnh" }
        ]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ProductForm;