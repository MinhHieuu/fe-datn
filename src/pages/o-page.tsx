import { useEffect, useState } from "react";
import axios from "axios";
import "./orders-page.css";

interface Order {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  total: number;
  status: number;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [keyword, setKeyword] = useState("");

  const fetchOrders = () => {
    axios.get("http://localhost:8080/api/order")
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = (id: string, status: number) => {
    if (!window.confirm("Xác nhận đổi trạng thái?")) return;

    axios.put(`http://localhost:8080/api/order/status/${id}`, { status })
      .then(() => {
        fetchOrders();
      });
  };

  const getStatusText = (s: number) => {
    return ["Chờ", "Xác nhận", "Đang giao", "Hoàn thành", "Hủy"][s];
  };

  return (
    <div className="orders-container">
      <h2>Quản lý hóa đơn</h2>

      {/* FILTER CARD */}
      <div className="card filter-card">
        <input
          placeholder="Tìm mã hóa đơn..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* TABLE CARD */}
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Khách</th>
              <th>SĐT</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders
              .filter(o => o.code.includes(keyword))
              .map(o => (
                <tr key={o.id}>
                  <td>{o.code}</td>
                  <td>{o.customerName}</td>
                  <td>{o.phone}</td>
                  <td>{o.total.toLocaleString()}đ</td>

                  <td>
                    <span className={`status s${o.status}`}>
                      {getStatusText(o.status)}
                    </span>
                  </td>

                  <td>{o.createdAt}</td>

                  <td>
                    <button className="btn view"
                      onClick={() => window.location.href = `/admin/order-detail/${o.id}`}>
                      Xem
                    </button>

                    {o.status < 3 && (
                      <button
                        className="btn next"
                        onClick={() => changeStatus(o.id, o.status + 1)}
                      >
                        Next
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;