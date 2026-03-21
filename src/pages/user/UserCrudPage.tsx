import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserCrudPage() {
  const [data, setData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const openModal = (record?: User) => {
    setIsModalOpen(true);
    if (record) {
      setEditingUser(record);
      form.setFieldsValue(record);
    } else {
      setEditingUser(null);
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        const newData = data.map((item) =>
          item.id === editingUser.id ? { ...item, ...values } : item
        );
        setData(newData);
        message.success("Cập nhật thành công");
      } else {
        const newUser: User = {
          id: Date.now(),
          ...values,
        };
        setData([...data, newUser]);
        message.success("Thêm thành công");
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    message.success("Xóa thành công");
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Hành động",
      render: (_: any, record: User) => (
        <Space>
          <Button type="primary" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý người dùng</h2>

      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Thêm mới
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <Modal
        title={editingUser ? "Sửa" : "Thêm"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
