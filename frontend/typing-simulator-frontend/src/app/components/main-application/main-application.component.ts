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
  timeLimits = {
    default: 0,
    time: 60,
    words: 0,
    random: 0,
    punctuation: 0
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.generateText();
  }

  fetchRandomWords() {
    this.yourService.fetchWords().subscribe(
      (words: string[]) => {
        const combinedWord = words.join('');
        console.log('Combined word:', combinedWord);
        this.currentText = combinedWord;
      },
      (error) => {
        console.error('Error fetching words:', error);
      }
    );
  }

  generateText() {
    switch (this.selectedMode) {
      case 'default':
        this.fetchRandomParagraph();
        break;
      case 'time':
        this.currentText = 'This is a time challenge. Type as many words as you can in 1 minute! The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly. How vexingly quick daft zebras jump!';
        break;
      case 'words':
        this.fetchRandomWords()
        this.currentText = 'Type the following words: apple, banana, cherry, date, elderberry, fig, grape, honeydew, kiwi, lemon, mango, nectarine, orange, papaya, quince, raspberry, strawberry, tangerine, watermelon.';
        break;
      case 'random':
        const randomWords = ['cat', 'dog', 'bird', 'fish', 'elephant', 'lion', 'tiger', 'bear', 'giraffe', 'zebra', 'monkey', 'penguin', 'kangaroo', 'koala', 'hippopotamus', 'rhinoceros', 'crocodile', 'turtle', 'rabbit', 'squirrel'];
        this.currentText = randomWords.sort(() => Math.random() - 0.5).slice(0, 10).join(' ');
        break;
      case 'punctuation':
        this.currentText = 'This text contains punctuation marks! Can you type it accurately? Let\'s see. "The quick brown fox jumps over the lazy dog," said the narrator. "I can\'t believe it!" exclaimed the audience. Don\'t forget to use apostrophes, commas, and other punctuation marks correctly.';
        break;
    }
  }

  fetchRandomParagraph() {
    console.log('Fetching random paragraph...');
    const apiUrl = `${environment.apiUrl}/api/typing-text/random-paragraph`;
    this.http.get(apiUrl, { responseType: 'text' }).subscribe(
      (paragraph) => {
        console.log('Fetched random paragraph:', paragraph);
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
    const timeLimit = this.timeLimits[this.selectedMode as keyof typeof this.timeLimits];
    if (timeLimit > 0) {
      this.timer = setInterval(() => {
        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        if (this.elapsedTime >= timeLimit) {
          this.stopTyping();
        }
      }, 1000);
    }
  }

  onType() {
    if (this.typedText === this.currentText) {
      this.stopTyping();
      if (this.selectedMode === 'time' && this.elapsedTime <= this.timeLimits.time) {
        // User completed typing within the time limit
        console.log('Congratulations! You completed the typing within the time limit.');
      }
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
    clearInterval(this.timer);
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
