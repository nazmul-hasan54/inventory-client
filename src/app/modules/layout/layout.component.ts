import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
