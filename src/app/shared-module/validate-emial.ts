/** A hero's name can't match the given regular expression */
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
