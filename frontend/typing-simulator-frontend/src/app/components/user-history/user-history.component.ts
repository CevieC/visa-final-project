import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../environments/environment';

export interface UserHistoryData {
  id: number;
  userId: number;
  date: string;
  speed: number;
  accuracy: number;
}

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatSortModule, HttpClientModule, MatDialogModule, MatIconModule],
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'speed', 'accuracy'];
  dataSource: UserHistoryData[] = [];
  filteredData: UserHistoryData[] = [];
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private apiUrl = `${environment.apiUrl}/api/typing-history`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTypingHistory();
  }

  deleteAllHistoryEntries() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete all your typing history entries?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.authService.getUserId();
        this.http.delete(`${this.apiUrl}/user/${userId}`).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error deleting all typing history entries:', error);
            return of(null);
          })
        ).subscribe({
          next: () => {
            this.dataSource = [];
            this.totalItems = 0;
            this.applyPaginationAndSorting();
          },
          error: (error) => {
            console.error('Error deleting all typing history entries:', error);
          }
        });
      }
    });
  }

  getTypingHistory() {
    const userId = this.authService.getUserId();
    this.http.get<UserHistoryData[]>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving typing history:', error);
        return of(this.getHardcodedHistory());
      })
    ).subscribe({
      next: (history: UserHistoryData[]) => {
        this.dataSource = history;
        this.totalItems = this.dataSource.length;
        this.applyPaginationAndSorting();
      },
      error: (error) => {
        console.error('Error retrieving typing history:', error);
      }
    });
  }

  onSortChange(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
    } else {
      this.dataSource = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'date':
            return compare(a.date, b.date, isAsc);
          case 'speed':
            return compare(a.speed, b.speed, isAsc);
          case 'accuracy':
            return compare(a.accuracy, b.accuracy, isAsc);
          default:
            return 0;
        }
      });
    }
    this.currentPage = 0;
    this.applyPaginationAndSorting();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPaginationAndSorting();
  }

  applyPaginationAndSorting() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredData = this.dataSource.slice(startIndex, endIndex);
  }

  private getHardcodedHistory(): UserHistoryData[] {
    return [
      {
        id: 1,
        userId: 1,
        date: '2023-06-01T10:30:00',
        speed: 60,
        accuracy: 95
      },
      {
        id: 2,
        userId: 1,
        date: '2023-06-02T14:45:00',
        speed: 65,
        accuracy: 97
      },
      {
        id: 3,
        userId: 1,
        date: '2023-06-03T09:15:00',
        speed: 70,
        accuracy: 98
      },
      {
        id: 4,
        userId: 1,
        date: '2023-06-04T16:20:00',
        speed: 68,
        accuracy: 96
      },
      {
        id: 5,
        userId: 1,
        date: '2023-06-05T11:00:00',
        speed: 72,
        accuracy: 99
      },
      {
        id: 6,
        userId: 1,
        date: '2023-06-07T10:30:00',
        speed: 60,
        accuracy: 95
      },
      {
        id: 7,
        userId: 1,
        date: '2023-06-08T14:45:00',
        speed: 65,
        accuracy: 97
      },
      {
        id: 8,
        userId: 1,
        date: '2023-06-09T09:15:00',
        speed: 70,
        accuracy: 98
      },
      {
        id: 9,
        userId: 1,
        date: '2023-06-10T16:20:00',
        speed: 68,
        accuracy: 96
      },
      {
        id: 10,
        userId: 1,
        date: '2023-06-11T11:00:00',
        speed: 72,
        accuracy: 99
      }
    ];
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}