import { Component, Input } from '@angular/core';
import { FieldComponent } from './field.component';

@Component({
  selector: 'app-form-select-id-text',
  template: `
  <mat-form-field [formGroup]="form">
    <mat-label>{{ text | translate }}</mat-label>
    <mat-select [formControlName]="name">
      <mat-option *ngFor="let item of items" [value]="item.id">
        {{ item.text | translate }}
      </mat-option>
    </mat-select>
  </mat-form-field>
  `,
  styleUrls: ['./field.component.css'],
})
export class SelectIdTextComponent extends FieldComponent {
  @Input() items;
}
