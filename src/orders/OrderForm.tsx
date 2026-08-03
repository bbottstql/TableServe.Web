import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IStaff } from "../staff/IStaff";
import { staffAPI } from "../staff/StaffAPI";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";

function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [staffList, setStaffList] = useState<IStaff[]>([]);

  async function loadStaff() {
    setStaffList(await staffAPI.list());
  }

  const emptyOrder: IOrder = {
    id: undefined,
    tableNumber: undefined,
    notes: undefined,
    status: "PLACED",
    cancellationReason: undefined,
    total: 0,
    orderedAt: new Date().toISOString(),
    staffId: undefined,
    orderItems: [],
  };



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>({
    defaultValues: async () => {
      await loadStaff();
      if (!id) return emptyOrder;
      return await orderAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IOrder> = async (order) => {
    try {
      if (!order.id) {
        const newOrder = await orderAPI.post(order);
        navigate(`/orders/detail/${newOrder.id}`);
      } else {
        await orderAPI.put(order);
        navigate(`/orders/detail/${order.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-50">
        <label htmlFor="tableNumber" className="form-label">
          Table Number
        </label>
        <input
          id="tableNumber"
          type="number"
          {...register("tableNumber", { valueAsNumber: true })}
          className={`form-control ${errors?.tableNumber ? "is-invalid" : ""}`}
        />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          defaultValue="PLACED"
          disabled={!isEdit}
          className="form-select"
        >
          <option value="PLACED">Placed</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY">Ready</option>
          <option value="SERVED">Served</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="staffId" className="form-label">
          Staff
        </label>
        <select
          id="staffId"
          {...register("staffId", { required: "Staff is required" })}
          className="form-select"
          disabled
        >
          {staffList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea id="notes" {...register("notes")} className="form-control" />
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <button type="submit" className="btn btn-primary">
          Save order
        </button>
        <Link to="/orders" className="btn btn-outline-primary ms-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default OrderForm;
