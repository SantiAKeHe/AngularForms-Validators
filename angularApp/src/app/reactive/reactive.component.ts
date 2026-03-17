import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';

interface RegistrationFormValue {
  name: string;
  email: string;
  age: number | null;
}

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ErrorMessageComponent],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss',
})
export class ReactiveComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    email: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    age: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(18)],
      updateOn: 'blur',
    }),
  });

  submittedValues = signal<RegistrationFormValue | null>(null);

  get name(): FormControl<string> {
    return this.form.controls.name;
  }

  get email(): FormControl<string> {
    return this.form.controls.email;
  }

  get age(): FormControl<number | null> {
    return this.form.controls.age;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, age } = this.form.getRawValue();
    this.submittedValues.set({ name, email, age });
  }
}
