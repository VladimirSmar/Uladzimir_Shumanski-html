import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { LoadingService } from './../../services/loading.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public user: User = null;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _auth: AuthService,
    private _loadingService: LoadingService,
    private _route: ActivatedRoute,
    private _database: AngularFirestore
  ) {
    this._loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this._subscriptions.push(
      this._auth.currentUser.subscribe( user => {
        this.currentUser = user;
        this._loadingService.isLoading.next(false);
      })
    );

    this._subscriptions.push(
      this._route.paramMap.subscribe(params => {
        const userId = params.get('userId');
        const userRef: AngularFirestoreDocument<User> = this._database.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user => this.user = user);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

}
