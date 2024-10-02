import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { isEmpty: true };
  };
}
