import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { User } from './../interfaces/user';
import { Alert } from './../classes/alert';
import { AlertType } from './../emuns/alert-type.enum';
import { AlertService } from './../services/alert.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null> = undefined;
  public currentUserSnapshot: User | null = undefined;

  constructor(
    private _router: Router,
    private _alertService: AlertService,
    private _angularFirebaseAuth: AngularFireAuth,
    private _database: AngularFirestore
  ) {

    this.currentUser = this._angularFirebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._database.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.setCurrentUserSnapshot();
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this._angularFirebaseAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this._database.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/angularchat-edbb9.appspot.com/o/default_profile_pic.jpg?alt=media&token=a2ce120f-b426-45cf-8d14-c39edf611672',
            quote: 'Life is like a box of chocolates!',
            bio: 'Bio is under construction...'
          }
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    )
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this._angularFirebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void {
    this._angularFirebaseAuth.auth.signOut().then(() => {
      this._router.navigate(['/login']);
      this._alertService.alerts.next(new Alert('You have been signed out.', AlertType.Success));
    })
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }
}
