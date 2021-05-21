import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';



@Injectable({
  providedIn: 'root'
})
export class UiEffects {

  // login$ = this.actions$.pipe(ofType(actionLogin));

  constructor(private actions$: Actions) {}
}