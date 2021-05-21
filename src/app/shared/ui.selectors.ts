import {createFeatureSelector, createSelector} from '@ngrx/store' 
import { AppState } from '../app.reducer';
import { State } from './ui.reducer';

export const selectUiIsLoading = createSelector((state: AppState)=>state.ui , (state: State)=> state.isLoading);