import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';
import { noSpacesValidator } from '../custom-validators/no-spaces.validator';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe, ErrorMessageComponent],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss',
})
export class ErrorMessagesComponent {
  private fb = inject(FormBuilder);

  // Demo 1 — inline errors (bad pattern)
  formDemo1 = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', Validators.required),
  });

  get emailDemo1(): FormControl<string | null> {
    return this.formDemo1.controls.email;
  }

  get passwordDemo1(): FormControl<string | null> {
    return this.formDemo1.controls.password;
  }

  // Demo 2 — reusable error-message component (good pattern)
  formDemo2 = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', Validators.required),
  });

  get emailDemo2(): FormControl<string | null> {
    return this.formDemo2.controls.email;
  }

  get passwordDemo2(): FormControl<string | null> {
    return this.formDemo2.controls.password;
  }

  // Demo 3 — showOn modes
  formDemo3 = this.fb.group({
    username: this.fb.control<string>('', [Validators.required, noSpacesValidator()]),
  });

  get username(): FormControl<string | null> {
    return this.formDemo3.controls.username;
  }
}
