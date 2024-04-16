import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-application',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss'],
})
export class MainApplicationComponent implements OnInit {
  currentText: string = '';
  typedText: string = '';
  startTime: number = 0;
  elapsedTime: number = 0;
  timer: any;
  isTyping: boolean = false;
  accuracy: number = 100;
  wpm: number = 0;
  selectedMode: string = 'default';
  isCorrect: boolean = true;
  progress: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generateText();
  }

  generateText() {
    switch (this.selectedMode) {
      case 'default':
        this.fetchRandomParagraph();
        break;
      case 'time':
        this.currentText = 'This is a time challenge. Type as many words as you can in 1 minute!';
        break;
      case 'words':
        this.currentText = 'Type the following 10 words: apple, banana, cherry, date, elderberry, fig, grape, honeydew, kiwi, lemon.';
        break;
      case 'random':
        const randomWords = ['cat', 'dog', 'bird', 'fish', 'elephant', 'lion', 'tiger', 'bear', 'giraffe', 'zebra'];
        this.currentText = randomWords.sort(() => Math.random() - 0.5).slice(0, 5).join(' ');
        break;
      case 'punctuation':
        this.currentText = `This text contains punctuation marks! Can you type it accurately? Let's see.`;
        break;
    }
  }

  fetchRandomParagraph() {
    const apiUrl = `${environment.apiUrl}/api/typing-text/random-paragraph`;
    this.http.get(apiUrl, { responseType: 'text' }).subscribe(
      (paragraph) => {
        this.currentText = paragraph;
      },
      (error) => {
        console.error('Error fetching random paragraph:', error);
      }
    );
  }

  startTyping() {
    this.isTyping = true;
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      if (this.selectedMode === 'time' && this.elapsedTime >= 60) {
        this.stopTyping();
      }
    }, 1000);
  }

  onType() {
    if (this.typedText === this.currentText) {
      this.stopTyping();
    } else {
      this.calculateAccuracy();
      this.calculateWPM();
      this.checkCorrectness();
      this.updateProgress();
    }
  }

  stopTyping() {
    this.isTyping = false;
    clearInterval(this.timer);
  }

  resetTyping() {
    this.stopTyping();
    this.typedText = '';
    this.elapsedTime = 0;
    this.accuracy = 100;
    this.wpm = 0;
    this.progress = 0;
    this.generateText();
  }

  calculateAccuracy() {
    const typed = this.typedText.split('');
    const actual = this.currentText.slice(0, typed.length).split('');
    const correctChars = typed.filter((char, index) => char === actual[index]).length;
    this.accuracy = Math.round((correctChars / typed.length) * 100);
  }

  calculateWPM() {
    const words = this.typedText.trim().split(' ').length;
    this.wpm = Math.round((words / this.elapsedTime) * 60);
  }

  checkCorrectness() {
    const typed = this.typedText.split('');
    const actual = this.currentText.slice(0, typed.length).split('');
    this.isCorrect = typed.every((char, index) => char === actual[index]);
  }

  updateProgress() {
    const typed = this.typedText.split('');
    const total = this.currentText.split('');
    this.progress = (typed.length / total.length) * 100;
  }

  onModeChange() {
    this.resetTyping();
    this.generateText();
  }
}