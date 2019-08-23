import { Component, Input, OnInit } from '@angular/core';
import { FieldComponent } from './field.component';

@Component({
  selector: 'app-form-select-id-text',
  template: `
  <mat-form-field [formGroup]="form">
    <mat-label>{{ text | translate }}</mat-label>
    <mat-select [formControlName]="name" [(value)]="selected">
      <mat-option *ngFor="let item of items" [value]="item.id">
        {{ item.text | translate }}
      </mat-option>
    </mat-select>
  </mat-form-field>
  `,
  styleUrls: ['./field.component.css'],
})
export class SelectIdTextComponent extends FieldComponent implements OnInit {
  @Input() items;
  public selected: number;
  ngOnInit() {
    this.selected = this.form.get(this.name).value;
  }
}
