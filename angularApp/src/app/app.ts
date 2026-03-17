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

  protected readonly topicCards: { title: string; description: string }[] = [
    {
      title: 'Reactive Forms',
      description:
        'Build complex, dynamic forms with full TypeScript type safety using FormBuilder and typed FormControls.',
    },
    {
      title: 'Template-driven Forms',
      description:
        'Explore the declarative template approach with ngModel for simpler forms and direct comparison with the reactive approach.',
    },
    {
      title: 'Custom Validators',
      description:
        'Create reusable, typed validator functions — simple validators, factory validators, and cross-field validators.',
    },
    {
      title: 'Dynamic Forms',
      description:
        'Handle dynamic field lists at runtime with FormArray, add or remove controls, and validate per-item data.',
    },
    {
      title: 'Error Messages',
      description:
        'Centralize validation error display using a shared error-message component for consistent user feedback.',
    },
  ];
}
