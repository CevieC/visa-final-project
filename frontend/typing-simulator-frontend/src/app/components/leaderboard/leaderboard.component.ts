import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'username', 'score', 'accuracy', 'wpm'];
  dataSource: LeaderboardData[] = [];
  filteredData: LeaderboardData[] = [];
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private hardcodedData: LeaderboardData[] = [
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.applyPaginationAndSorting();
    this.fetchLeaderboardData().subscribe({
      next: (data: LeaderboardData[]) => {
        this.dataSource = data;
        this.filteredData = data;
        this.applyPaginationAndSorting();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching leaderboard data:', error);
        this.dataSource = this.hardcodedData;
        this.filteredData = this.hardcodedData;
        this.applyPaginationAndSorting();
      }
    });
  }

  fetchLeaderboardData() {
    const apiUrl = 'http://localhost:4200/api/leaderboard'; // Replace with the correct API endpoint
    return this.http.get<LeaderboardData[]>(apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching leaderboard data:', error);
        return of(this.hardcodedData);
      })
    );
  }

  applyPaginationAndSorting() {
    this.filteredData = this.dataSource.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPaginationAndSorting();
  }

  onSortChange(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
    } else {
      this.dataSource = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'position':
            return compare(a.position, b.position, isAsc);
          case 'username':
            return compare(a.username, b.username, isAsc);
          case 'score':
            return compare(a.score, b.score, isAsc);
          case 'accuracy':
            return compare(a.accuracy, b.accuracy, isAsc);
          case 'wpm':
            return compare(a.wpm, b.wpm, isAsc);
          default:
            return 0;
        }
      });
    }
    this.currentPage = 0;
    this.applyPaginationAndSorting();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}