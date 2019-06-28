import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Record } from './../../store/models/recorder.model';
import { AppState } from './../../app.state';
import { LoggingService } from './../../services/logging.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {

  public recordsObservable: Observable<Record[]> = null;

  public newRecordText: string = '';

  constructor(
    private _store: Store<AppState>,
    private _loggingService: LoggingService
  ) {
    this.recordsObservable = this._store.select('record');
  }

  ngOnInit() {
  }

  public addRecord(message: string): void {
    if (message) {
      let timestomp: string = new Date().toUTCString();
      this._loggingService.addRecord(message, timestomp);

      this.newRecordText = '';
    }
  }

}
