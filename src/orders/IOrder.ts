import { IOrderItem } from "../orderItems/IOrderItem";
import { IStaff } from "../staff/IStaff";

export interface IOrder {
  id: number | undefined;
  tableNumber: number | undefined;
  notes: string | undefined;
  status: string;
  total: number;
  orderedAt: string;
  staffId: number | undefined;
  staff?: IStaff;
  cancellationReason?: string;
  orderItems?: IOrderItem[];
}
