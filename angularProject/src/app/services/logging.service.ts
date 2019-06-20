import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { Record } from './../store/models/recorder.model';
import * as RecorderActions from './../store/actions/recorder.actions';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(
    private _store: Store<AppState>
  ) { }

  public addRecord(message: string, createdAt: string): void {
    this._store.dispatch(new RecorderActions.AddRecord({message: message, createdAt: createdAt}));
  }
}
