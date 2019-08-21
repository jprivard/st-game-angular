import { createSelector, createFeatureSelector, Action, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from '../modules/core/reducers/layout.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  'layout'
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
