import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private _productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit() {
    this._productService.getAll().subscribe(res => this.products = res as any[]);
  }

  onAddProduct() {
    // open modal or navigate to add form
  }

  onView(product: any) {
    // open details modal or redirect
  }

  onEdit(product: any) {
    // open edit modal or redirect
  }

  onDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    // call API delete
  }
}
