import { Record } from './store/models/recorder.model';

export interface AppState {
    readonly recorder: Record[];
}