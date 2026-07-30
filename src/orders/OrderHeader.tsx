import { IOrder } from "./IOrder";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";

interface IOrderHeaderProps {
  order: IOrder;
}

function OrderHeader({ order }: IOrderHeaderProps) {
  return (
    <section className="d-flex flex-wrap gap-4 justify-content-between pe-5">
      <dl>
        <dt>Table Number</dt>
        <dd>{order.tableNumber}</dd>
        <dt>Notes</dt>
        <dd>{order.notes || "—"}</dd>
      </dl>
      <dl>
        <dt>Status</dt>
        <dd>
          <span className={`badge ${getTextBackgroundByStatus(order.status)}`}>
            {order.status}
          </span>
        </dd>
        <dt>Total</dt>
        <dd>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(order.total)}
        </dd>
      </dl>
      <dl>
        <dt>Staff</dt>
        <dd>
          {order.staff?.firstName} {order.staff?.lastName}
        </dd>
        <dt>Ordered At</dt>
        <dd>
          {new Date(order.orderedAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </dd>
        {order.status === "CANCELLED" && (
          <>
            <dt>Cancellation Reason</dt>
            <dd>{order.cancellationReason}</dd>
          </>
        )}
      </dl>
    </section>
  );
}

export default OrderHeader;
