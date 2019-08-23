import { Component } from '@angular/core';
import { FieldComponent } from './field.component';

@Component({
  selector: 'app-form-input',
  template: `
  <mat-form-field [formGroup]="form">
    <input type="text" matInput [formControlName]="name" placeholder="{{ text | translate }}"/>
    <mat-error *ngIf="form.get(name).errors">
      <ng-container *ngFor="let error of errorsOf(name)">
      {{ 'VALIDATIONS.ERROR.' + error.toUpperCase() | translate:{ field: text | translate } }}
      </ng-container>
    </mat-error>
  </mat-form-field>
  `,
  styleUrls: ['./field.component.css'],
})
export class InputComponent extends FieldComponent {}
