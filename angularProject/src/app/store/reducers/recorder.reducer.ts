import { Action } from '@ngrx/store';
import { Record } from './../models/recorder.model';
import * as RecorderActions from './../actions/recorder.actions';

const default_state: Record = {
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: new Date().toUTCString()
}

export function recorderReducer(state: Record[] = [default_state], action: RecorderActions.Actions) {
    switch (action.type) {
        case RecorderActions.ADD_RECORD:
            return [...state, action.payload];

        default:
            return state;
    }
}