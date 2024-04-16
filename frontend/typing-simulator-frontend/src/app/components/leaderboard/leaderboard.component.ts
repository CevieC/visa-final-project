import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface LeaderboardData {
  position: number;
  username: string;
  score: number;
  accuracy: number;
  wpm: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['position', 'username', 'score', 'accuracy', 'wpm'];
  dataSource: LeaderboardData[] = [
    { position: 1, username: 'john_doe', score: 1500, accuracy: 98, wpm: 120 },
    { position: 2, username: 'jane_smith', score: 1450, accuracy: 95, wpm: 110 },
    { position: 3, username: 'mike_johnson', score: 1400, accuracy: 97, wpm: 100 },
    { position: 4, username: 'sarah_lee', score: 1350, accuracy: 96, wpm: 105 },
    { position: 5, username: 'david_brown', score: 1300, accuracy: 94, wpm: 95 },
    { position: 6, username: 'emily_davis', score: 1250, accuracy: 93, wpm: 90 },
    { position: 7, username: 'robert_wilson', score: 1200, accuracy: 92, wpm: 85 },
    { position: 8, username: 'jennifer_taylor', score: 1150, accuracy: 91, wpm: 80 },
    { position: 9, username: 'michael_anderson', score: 1100, accuracy: 90, wpm: 75 },
    { position: 10, username: 'jessica_thomas', score: 1050, accuracy: 89, wpm: 70 },
  ];
}