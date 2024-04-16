import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { MainApplicationComponent } from './components/main-application/main-application.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'user-history', component: UserHistoryComponent },
  { path: 'main-application', component: MainApplicationComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  // Add other routes as needed
];