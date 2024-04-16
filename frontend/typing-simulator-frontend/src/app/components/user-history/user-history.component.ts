import { Component, OnInit } from '@angular/core';
import { TypingHistoryService } from '../../services/typing-history.service';

@Component({
  selector: 'app-user-history',
  standalone: true,
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {
  typingHistory: any[] = [];

  constructor(private typingHistoryService: TypingHistoryService) { }

  ngOnInit() {
    this.getTypingHistory();
  }

  getTypingHistory() {
    this.typingHistoryService.getTypingHistory().subscribe(
      (history: any[]) => {
        this.typingHistory = history;
      },
      (error) => {
        console.error('Error retrieving typing history:', error);
      }
    );
  }

  resetHistory() {
    this.typingHistoryService.resetTypingHistory().subscribe(
      () => {
        this.typingHistory = [];
      },
      (error) => {
        console.error('Error resetting typing history:', error);
      }
    );
  }
}