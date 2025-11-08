import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required]
    })
  }

  $Submit_onClick() {
    if (this.registerForm.invalid) return;

    this._authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert("User Registered Successfully");
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert("Registration Failed");
      }
    });
  }

  $Login_onClick() {
    this._router.navigate(['/login']);
  }

}
