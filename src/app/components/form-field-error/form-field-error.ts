import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HlmHint } from '@spartan-ng/helm/form-field';

@Component({
  selector: 'app-form-field-error',
  imports: [HlmHint],
  templateUrl: './form-field-error.html',
  styleUrl: './form-field-error.css',
})
export class FormFieldError {
  @Input() control!: AbstractControl;
  @Input() label!: string;

  get shouldShowError(): boolean {
    return (
      this.control?.invalid &&
      !this.control?.disabled &&
      (this.control?.dirty || this.control?.touched)
    );
  }
}
