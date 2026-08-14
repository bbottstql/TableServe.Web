import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";
import toast from "react-hot-toast";
import { IStaff } from "../staff/IStaff";
import { useState } from "react";
import { staffAPI } from "../staff/StaffAPI";
import { useStaffContext } from "../App";

let emptyOrder: IOrder = {
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

function OrderForm() {
  let { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState<IStaff[]>([]);
  const { staff } = useStaffContext();

  async function loadStaff() {
    const data = await staffAPI.list();
    setStaffList(data);
  }

  function isNew() {
    return Boolean(id);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>({
    defaultValues: async () => {
      await loadStaff();
      emptyOrder.staffId = staff?.id ?? 0;
      if (!id) return Promise.resolve(emptyOrder);
      const orderId = Number(id);
      try {
        const order = await orderAPI.find(orderId);
        return order;
      } catch (error: any) {
        toast.error(error.message);
        throw new Error("There was an error loading the order");
      }
    },
    mode: "onBlur",
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
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
  };

  return (
    <form className="form" onSubmit={handleSubmit(save)}>
      <div className="detail-header">
        <div className="column1 w-75">
          <div className="mb-3">
            <label htmlFor="tableNumber" className="form-label">
              Table Number
            </label>
            <input
              id="tableNumber"
              {...register("tableNumber", {
                required: "Table number is required",
                valueAsNumber: true,
              })}
              type="number"
              className={`form-control ${
                errors?.tableNumber && "is-invalid"
              } `}
              placeholder="Enter the table number"
            />
            <div className="invalid-feedback">
              {errors?.tableNumber?.message}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              className="form-control"
              rows={3}
              placeholder="Enter any notes for this order (optional)"
            ></textarea>
          </div>
        </div>
        <div className="column2 w-50">
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              {...register("status", {
                required: "Status is required",
              })}
              disabled={!isNew()}
              defaultValue="PLACED"
              className={`form-select ${errors?.status && "is-invalid"} `}
            >
              <option value="PLACED">Placed</option>
              <option value="PREPARING">Preparing</option>
              <option value="READY">Ready</option>
              <option value="SERVED">Served</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <div className="invalid-feedback">{errors?.status?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="staffId" className="form-label">
              Staff
            </label>
            <select
              id="staffId"
              {...register("staffId", {
                required: "Staff is required",
              })}
              disabled
              className={`form-select ${errors?.staffId && "is-invalid"} `}
            >
              <option value="">Select...</option>
              {staffList.map((s: IStaff) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors?.staffId?.message}</div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-end w-100 gap-4">
        <div className="d-flex justify-content-end mt-4">
          <Link to={"/orders"} className="btn btn-outline-primary me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            <svg
              className="bi pe-none me-2"
              width={16}
              height={16}
              fill="#FFFFFF"
            >
              <use xlinkHref={`${bootstrapIcons}#save`} />
            </svg>
            Save order
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;