import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Record } from './../models/recorder.model';

export const ADD_RECORD = '[RECORDER] Add';

export class AddRecord implements Action {
    readonly type = ADD_RECORD;

    constructor(public payload: Record) {

    }
}

export type Actions = AddRecord;