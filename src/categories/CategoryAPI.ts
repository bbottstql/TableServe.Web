import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";
import { ICategory } from "./Icategory";

const url = `${BASE_URL}/categories`;

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<ICategory> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
    delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);;
  },
  put(categoryitem: ICategory) {
    return fetch (`${url}/${categoryitem.id}`, {
      method: "PUT",
      body: JSON.stringify(categoryitem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
post(categoryitem: ICategory): Promise<ICategory> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(categoryitem),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  }
};
