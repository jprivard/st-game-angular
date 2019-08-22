import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-char-row',
  template: `
    <div class="row">
      <div class="col-12 col-md-4">{{ title | translate }}</div>
      <div class="col-12 col-md-8">{{ data }}</div>
    </div>
  `,
  styleUrls: ['./assignment.component.scss'],
})
export class RowComponent {
  @Input() title: string;
  @Input() data: string;
  constructor() {}
}
