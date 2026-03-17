import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

describe('passwordMatchValidator', () => {
  it('should return null when passwords match', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirmPassword: new FormControl('secret123'),
    });
    const result = passwordMatchValidator()(group);
    expect(result).toBeNull();
  });

  it('should return error when passwords do not match', () => {
    const group = new FormGroup({
      password: new FormControl('secret123'),
      confirmPassword: new FormControl('different'),
    });
    const result = passwordMatchValidator()(group);
    expect(result).toEqual({ passwordMismatch: true });
  });
});
