import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Shared/Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const currentUser = localStorage.getItem("user");
    if (!currentUser) return;
    const user = JSON.parse(currentUser);
    this.authService.setCurrentUser(user);
  }

}
