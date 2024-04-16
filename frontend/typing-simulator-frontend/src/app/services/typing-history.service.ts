import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypingHistoryService {
  private apiUrl = 'http://localhost:8080/api/typing-history';

  constructor(private http: HttpClient) { }

  getTypingHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving typing history:', error);
        // Fallback to hardcoded data
        return of(this.getHardcodedHistory());
      })
    );
  }

  resetTypingHistory(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error resetting typing history:', error);
        // Fallback to empty response
        return of(null);
      })
    );
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