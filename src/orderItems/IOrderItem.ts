import { IMenuItem } from "../menuItems/IMenuItem";
import { IOrder } from "../orders/IOrder";

export interface IOrderItem {
  id: number | undefined;
  quantity: number;
  notes: string | undefined;
  orderId: number | undefined;
  menuItemId: number | undefined;
  menuItem: IMenuItem | undefined;
  order: IOrder | undefined;
}
