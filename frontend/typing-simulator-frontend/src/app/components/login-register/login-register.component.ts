import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  username: string = '';
  password: string = '';
  isLogin: boolean = true;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    const url = `${environment.apiUrl}/auth/login`;
    const body = { username: this.username, password: this.password };

    this.http.post(url, body).subscribe(
      (response: any) => {
        // Handle successful login
        console.log('Login successful', response);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        this.router.navigate(['/main-application']);
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
        this.snackBar.open('Login failed', 'Close', { duration: 3000 });
      }
    );
  }

  register() {
    const url = `${environment.apiUrl}/auth/register`;
    const body = { username: this.username, password: this.password };

    this.http.post(url, body).subscribe(
      (response) => {
        // Handle successful registration
        console.log('Registration successful', response);
        this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
        this.toggleForm();
      },
      (error) => {
        // Handle registration error
        console.error('Registration error', error);
        this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
      }
    );
  }
}