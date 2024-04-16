import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { MainApplicationComponent } from './components/main-application/main-application.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    LoginRegisterComponent,
    UserHistoryComponent,
    MainApplicationComponent,
    LeaderboardComponent,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Typing Simulator</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/login">Login/Register</button>
      <button mat-button routerLink="/user-history">User History</button>
      <button mat-button routerLink="/main-application">Main Application</button>
      <button mat-button routerLink="/leaderboard">Leaderboard</button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AppComponent {
  title = 'typing-simulator-frontend';
}