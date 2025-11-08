import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

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
  private _router = inject(Router);

  products: Product[] = [];

  ngOnInit() {
    this._productService.getAll().subscribe(res => this.products = res as any[]);
  }

  $AddProduct_onClick() {
    this._router.navigate(['/product/add']);
  }

  onView(product: any) {
    // open details modal or redirect
  }

  $Edit_onClick(product: any) {
    this._router.navigate(['/product/edit', product.id]);
  }

  $Delete_onClick(product: any  ) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    this._productService.delete(product.id).subscribe({
      next: () => {
        alert('Product deleted successfully.');
        this.products = this.products.filter(p => p.id !== product.id);
      },
      error: () => {
        alert('Product deleted failed');
      }
    })
  }
}
