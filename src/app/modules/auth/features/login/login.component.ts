import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private _authService = inject(AuthService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  $Submit_onClick(){
    const formValue = this.form.value;
    this._authService.login(formValue.username, formValue.password).subscribe({
      next: () => {
        alert("User Login Successfully");
        this._router.navigate(['/products']);
      },
      error: () => alert('Invalid credentials')
    });
  }

  $Register_onClick(){
    this._router.navigate(['/register']);
  }

}
