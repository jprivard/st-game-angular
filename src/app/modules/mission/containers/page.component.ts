import * as fromMission from '../reducers';
import * as fromCharacter from '../../character/reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { MissionActions } from '../actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-mission',
  template: `Test`,
  styles: [``]
})
export class PageComponent implements OnDestroy {
  character$ = this.characterStore.pipe(select(fromCharacter.getSelectedCharacter));
  missions$ = this.missionStore.pipe(select(fromMission.getMissions));
  onDestroy$ = new Subject();
  constructor(
    private characterStore: Store<fromCharacter.State>,
    private missionStore: Store<fromMission.State>,
    private route: ActivatedRoute
  ) {
    /* this.character$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.missionStore.dispatch(MissionActions.getMissionsRequest());
      this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params) => {
        this.missionStore.dispatch(MissionActions.setSelectedMission({ id: Number(params.id) }));
      });
    }); */
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
