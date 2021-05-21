import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';
import { LoginService } from '../login/login.service';
import { actionLogin } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private loginService: LoginService, private router: Router) {}

  actionName$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLogin),
        tap(() => this.loginService.displayLoading()),
        switchMap(data => from(this.authService.loginUsuario(data.payload.email, data.payload.password))),
        catchError(() => {
          this.loginService.hideLoading();
          return throwError('Loading fail');          
        }),
        tap(() => this.loginService.hideLoading()),
        tap(() => this.router.navigate(["/"]))
      ),
    {dispatch: false}
  );
}