import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    LoginRegisterComponent,
    UserHistoryComponent,
    MainApplicationComponent,
    LeaderboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typing-simulator-frontend';
}