import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  lightTheme = true;

  toggleTheme() {
    this.lightTheme = !this.lightTheme;

    if (this.lightTheme) {
      document.querySelector('html')!.classList.remove('theme-dark');
    } else {
      document.querySelector('html')!.classList.add('theme-dark');
    }
  }
}
