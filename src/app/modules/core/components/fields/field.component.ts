import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  template: '',
  styleUrls: [],
})
export class FieldComponent {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() text: string;
  constructor() {}
  errorsOf(field: string) {
    return Object.keys(this.form.get(field).errors);
  }
}
