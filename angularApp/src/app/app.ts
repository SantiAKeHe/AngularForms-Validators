import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface TopicCard {
  tag: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
  cardClass: string;
  badgeClass: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular Forms & Validators');

  protected readonly topicCards: TopicCard[] = [
    {
      tag: 'Topic 01',
      icon: '⚛',
      title: 'Reactive Forms',
      description:
        'Build complex, dynamic forms with full TypeScript type safety using FormBuilder and typed FormControls.',
      points: [
        'FormGroup + FormBuilder',
        'Typed FormControls',
        'valueChanges with RxJS',
        'markAllAsTouched() on submit',
      ],
      cardClass: 'topic-card--reactive',
      badgeClass: 'badge--reactive',
    },
    {
      tag: 'Topic 02',
      icon: '📝',
      title: 'Template-driven Forms',
      description:
        'Explore the declarative approach with ngModel for simpler forms and direct comparison with reactive.',
      points: [
        '[(ngModel)] two-way binding',
        '#ref="ngModel" local references',
        'required / email / minlength',
        'NgForm for global state',
      ],
      cardClass: 'topic-card--template',
      badgeClass: 'badge--template',
    },
    {
      tag: 'Topic 03',
      icon: '🛡',
      title: 'Custom Validators',
      description:
        'Create reusable, typed validator functions — simple, factory, and cross-field validators.',
      points: [
        'ValidatorFn — returns ValidationErrors | null',
        'Factory validators (parameterized)',
        'Cross-field group validators',
        'Always typed, always testable',
      ],
      cardClass: 'topic-card--validator',
      badgeClass: 'badge--validator',
    },
    {
      tag: 'Topic 04',
      icon: '⚙',
      title: 'Dynamic Forms',
      description:
        'Handle variable-length field lists at runtime with FormArray — add or remove controls dynamically.',
      points: [
        'FormArray for dynamic collections',
        'Typed FormArray getter',
        'Add / remove controls at runtime',
        'Per-item validation',
      ],
      cardClass: 'topic-card--dynamic',
      badgeClass: 'badge--dynamic',
    },
    {
      tag: 'Topic 05',
      icon: '💬',
      title: 'Error Messages',
      description:
        'Centralize validation error display using a shared error-message component for consistent UX.',
      points: [
        'Shared error-message component',
        'Centralized error key → message map',
        'Show only on touched / submitted',
        'Displays first active error only',
      ],
      cardClass: 'topic-card--errors',
      badgeClass: 'badge--errors',
    },
  ];
}
