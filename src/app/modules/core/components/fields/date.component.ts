import { Component } from '@angular/core';
import { FieldComponent } from './field.component';

@Component({
  selector: 'app-form-date',
  template: `
  <mat-form-field [formGroup]="form">
    <input matInput [formControlName]="name" [matDatepicker]="picker" placeholder="{{ text | translate }}">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker startAt="2400-01-02"></mat-datepicker>
    <mat-error *ngIf="form.get(name).errors">
      <ng-container *ngFor="let error of errorsOf(name)">
      {{ 'VALIDATIONS.ERROR.' + error.toUpperCase() | translate:{ field: text | translate } }}
      </ng-container>
    </mat-error>
  </mat-form-field>
  `,
  styleUrls: ['./field.component.css'],
})
export class DateComponent extends FieldComponent {}
