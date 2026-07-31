import { IOrderItem } from "./IOrderItem";

const url = "http://localhost:5072/api/orderitems";

export const orderItemAPI = {
  find(id: number): Promise<IOrderItem> {
    return fetch(`${url}/${id}`).then((r) => r.json());
  },
  post(orderItem: IOrderItem): Promise<IOrderItem> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(orderItem),
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
  },
  put(orderItem: IOrderItem) {
    return fetch(`${url}/${orderItem.id}`, {
      method: "PUT",
      body: JSON.stringify(orderItem),
      headers: { "Content-Type": "application/json" },
    });
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
};