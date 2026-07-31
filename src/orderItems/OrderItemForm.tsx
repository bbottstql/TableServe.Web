import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import { IOrderItem } from "../orderItems/IOrderItem";
import { IMenuItem } from "../menuItems/IMenuItem";
import { menuItemAPI } from "../menuItems/MenuItemAPI";
import { orderItemAPI } from "../orderItems/OrderItemAPI";

function OrderItemForm() {
  let { itemId, id } = useParams<{ itemId: string; id: string }>();
  const orderItemId = Number(itemId);
  const orderId = Number(id);
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    IMenuItem | undefined
  >(undefined);

  let emptyOrderItem: IOrderItem = {
    id: undefined,
    quantity: 0,
    notes: undefined,
    orderId: orderId, // ← from the parent route param
    menuItemId: 0,
    menuItem: undefined,
    order: undefined,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IOrderItem>({
    defaultValues: async () => {
      await loadMenuItems();
      if (!itemId) {
        return Promise.resolve(emptyOrderItem);
      } else {
        const orderItem = await orderItemAPI.find(orderItemId);
        return Promise.resolve(orderItem);
      }
    },
  });

  async function loadMenuItems() {
    const data = await menuItemAPI.list();
    setMenuItems(data);
  }

  let menuItemId = watch("menuItemId");
  let quantity = watch("quantity");

  useEffect(() => {
    let currentMenuItem = menuItems.find((m) => m?.id === menuItemId);
    setSelectedMenuItem(currentMenuItem);
  }, [menuItemId]);

  const save: SubmitHandler<IOrderItem> = async (orderItem) => {
    try {
      if (!orderItem.id) {
        orderItem = await orderItemAPI.post(orderItem);
      } else {
        await orderItemAPI.put(orderItem);
      }
      toast.success("Successfully saved.");
      navigate(`/orders/detail/${orderItem.orderId}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="form w-50" onSubmit={handleSubmit(save)}>
      <div className="card p-4">
        <h5 className="card-title">
          <strong>Item</strong>
        </h5>

        <div className="mb-3">
          <label htmlFor="menuItemId" className="form-label">
            Menu Item
          </label>
          <select
            {...register("menuItemId", {
              valueAsNumber: true,
              required: "Menu item is required",
            })}
            className={`form-select ${errors?.menuItemId && "is-invalid"}`}
          >
            <option value="0">Select…</option>
            {menuItems.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.menuItemId?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <div className="form-label">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(selectedMenuItem?.price ?? 0)}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
            className={`form-control ${errors?.quantity && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors?.quantity?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <input
            id="notes"
            type="text"
            {...register("notes")}
            className="form-control"
            placeholder="Enter any notes for this item (optional)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <div className="form-label">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format((selectedMenuItem?.price ?? 0) * quantity)}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Link
            to={`/orders/detail/${orderId}`}
            className="btn btn-outline-primary me-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Save item
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderItemForm;
