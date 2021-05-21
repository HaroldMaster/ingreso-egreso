
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUiIsLoading } from 'src/app/shared/ui.selectors';
import * as fromUiActions from "src/app/shared/ui.actions";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoading$ = this.store.pipe(
      select(selectUiIsLoading)
    );
  }

  displayLoading(): void {
    this.store.dispatch(fromUiActions.isLoading())
  }

  hideLoading(): void {
    this.store.dispatch(fromUiActions.stopLoading());
  }
}