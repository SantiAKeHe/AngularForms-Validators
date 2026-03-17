import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ERROR_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  minlength: 'Value is too short',
  maxlength: 'Value is too long',
  min: 'Value is below the minimum allowed',
  noSpaces: 'No spaces allowed',
  minAge: 'You must be at least 18 years old',
  passwordMismatch: 'Passwords do not match',
};

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl;
  @Input() showOn: 'touched' | 'dirty' | 'always' = 'touched';

  get errorMessage(): string | null {
    if (!this.control.errors) return null;
    if (this.showOn === 'touched' && !this.control.touched) return null;
    if (this.showOn === 'dirty' && !this.control.dirty) return null;
    const firstKey = Object.keys(this.control.errors)[0];
    return ERROR_MESSAGES[firstKey] ?? 'Invalid value';
  }
}
