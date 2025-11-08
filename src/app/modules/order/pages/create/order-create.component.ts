import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {ProductService} from '../../../product/services/product.service';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private _router = inject(Router);

  form!: FormGroup;
  products: any[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([])
    });

    this.loadProducts();
    this.addItem(); // start with one item row
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: res => this.products = res,
      error: () => alert('Failed to load products')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.orderService.create(this.form.value).subscribe({
      next: () => {
        alert('Order created successfully!');
        this._router.navigate(['/orders']);
        this.form.reset();
        this.items.clear();
        this.addItem(); // reset with one empty item
      },
      error: () => alert('Failed to create order')
    });
  }
}
