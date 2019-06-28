import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import { Alert } from './../classes/alert';
import { AlertType } from './../emuns/alert-type.enum';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatroomsObservable: Observable<any> = null;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroomObservable: Observable<any> = null;
  public selectedChatroomMessagesObservable: Observable<any> = null;

  constructor(
    private _database: AngularFirestore,
    private _auth: AuthService,
    private _alertService: AlertService,
  ) {
    this.selectedChatroomObservable = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          return _database.doc(`chatrooms/${chatroomId}`).valueChanges();
        }
        return of(null);
      })
    );

    this.selectedChatroomMessagesObservable = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          return _database.collection(`chatrooms/${chatroomId}/messages`, ref => {
            return ref.orderBy('createdAt', 'desc').limit(100);
          }).valueChanges().pipe(
            map(arr => arr.reverse())
          );
        }
        return of(null);
      })
    );

    this.chatroomsObservable = _database.collection('chatrooms').valueChanges();
  }

  public createMessage(text: string): void {
    if (text) {
      const chatroomId = this.changeChatroom.value;
      const message = {
        message: text,
        createdAt: new Date(),
        sender: this._auth.currentUserSnapshot
      };
      this._database.collection(`chatrooms/${chatroomId}/messages`).add(message);
    } else {
      const invalidMessageAlert = new Alert('Your message were invalid, try again.', AlertType.Danger);
      this._alertService.alerts.next(invalidMessageAlert);
    }
  }

  public addChatroom(title: string): void {
    if (title) {
      this._database.collection(`chatrooms`).add({}).then((success) => {
        success.set({
          id: success.id,
          name: title
        })
      });
    } else {
      const failedAddChatroomAlert = new Alert('Chatroom title were invalid, try again.', AlertType.Danger);
      this._alertService.alerts.next(failedAddChatroomAlert);
    }
  }

}
