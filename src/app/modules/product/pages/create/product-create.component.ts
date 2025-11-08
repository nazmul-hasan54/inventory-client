import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  form!: FormGroup;
  id: number | null = null;
  isEdit = false;

  ngOnInit() {
    this.form = this._fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0.1)]],
      stockQuantity: [0, [Validators.required, Validators.min(1)]]
    });

    this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.isEdit = Boolean(this.id);

    if (this.isEdit) {
      this._productService.get(this.id!).subscribe((p: any) => this.form.patchValue(p));
    }
  }

  $Submit_onClick() {
    if (this.form.invalid) return;

    const request = this.isEdit
      ? this._productService.update(this.id!, this.form.value)
      : this._productService.create(this.form.value);

    request.subscribe({
      next: (response) => {
        alert(this.isEdit ? 'Product updated successfully' : 'Product created successfully');
        this._router.navigate(['/products']);
      },
      error: (err) => {
        alert('Something went wrong. Please try again!');
      }
    });
  }

}
