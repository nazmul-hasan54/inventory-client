import {OrderItem} from './order-item.model';

export class Order {
  orderId?: number;
  customerName?: string;
  orderDate?: string;
  totalAmount?: number;
  status?: string;
  items?: OrderItem[];
}
