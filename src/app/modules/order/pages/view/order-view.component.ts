import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-order-view',
  imports: [
    DatePipe,
    CurrencyPipe,
    RouterLink,
    CommonModule
  ],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order: any = null;

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.loadOrder(orderId);
  }

  loadOrder(id: number) {
    this.orderService.get(id).subscribe({
      next: res => this.order = res,
      error: () => alert('Failed to load order')
    });
  }
}
