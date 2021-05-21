import { createAction, props } from '@ngrx/store';

export const AuthActionsType = {
  login: '[Auth] Login'
}

export const actionLogin = createAction(
  AuthActionsType.login,
  props<{payload: {email: string, password: string}}>()
);
