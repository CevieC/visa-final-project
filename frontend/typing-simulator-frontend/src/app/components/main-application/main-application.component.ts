import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-application',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, FormsModule],
  template: `
    <mat-card>
      <mat-card-title>Typing Simulator</mat-card-title>
      <mat-card-content>
        <p>{{ currentText }}</p>
        <mat-form-field>
          <input matInput [(ngModel)]="typedText" (input)="onType()" />
        </mat-form-field>
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

  ngOnInit() {
    this.generateText();
  }

  generateText() {
    // Generate a random text for typing
    // You can replace this with your own logic to fetch text from an API or use a predefined list of texts
    this.currentText = 'The quick brown fox jumps over the lazy dog.';
  }

  startTyping() {
    this.isTyping = true;
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    }, 1000);
  }

  onType() {
    if (this.typedText === this.currentText) {
      this.stopTyping();
    } else {
      this.calculateAccuracy();
      this.calculateWPM();
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
}