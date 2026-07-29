import { ICategory } from "./Icategory";


const url = "http://localhost:5072/api/categories";

export const categoryAPI = {
  list(): Promise<ICategory[]> {
    return fetch(url).then((response) => response.json());
  },
};