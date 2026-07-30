import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IOrder } from "./IOrder";
import { orderAPI } from "./OrderAPI";
import OrderHeader from "./OrderHeader.tsx";

function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<IOrder | undefined>(undefined);

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

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Order</h2>
      </div>
      {loading && <p>Loading…</p>}
      {order && <OrderHeader order={order} />}
    </section>
  );
}

export default OrderDetailPage;
