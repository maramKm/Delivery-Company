import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'delevryCom';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Vérifie si l'utilisateur est connecté au démarrage du composant
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
