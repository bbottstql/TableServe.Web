import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";
import { IMenuItem } from "./IMenuItem";

const url = `${BASE_URL}/menuitems`;

export const menuItemAPI = {
  list(): Promise<IMenuItem[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
  find(id: number): Promise<IMenuItem> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(menuItem: IMenuItem): Promise<IMenuItem> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(menuItem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(menuItem: IMenuItem): Promise<IMenuItem> {
    return fetch(`${url}/${menuItem.id}`, {
      method: "PUT",
      body: JSON.stringify(menuItem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
     delete(id: number) {
     return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);   // no parseJSON — no body
   },

};
