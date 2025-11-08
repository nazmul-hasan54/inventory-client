import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [
    DatePipe,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  private _orderService = inject(OrderService);
  private _router = inject(Router);

  orders: any[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._orderService.getAll().subscribe({
      next: (res: any) => this.orders = res,
      error: () => alert('Failed to load orders')
    });
  }

  $AddOrder_onClick() {
    this._router.navigate(['/order/add']);
  }

  $ViewOrder_onClick(order: any) {
    if (!order?.orderId) {
      alert('Order ID not found!');
      return;
    }

    this._router.navigate(['/order/view', order.orderId]);
  }

}
