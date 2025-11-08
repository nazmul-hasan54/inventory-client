import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-view',
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);

  product!: Product;

  ngOnInit(): void {
    const productId = this._activatedRoute.snapshot.params['id'];
    this.loadOrder(productId);
  }

  loadOrder(id: number) {
    this._productService.get(id).subscribe({
      next: res => this.product = res,
      error: () => alert('Failed to load product')
    });
  }
}
