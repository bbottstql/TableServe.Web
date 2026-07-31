import { ICategory } from "./Icategory";

const url = "http://localhost:5072/api/categories";

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then((response) => response.json());
  },

  find(id: number): Promise<ICategory> {
    return fetch(`${url}/${id}`).then((response) => response.json());
  },
    delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
  },
  put(categoryitem: ICategory) {
    return fetch (`${url}/${categoryitem.id}`, {
      method: "PUT",
      body: JSON.stringify(categoryitem),
      headers: { "Content-Type": "application/json" },
    });
  },
post(categoryitem: ICategory): Promise<ICategory> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(categoryitem),
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
  }
};
