import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fg = group as FormGroup;
    const pass = fg.controls['password'].value;
    const confirm = fg.controls['confirmPassword'].value;
    return pass !== confirm ? { passwordMismatch: true } : null;
  };
}
