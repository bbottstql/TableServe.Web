import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";
import { IOrderItem } from "./IOrderItem";

const url = `${BASE_URL}/orderitems`;

export const orderItemAPI = {
  find(id: number): Promise<IOrderItem> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(orderItem: IOrderItem): Promise<IOrderItem> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(orderItem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(orderItem: IOrderItem) {
    return fetch(`${url}/${orderItem.id}`, {
      method: "PUT",
      body: JSON.stringify(orderItem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};