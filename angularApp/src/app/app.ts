import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly navTopics = [
    'Reactive Forms',
    'Template-driven Forms',
    'Validators',
    'Form Groups',
    'Form Arrays',
    'Custom Validators',
  ] as const;
}
