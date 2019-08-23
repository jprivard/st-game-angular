import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as fromAuth from '../modules/auth/reducers';
import * as fromCharacter from '../modules/character/reducers';
import { AuthActions } from '../modules/auth/actions';
import { CharacterActions } from '../modules/character/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  amountOfCharacters$ = this.characterStore.pipe(select(fromCharacter.getAmountOfCharaters));
  character$ = this.characterStore.pipe(select(fromCharacter.getSelectedCharacter));
  loggedIn$ = this.authStore.pipe(select(fromAuth.getLoggedIn));
  isAdmin$ = this.authStore.pipe(select(fromAuth.getIsAdmin));
  constructor(
    public translate: TranslateService,
    private characterStore: Store<fromCharacter.State>,
    private authStore: Store<fromAuth.State>
  ) {
    this.translate.setDefaultLang('fr');
  }

  public ngOnInit() {}
  public login() {
    this.authStore.dispatch(AuthActions.loginRedirect());
  }
  public logout() {
    this.authStore.dispatch(AuthActions.logoutRequest());
  }
  public chooseCharacter() {
    this.characterStore.dispatch(CharacterActions.chooseCharacter());
  }
  public createCharacter() {
    this.characterStore.dispatch(CharacterActions.createCharacter());
  }
}
