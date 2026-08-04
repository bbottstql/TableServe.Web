import Dropdown from "react-bootstrap/esm/Dropdown";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";
import { Link } from "react-router-dom";

interface IOrderRowProps {
  order: IOrder;
  onRemove: (order: IOrder) => void;
}

function OrderRow({ order, onRemove }: IOrderRowProps) {
  return (
    <tr>
      <th scope="row">{order.id}</th>
      <td>{order.tableNumber}</td>
      <td className="text-body-secondary small text-wrap">
        {order.notes || "—"}
      </td>
      <td>
        <span className={`badge ${getTextBackgroundByStatus(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td>${order.total}</td>
      <td>
        {order.staff?.firstName} {order.staff?.lastName}
      </td>
      <td>
        {new Date(order.orderedAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </td>
      <td>
        <Dropdown className="d-inline">
          <Dropdown.Toggle
            variant="light"
            className="no-caret"
            style={{ background: "none" }}
          >
            <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/orders/detail/${order.id}`}>
              View
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/orders/edit/${order.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("Are you sure you want to delete this order?")) {
                  if (order.id) {
                    await orderAPI.delete(order.id);
                    onRemove(order); // tell the parent to drop the row
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default OrderRow;
