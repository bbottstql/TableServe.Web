import { ICategory } from "../categories/ICategory";


export interface IMenuItem {
  id: number | undefined;
  name: string;
  price: number | undefined;
  categoryId: number | undefined;
  category: ICategory | undefined;
}