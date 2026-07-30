import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";
import OrderHeader from "./OrderHeader.tsx";
import { Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

interface ICancelForm {
  cancellationReason: string | undefined;
}

function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<IOrder | undefined>(undefined);

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const openCancel = () => setIsCancelOpen(true); // ← the Cancel Order button (§2) calls this
  const closeCancel = () => setIsCancelOpen(false);

  async function loadOrder() {
    setLoading(true);
    try {
      setOrder(await orderAPI.find(Number(id)));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function startPreparing() {
    if (!order?.id) return;
    setLoading(true);
    try {
      await orderAPI.startPreparing(order.id);
      toast.success("Successfully saved.");
      await loadOrder(); // re-fetch → UI now shows the new status  buttons
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function markReady() {
    if (!order?.id) return;
    setLoading(true);
    try {
      await orderAPI.markReady(order.id);
      toast.success("Successfully saved.");
      await loadOrder(); // re-fetch → UI now shows the new status  buttons
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function markServed() {
    if (!order?.id) return;
    setLoading(true);
    try {
      await orderAPI.markServed(order.id);
      toast.success("Successfully saved.");
      await loadOrder(); // re-fetch → UI now shows the new status  buttons
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICancelForm>({
    defaultValues: async () => ({ cancellationReason: undefined }),
  });

  const saveCancel: SubmitHandler<ICancelForm> = async (form) => {
    if (!order?.id || !form.cancellationReason) return;
    await orderAPI.cancel(order.id, form.cancellationReason);
    setIsCancelOpen(false);
    await loadOrder();
  };

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <Modal show={isCancelOpen} onHide={closeCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveCancel)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="cancellationReason">
                Cancellation Reason
              </label>
              <textarea
                {...register("cancellationReason", {
                  required: "Cancellation reason is required",
                })}
                className={`form-control ${errors?.cancellationReason && "is-invalid"}`}
                id="cancellationReason"
                rows={6}
              ></textarea>
              <div className="invalid-feedback">
                {errors?.cancellationReason?.message}
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={closeCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Order</h2>
        <div className="d-flex justify-content-end gap-2">
          {order?.status === "PLACED" && (
            <button className="btn btn-primary" onClick={startPreparing}>
              Start Preparing
            </button>
          )}
          {order?.status === "PREPARING" && (
            <>
              <button className="btn btn-primary" onClick={markReady}>
                Mark Ready
              </button>
              <button className="btn btn-outline-danger" onClick={openCancel}>
                Cancel Order
              </button>
            </>
          )}
          {order?.status === "READY" && (
            <button className="btn btn-primary" onClick={markServed}>
              Mark Served
            </button>
          )}
          {/* SERVED and CANCELLED are terminal — no buttons */}
        </div>
      </div>
      {loading && <p>Loading…</p>}
      {order && <OrderHeader order={order} />}
    </section>
  );
}

export default OrderDetailPage;
