import { ICategory } from "../categories/Icategory";

export interface IMenuItem {
  id: number | undefined;
  name: string;
  price: number | undefined;
  categoryId: number | undefined;
  category: ICategory | undefined;
}