import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMission from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { MissionEffects } from './effects';
import { CardComponent } from './components/card.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './containers/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageComponent } from './containers/page.component';
import { MissionRoutingModule } from './auth-routing.module';
import { CharacterModule } from '../character/character.module';
import { ParticipantsComponent } from './components/participants.component';
import { MessagesComponent } from './components/messages.component';

const COMPONENTS = [
  PageComponent,
  DashboardComponent,
  CardComponent,
  ParticipantsComponent,
  MessagesComponent,
];

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MissionRoutingModule,
    CharacterModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromMission.missionFeatureKey, fromMission.reducer),
    EffectsModule.forFeature([MissionEffects]),
  ],
  declarations: [COMPONENTS],
  entryComponents: [],
  exports: [COMPONENTS]
})
export class MissionModule {}
