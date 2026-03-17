import { FormControl } from '@angular/forms';
import { minAgeValidator } from './min-age.validator';

describe('minAgeValidator', () => {
  it('should return null when age meets the minimum', () => {
    const control = new FormControl(18);
    const result = minAgeValidator(18)(control);
    expect(result).toBeNull();
  });

  it('should return null when age exceeds the minimum', () => {
    const control = new FormControl(25);
    const result = minAgeValidator(18)(control);
    expect(result).toBeNull();
  });

  it('should return error when age is below the minimum', () => {
    const control = new FormControl(16);
    const result = minAgeValidator(18)(control);
    expect(result).toEqual({ minAge: { required: 18, actual: 16 } });
  });
});
