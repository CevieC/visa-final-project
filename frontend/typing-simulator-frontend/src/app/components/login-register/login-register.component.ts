import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  providers: [AuthService],
})
export class LoginRegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginWithGitHub() {
    this.authService.loginWithGitHub();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        // Handle successful login response
        console.log('Login successful', response);
      },
      (error: any) => {
        // Handle login error
        console.error('Login error', error);
      }
    );
  }

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      (response: any) => {
        // Handle successful registration response
        console.log('Registration successful', response);
      },
      (error: any) => {
        // Handle registration error
        console.error('Registration error', error);
      }
    );
  }
}