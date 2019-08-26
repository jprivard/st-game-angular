import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, map, tap, skipWhile, exhaustMap } from 'rxjs/operators';
import * as fromMission from '../reducers';
import * as fromCharacter from '../../character/reducers';
import * as fromAuth from '../../auth/reducers';
import { CharacterActions } from '../../character/actions';
import { MissionActions } from '../actions';
import { AuthActions } from '../../auth/actions';
import { User } from '../../auth/models/user.model';

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
    return this.authStore.pipe(
      select(fromAuth.getUser),
      tap(this.checkAndLoadAuth),
      skipWhile(user => user === null),
      take(1),
      exhaustMap(this.getSelectedCharacterFrom),
      exhaustMap(this.getMissionsFrom),
      map(this.hasMissionId(Number(route.paramMap.get('id'))))
    );
  }

  private checkAndLoadAuth = (user: User) => {
    if (!user) {
      this.authStore.dispatch(AuthActions.checkSessionRequest());
    }
    return of(user);
  }

  private getSelectedCharacterFrom = (user) => {
    return this.characterStore.pipe(
      select(fromCharacter.getSelectedCharacter),
      tap(character => {
        if (!character) {
          this.characterStore.dispatch(CharacterActions.getCharactersRequest( { lastSelected: user.selectedCharacter }));
        }
        return of(character);
      }),
      skipWhile(character => character === null),
      take(1)
    );
  }

  private getMissionsFrom = (character) => {
    return this.missionStore.pipe(
      select(fromMission.getMissions),
      tap(missions => {
        if (missions.length === 0) {
          this.missionStore.dispatch(MissionActions.getMissionsRequest());
        }
      }),
      skipWhile(missions => missions.length === 0),
      take(1)
    );
  }

  private hasMissionId(id) {
    return missions => missions.filter(m => m.id === id).length > 0;
  }
}
