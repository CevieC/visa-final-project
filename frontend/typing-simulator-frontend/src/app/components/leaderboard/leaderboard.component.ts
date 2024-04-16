import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';

export interface LeaderboardData {
  position: number;
  username: string;
  category: string;
  accuracy: number;
  wpm: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, MatTabsModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'username', 'category', 'accuracy', 'wpm'];
  dataSource: LeaderboardData[] = [];
  filteredData: LeaderboardData[] = [];
  pageSize = 10;
  currentPage = 0;
  selectedCategory = 'Default';
  categories: string[] = ['Default', 'Time Challenge', 'Word Count Challenge', 'Random Word Mode', 'Punctuation and Special Characters'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private hardcodedData: LeaderboardData[] = [
    { position: 1, username: 'john_doe', category: 'Default', accuracy: 98, wpm: 120 },
    { position: 2, username: 'jane_smith', category: 'Time Challenge', accuracy: 95, wpm: 110 },
    { position: 3, username: 'mike_johnson', category: 'Word Count Challenge', accuracy: 97, wpm: 100 },
    { position: 4, username: 'sarah_lee', category: 'Random Word Mode', accuracy: 96, wpm: 105 },
    { position: 5, username: 'david_brown', category: 'Punctuation and Special Characters', accuracy: 94, wpm: 95 },
    // Add more hardcoded data for each category
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.applyPaginationAndSorting();
    this.fetchLeaderboardData().subscribe({
      next: (data: LeaderboardData[]) => {
        this.dataSource = data;
        this.filterDataByCategory();
        this.applyPaginationAndSorting();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching leaderboard data:', error);
        this.dataSource = this.hardcodedData;
        this.filterDataByCategory();
        this.applyPaginationAndSorting();
      }
    });
  }

  fetchLeaderboardData() {
    const apiUrl = `http://localhost:4200/api/leaderboard?category=${this.selectedCategory}`;
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
          case 'category':
            return compare(a.category, b.category, isAsc);
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

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.fetchLeaderboardData().subscribe({
      next: (data: LeaderboardData[]) => {
        this.dataSource = data;
        this.filterDataByCategory();
        this.applyPaginationAndSorting();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching leaderboard data:', error);
        this.dataSource = this.hardcodedData;
        this.filterDataByCategory();
        this.applyPaginationAndSorting();
      }
    });
  }

  filterDataByCategory() {
    this.dataSource = this.dataSource.filter(item => item.category === this.selectedCategory);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}