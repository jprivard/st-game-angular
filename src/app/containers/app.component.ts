import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions } from '../modules/auth/actions';
import * as fromAuth from '../modules/auth/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'site';
  constructor(
    public translate: TranslateService,
    private store: Store<fromAuth.State>
  ) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit() {}

  logout() {
    this.store.dispatch(AuthActions.logoutRequest());
  }
}
