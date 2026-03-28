import {
  Table,
  Tag,
  Select,
  DatePicker,
  Button,
  Space,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { filterOrders, getOrderById } from "@/services/orderService";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function OrdersPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<any>({});
  const [detail, setDetail] = useState<any>(null);

  const fetchData = async () => {
    const res = await filterOrders(filters);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const columns = [
    {
      title: "Mã HD",
      dataIndex: "code",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      render: (v: number) => v?.toLocaleString() + " đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (s: number) => {
        const map: any = {
          1: "Chờ xác nhận",
          2: "Đang giao",
          5: "Hoàn thành",
        };
        return <Tag>{map[s]}</Tag>;
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      render: (s: number) =>
        s === 1 ? <Tag color="green">Đã thanh toán</Tag> : <Tag>Chưa</Tag>,
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Button
          onClick={async () => {
            const res = await getOrderById(record.id);
            setDetail(res.data);
          }}
          
        >
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý hóa đơn</h2>

      {/* FILTER */}
      <Space style={{ marginBottom: 20 }}>
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setFilters({ ...filters, status: v })}
        >
          <Select.Option value={1}>Chờ</Select.Option>
          <Select.Option value={2}>Đang giao</Select.Option>
          <Select.Option value={5}>Hoàn thành</Select.Option>
        </Select>

        <RangePicker
          onChange={(dates) => {
            setFilters({
              ...filters,
              fromDate: dates?.[0]?.format("YYYY-MM-DD"),
              toDate: dates?.[1]?.format("YYYY-MM-DD"),
            });
          }}
        />

        <Button type="primary" onClick={fetchData}>
          Lọc
        </Button>
      </Space>

      {/* TABLE */}
      <Table rowKey="id" dataSource={data} columns={columns} />

      {/* DETAIL */}
      <Modal
        open={!!detail}
        onCancel={() => setDetail(null)}
        footer={null}
        width={800}
      >
        <h3>Chi tiết hóa đơn</h3>

        {detail?.items?.map((i: any) => (
          <div key={i.id} style={{ display: "flex", marginBottom: 10 }}>
            <img src={i.image} width={50} />
            <div style={{ marginLeft: 10 }}>
              <div>{i.productName}</div>
              <div>Số lượng: {i.quantity}</div>
              <div>Giá: {i.price}</div>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}