import { IOrder } from "./IOrder";

const url = "http://localhost:5072/api/orders";

export const orderAPI = {
  list(status?: string): Promise<IOrder[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then((response) => response.json());
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
  find(id: number): Promise<IOrder> {
    return fetch(`${url}/${id}`).then((response) => response.json());
  },
  startPreparing(id: number) {
    return fetch(`${url}/${id}/startpreparing`, { method: "PUT" });
  },
  markReady(id: number) {
    return fetch(`${url}/${id}/markready`, { method: "PUT" });
  },
  markServed(id: number) {
    return fetch(`${url}/${id}/markserved`, { method: "PUT" });
  },
  cancel(id: number, cancellationReason: string) {
    return fetch(`${url}/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify(cancellationReason), // plain string, not { reason: … }
      headers: { "Content-Type": "application/json" },
    });
  },
};
