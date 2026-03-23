import { useEffect, useState } from "react"
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd"
import { productService } from "@/services/productService"
import { Product } from "@/types/product"

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form] = Form.useForm()

  // ================= LOAD =================
  const loadData = async () => {
    try {
      setLoading(true)
      const res = await productService.getAll()
      setData(res)
    } catch {
      message.error("Lỗi load data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // ================= OPEN =================
  const openModal = (record?: Product) => {
    setOpen(true)
    if (record) {
      setEditing(record)
      form.setFieldsValue(record)
    } else {
      setEditing(null)
      form.resetFields()
    }
  }

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const values = await form.validateFields()

      if (editing) {
        await productService.update(editing.id, values)
        message.success("Update OK")
      } else {
        await productService.create(values)
        message.success("Create OK")
      }

      setOpen(false)
      loadData()
    } catch {}
  }

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    await productService.delete(id)
    message.success("Delete OK")
    loadData()
  }

  const columns = [
    { title: "Tên", dataIndex: "name" },
    { title: "Giá", dataIndex: "price" },
    { title: "Danh mục", dataIndex: "category" },
    {
      title: "Action",
      render: (_: any, record: Product) => (
        <Space>
          <Button onClick={() => openModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>

      <Button type="primary" onClick={() => openModal()}>
        Thêm
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={loading}
      />

      <Modal
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        title={editing ? "Sửa" : "Thêm"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Danh mục">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}