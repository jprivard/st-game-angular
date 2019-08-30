import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import * as fromAuth from './reducers';
import { MaterialModule } from '../material';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CreatePageComponent } from './containers/create-page.component.ts';
import { CreateFormComponent } from './components/create-form.component';

export const COMPONENTS = [
  CreatePageComponent,
  CreateFormComponent,
  LoginPageComponent,
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [],
})
export class AuthModule {}
