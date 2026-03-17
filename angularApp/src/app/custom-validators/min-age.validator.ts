import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value as number;
    return age < minAge ? { minAge: { required: minAge, actual: age } } : null;
  };
}
