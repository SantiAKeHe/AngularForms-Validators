import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular Forms & Validators');

  protected readonly topics: string[] = [
    'Reactive Forms',
    'Template-driven Forms',
    'Custom Validators',
    'Dynamic Forms',
    'Error Messages',
  ];
}
