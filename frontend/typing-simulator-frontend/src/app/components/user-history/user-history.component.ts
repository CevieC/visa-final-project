import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, NgClass],
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
  providers: [DatePipe, DecimalPipe],
})
export class UserHistoryComponent implements OnInit {
  typingHistory: any[] = [];
  private apiUrl = 'http://localhost:8080/api/typing-history';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTypingHistory();
  }

  getTypingHistory() {
    this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving typing history:', error);
        return of(this.getHardcodedHistory());
      })
    ).subscribe({
      next: (history: any[]) => {
        this.typingHistory = history;
      },
      error: (error) => {
        console.error('Error retrieving typing history:', error);
      }
    });
  }

  resetHistory() {
    this.http.delete(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error resetting typing history:', error);
        return of(null);
      })
    ).subscribe({
      next: () => {
        this.typingHistory = [];
      },
      error: (error) => {
        console.error('Error resetting typing history:', error);
      }
    });
  }

  private getHardcodedHistory(): any[] {
    return [
      {
        date: '2023-06-01T10:30:00',
        speed: 60,
        accuracy: 95
      },
      {
        date: '2023-06-02T14:45:00',
        speed: 65,
        accuracy: 97
      },
      {
        date: '2023-06-03T09:15:00',
        speed: 70,
        accuracy: 98
      },
      {
        date: '2023-06-04T16:20:00',
        speed: 68,
        accuracy: 96
      },
      {
        date: '2023-06-05T11:00:00',
        speed: 72,
        accuracy: 99
      }
    ];
  }
}