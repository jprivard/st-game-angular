import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-mission-reply',
  template: `
  <mat-expansion-panel [expanded] = "expanded" (opened) = "reading.emit(null)">
    <mat-expansion-panel-header collapsedHeight="30px" expandedHeight="36px">
      <mat-panel-title class="col-12">
      <mat-icon>create</mat-icon> Écrivez la suite
    </mat-panel-title>
    </mat-expansion-panel-header>
    <ckeditor [editor]="editor" data="<p>Hello, world!</p>"></ckeditor>
    <mat-action-row>
      Buttons
    </mat-action-row>
  </mat-expansion-panel>
  `,
  styles: [`
  mat-icon {
    margin-left: 25px;
    margin-right: 54px;
  }
  `],
  })
export class ReplyComponent {
  @Input() expanded: boolean;
  @Output() reading = new EventEmitter<number>();
  public editor = ClassicEditor;
  constructor() {}
}
