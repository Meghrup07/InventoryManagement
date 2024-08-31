import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private route = inject(Router);
  private authService = inject(AuthService)

  Logout() {
    this.authService.logout()
    this.route.navigateByUrl("/");
  }

}
