import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Credentials } from '../models/credentials.model';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card>
      <mat-card-title>{{ 'AUTH.HEADER' | translate }}</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input
                type="text"
                matInput
                placeholder="{{ 'AUTH.EMAIL' | translate }}"
                formControlName="email"
              />
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input
                type="password"
                matInput
                placeholder="{{ 'AUTH.PASSWORD' | translate }}"
                formControlName="password"
              />
            </mat-form-field>
          </p>

          <ngb-alert *ngIf="errorMessage" type="danger" [dismissible]="false">
            {{ errorMessage | translate }}
            {{ errorMessage | translate }}
          </ngb-alert>

          <p class="loginButtons">
            <button type="submit" mat-flat-button color="primary" mat-button>{{ 'AUTH.LOGIN' | translate }}</button>
          </p>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 72px 0;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      ngb-alert {
        width: 300px;
      }

      .loginButtons {
        float: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Credentials>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
