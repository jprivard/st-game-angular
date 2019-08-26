import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { map, take, skipWhile, takeUntil } from 'rxjs/operators';
import * as fromMission from '../reducers';
import * as fromCharacter from '../../character/reducers';
import * as fromAuth from '../../auth/reducers';
import { CharacterActions } from '../../character/actions';
import { MissionActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class CanReadGuard implements CanActivate {
  constructor(
    private authStore: Store<fromAuth.State>,
    private characterStore: Store<fromCharacter.State>,
    private missionStore: Store<fromMission.State>
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const observer = new Subject<boolean>();
    const id = Number(route.paramMap.get('id'));
    this.authStore.pipe(select(fromAuth.getUser), take(1)).subscribe(user => {
      const charSub = this.characterStore.pipe(select(fromCharacter.getSelectedCharacter)).subscribe(character => {
        if (!character) {
          this.characterStore.dispatch(CharacterActions.getCharactersRequest({ lastSelected: user.selectedCharacter }));
        } else {
          const missSub = this.missionStore.pipe(select(fromMission.getMissions)).subscribe(missions => {
            if (missions.length === 0) {
              this.missionStore.dispatch(MissionActions.getMissionsRequest());
            } else {
              const missionId = Number(id);
              missSub.unsubscribe();
              if (missions.filter(m => m.id === missionId).length === 1) {
                this.missionStore.dispatch(MissionActions.setSelectedMission({ id: missionId }));
                observer.next(true);
              } else {
                observer.next(false);
              }
            }
          });
          charSub.unsubscribe();
        }
      });
    });
    return observer;
  }
}
