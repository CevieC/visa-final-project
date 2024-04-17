import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginRegisterState {
  userId: string | null;
}

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  providers: [ComponentStore],
})
export class LoginRegisterComponent {
  username: string = '';
  password: string = '';
  newUsername: string = '';
  newPassword: string = '';

  readonly store: ComponentStore<LoginRegisterState> = new ComponentStore<LoginRegisterState>({ userId: null });
  readonly userId$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    store: ComponentStore<LoginRegisterState>
  ) {
    this.store = store;
    this.store.setState({ userId: null });
    this.userId$ = this.store.select((state: { userId: any; }) => state.userId);
  }

  readonly login = this.store.updater((state: any, userId: string) => ({
    ...state,
    userId,
  }));

  readonly logout = this.store.updater((state: any) => ({
    ...state,
    userId: null,
  }));

  onLogin(username: string, password: string) {
    this.http
      .post(`${environment.apiUrl}/api/login`, { username, password })
      .pipe(
        tapResponse(
          (response: any) => {
            this.login(response.userId);
            this.snackBar.open('Login successful', 'Close', {
              duration: 3000,
            });
          },
          () => {
            this.snackBar.open('Login failed', 'Close', {
              duration: 3000,
            });
          }
        )
      )
      .subscribe();
  }

  onRegister(newUsername: string, newPassword: string) {
    this.http
      .post(`${environment.apiUrl}/api/register`, { username: newUsername, password: newPassword })
      .pipe(
        tapResponse(
          () => {
            this.snackBar.open('Registration successful', 'Close', {
              duration: 3000,
            });
          },
          () => {
            this.snackBar.open('Registration failed', 'Close', {
              duration: 3000,
            });
          }
        )
      )
      .subscribe();
  }

  onLogout() {
    this.logout();
    this.snackBar.open('Logout successful', 'Close', {
      duration: 3000,
    });
  }
}