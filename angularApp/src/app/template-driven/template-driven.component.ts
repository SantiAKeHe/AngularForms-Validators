import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

interface RegistrationModel {
  name: string;
  email: string;
  age: number | null;
}

@Component({
  selector: 'app-template-driven',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.scss',
})
export class TemplateDrivenComponent {
  model: RegistrationModel = { name: '', email: '', age: null };

  submittedValues = signal<RegistrationModel | null>(null);

  onSubmit(): void {
    this.submittedValues.set({ ...this.model });
  }
}
