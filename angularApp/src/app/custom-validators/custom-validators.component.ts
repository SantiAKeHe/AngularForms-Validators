import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';
import { noSpacesValidator } from './no-spaces.validator';
import { minAgeValidator } from './min-age.validator';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-custom-validators',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ErrorMessageComponent],
  templateUrl: './custom-validators.component.html',
  styleUrl: './custom-validators.component.scss',
})
export class CustomValidatorsComponent {
  private fb = inject(FormBuilder);

  // Form 1 — Simple validator: noSpacesValidator
  noSpacesForm = this.fb.group({
    username: this.fb.nonNullable.control<string>('', [
      Validators.required,
      noSpacesValidator(),
    ]),
  });

  get username(): FormControl<string> {
    return this.noSpacesForm.controls.username;
  }

  // Form 2 — Factory validator: minAgeValidator
  minAgeForm = this.fb.group({
    age: this.fb.control<number | null>(null, [
      Validators.required,
      minAgeValidator(18),
    ]),
  });

  get age(): FormControl<number | null> {
    return this.minAgeForm.controls.age;
  }

  // Form 3 — Cross-field validator: passwordMatchValidator
  passwordForm = this.fb.group(
    {
      password: this.fb.nonNullable.control<string>('', Validators.required),
      confirmPassword: this.fb.nonNullable.control<string>('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  get password(): FormControl<string> {
    return this.passwordForm.controls.password;
  }

  get confirmPassword(): FormControl<string> {
    return this.passwordForm.controls.confirmPassword;
  }
}
