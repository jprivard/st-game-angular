import { NgModule } from '@angular/core';
import { InputComponent } from './components/fields/input.component';
import { FieldComponent } from './components/fields/field.component';
import { DateComponent } from './components/fields/date.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const COMPONENTS = [
  InputComponent,
  FieldComponent,
  DateComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forChild(),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
