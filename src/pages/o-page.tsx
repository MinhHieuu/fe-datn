import { Table, DatePicker, Select, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { filterOrders } from "../api/orderApi";

const { RangePicker } = DatePicker;

export default function OrderPage() {
  const [data, setData] = useState([]);

  const fetchData = async (params = {}) => {
    const res = await filterOrders(params);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
    },
    {
      title: "Ngày",
      dataIndex: "createdAt",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16}>
        <Col>
          <Select
            placeholder="Trạng thái"
            style={{ width: 150 }}
            onChange={(value) => fetchData({ status: value })}
            allowClear
          >
            <Select.Option value={1}>Chờ</Select.Option>
            <Select.Option value={5}>Hoàn thành</Select.Option>
          </Select>
        </Col>

        <Col>
          <RangePicker
            onChange={(dates) => {
              if (dates) {
                fetchData({
                  fromDate: dates[0].format("YYYY-MM-DD"),
                  toDate: dates[1].format("YYYY-MM-DD"),
                });
              }
            }}
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}