import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  lightTheme = signal(true);

  toggleTheme() {
    this.lightTheme.update(v => !v);

    if (this.lightTheme()) {
      document.querySelector('html')!.classList.remove('theme-dark');
    } else {
      document.querySelector('html')!.classList.add('theme-dark');
    }
  }
}
