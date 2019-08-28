import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-mission-reply',
  template: `
  <mat-expansion-panel [expanded] = "expanded" (opened) = "reading.emit(null)">
    <mat-expansion-panel-header collapsedHeight="36px" expandedHeight="36px">
    <mat-panel-title class="col-12">
      <mat-icon>create</mat-icon> Écrivez la suite
    </mat-panel-title>
    </mat-expansion-panel-header>
    <form [formGroup]="form">
      <ckeditor formControlName="message" [editor]="editor"></ckeditor>
      <div class="row">
        <div class="col-12 col-md-4">
          <mat-button-toggle-group formControlName="type">
            <mat-button-toggle value="story" matTooltip="Histoire" aria-label="Histoire">
              <mat-icon>chrome_reader_mode</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="rp" matTooltip="Role-Play" aria-label="Roleplay">
              <mat-icon>person</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="hrp" matTooltip="Hors Role-Play" aria-label="Hors-Roleplay">
              <mat-icon>people_alt</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <div class="col-10 col-md-4">
          <mat-form-field>
            <mat-label>Groupe d'envoi</mat-label>
            <mat-select formControlName="group">
              <mat-option *ngFor="let group of groups" [value]="group.id">{{ group.name }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </form>
    <mat-action-row>
      <button mat-button [disabled]="form.invalid" (click)="sendForm()">Envoyer</button>
    </mat-action-row>
  </mat-expansion-panel>
  `,
  styles: [`
  mat-panel-title > mat-icon {
    margin-left: 25px;
    margin-right: 54px;
  }
  .row {
    margin-top: 20px;
  }
  `],
  })
export class ReplyComponent {
  @Input() groups: Group[];
  @Input() expanded: boolean;
  @Output() reading = new EventEmitter<number>();
  public form = new FormGroup({
    message: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });
  public editor = ClassicEditor;
  constructor() {}

  public sendForm() {
    console.log(this.form.getRawValue());
  }
}
