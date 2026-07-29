import { IMenuItem } from "./IMenuItem";

const url = "http://localhost:5072/api/menuitems";

export const menuItemAPI = {
  list(): Promise<IMenuItem[]> {
    return fetch(url).then((response) => response.json());
  },
  find(id: number): Promise<IMenuItem> {
    return fetch(`${url}/${id}`).then((response) => response.json());
  },
  post(menuItem: IMenuItem): Promise<IMenuItem> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(menuItem),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
  put(menuItem: IMenuItem): Promise<IMenuItem> {
    return fetch(`${url}/${menuItem.id}`, {
      method: "PUT",
      body: JSON.stringify(menuItem),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },
};
