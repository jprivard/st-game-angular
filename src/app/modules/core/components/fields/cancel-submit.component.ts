import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cancel-submit',
  template: `
  <mat-card-actions>
    <button mat-button mat-stroked-button [mat-dialog-close]="cancel">
      {{ 'CHARACTER.CANCEL' | translate }}
    </button>
    <button mat-button mat-flat-button color="primary" [disabled]="!form.valid" [mat-dialog-close]="submit">
      {{ 'CHARACTER.SUBMIT' | translate }}
    </button>
  </mat-card-actions>
  `,
  styles: [`
  mat-dialog-actions {
    float: right;
  }
  `],
})
export class CancelSubmitComponent {
  @Input() form: FormGroup;
  @Input() cancel;
  @Input() submit;
  constructor() {}
}
