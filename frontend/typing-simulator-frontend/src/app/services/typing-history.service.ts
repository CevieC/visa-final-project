import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      catchError(() => {
        // Fallback to hardcoded data if API request fails
        const hardcodedData = [
          { date: '2023-06-10T10:30:00Z', speed: 60, accuracy: 90 },
          { date: '2023-06-09T15:45:00Z', speed: 55, accuracy: 85 },
          { date: '2023-06-08T09:15:00Z', speed: 50, accuracy: 80 },
          // Add more hardcoded data entries as needed
        ];
        return of(hardcodedData);
      })
    );
  }

  resetTypingHistory(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      catchError(() => {
        // Handle error if API request fails
        console.error('Error resetting typing history');
        return of(null);
      })
    );
  }
}