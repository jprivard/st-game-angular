import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCharacter from './reducers';
import { MaterialModule } from '../material';
import { CharacterRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CharacterPageComponent } from './containers/character-page.component';
import { CharacterEffects } from './effects';
import { CharacterCardComponent } from './components/character-card.component';

export const COMPONENTS = [
  CharacterPageComponent,
  CharacterCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CharacterRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromCharacter.characterFeatureKey, fromCharacter.reducer),
    EffectsModule.forFeature([CharacterEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [],
})
export class CharacterModule {}
