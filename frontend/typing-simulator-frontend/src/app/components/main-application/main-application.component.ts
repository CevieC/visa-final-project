import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-application',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatProgressBarModule, FormsModule],
  template: `
    <mat-card>
      <mat-card-title>Typing Simulator</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Select Mode</mat-label>
          <mat-select [(ngModel)]="selectedMode" (selectionChange)="onModeChange()">
            <mat-option value="default">Default</mat-option>
            <mat-option value="time">Time Challenge</mat-option>
            <mat-option value="words">Word Count Challenge</mat-option>
            <mat-option value="random">Random Word Mode</mat-option>
            <mat-option value="punctuation">Punctuation and Special Characters</mat-option>
          </mat-select>
        </mat-form-field>
        <div [ngClass]="{'correct': isCorrect, 'incorrect': !isCorrect}">
          <p>{{ currentText }}</p>
        </div>
        <mat-form-field>
          <input matInput [(ngModel)]="typedText" (input)="onType()" />
        </mat-form-field>
        <mat-progress-bar [value]="progress"></mat-progress-bar>
        <p>Time: {{ elapsedTime }} seconds</p>
        <p>Accuracy: {{ accuracy }}%</p>
        <p>Words per Minute (WPM): {{ wpm }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="startTyping()" [disabled]="isTyping">Start</button>
        <button mat-raised-button color="accent" (click)="resetTyping()" [disabled]="!isTyping">Reset</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin: 20px;
      }
      .correct {
        color: green;
      }
      .incorrect {
        color: red;
      }
    `,
  ],
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

  ngOnInit() {
    this.generateText();
  }

  generateText() {
    // Generate a random text for typing based on the selected mode
    switch (this.selectedMode) {
      case 'default':
        this.currentText = 'The quick brown fox jumps over the lazy dog.';
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
        this.currentText = 'This text contains punctuation marks! Can you type it accurately? Let's see.';
        break;
    }
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