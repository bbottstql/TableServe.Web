import { SyntheticEvent, useEffect, useState } from "react";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";
import OrderRow from "./OrderRow.tsx";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  async function loadOrders() {
    const data = await orderAPI.list(searchParams.get("status") ?? undefined);
    setOrders(data);
  }

  function removeOrder(order: IOrder) {
    setOrders(orders.filter((o) => o.id !== order.id));
  }

  useEffect(() => {
    loadOrders();
  }, [searchParams.get("status")]);

  function handleStatusChange(event: SyntheticEvent) {
    setSearchParams({ status: (event.target as HTMLSelectElement).value });
  }

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom">
        <h2>Orders</h2>
        <Link to="/orders/create" className="btn btn-primary mb-3">
          <svg
            className="bi pe-none me-2"
            width={32}
            height={32}
            fill="#FFFFFF"
          >
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>
          Add Order
        </Link>
      </div>
      <section className="list bg-body-tertiary p-4 rounded-4">
        <select
          id="status"
          className="form-select w-auto mb-3"
          value={searchParams.get("status") ?? ""}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="PLACED">Placed</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY">Ready</option>
          <option value="SERVED">Served</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <table className="table table-hover w-100 rounded-4">
          <thead>
            <tr>
              <th scope="col">Order #</th>
              <th scope="col">Table</th>
              <th scope="col">Notes</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Staff</th>
              <th scope="col">Ordered At</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onRemove={removeOrder} />
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default OrdersPage;
