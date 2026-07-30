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
};
