import { FormControl } from '@angular/forms';
import { noSpacesValidator } from './no-spaces.validator';

describe('noSpacesValidator', () => {
  it('should return null when value has no spaces', () => {
    const control = new FormControl('validusername');
    const result = noSpacesValidator()(control);
    expect(result).toBeNull();
  });

  it('should return error when value contains spaces', () => {
    const control = new FormControl('invalid username');
    const result = noSpacesValidator()(control);
    expect(result).toEqual({ noSpaces: true });
  });
});
