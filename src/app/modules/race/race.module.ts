import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRace from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { RaceEffects } from './effects';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromRace.raceFeatureKey, fromRace.reducer),
    EffectsModule.forFeature([RaceEffects]),
  ],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class RaceModule {}
