import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { LoadingService } from './../../services/loading.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../../interfaces/user';
import { AlertService } from './../../services/alert.service';
import { Alert } from './../../classes/alert';
import { AlertType } from './../../emuns/alert-type.enum';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  private _subsubscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string | null = null;
  private _downloadURLObservable: Observable<string> = null;

  constructor(
    private _auth: AuthService,
    private _loadingService: LoadingService,
    private _route: ActivatedRoute,
    private _fireStorage: AngularFireStorage,
    private _database: AngularFirestore,
    private _location: Location,
    private _alertService: AlertService
  ) { 
    this._loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this._subsubscriptions.push(
      this._auth.currentUserObservable.subscribe(user => {
        this.currentUser = user;
        this._loadingService.isLoading.next(false);
      })
    );

    this._subsubscriptions.push(
      this._route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    )
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const task = this._fireStorage.upload(filePath, file);
    const ref = this._fireStorage.ref(filePath);

    this._subsubscriptions.push(
      task.percentageChanges().subscribe(percentage => {
        if(percentage < 100) {
          this._loadingService.isLoading.next(true);
        } else {
          this._loadingService.isLoading.next(false);
        }
        this.uploadPercent = percentage;
      })
    );

    this._subsubscriptions.push(
      task.snapshotChanges().pipe(
        finalize(() => {
          this._downloadURLObservable = ref.getDownloadURL()
          this._downloadURLObservable.subscribe(url => this.downloadUrl = url)
        })
      ).subscribe()
    );
  }

  public saveProfileChanges(): void {
    let photo: string;

    if (this.downloadUrl) {
      photo = this.downloadUrl;
    } else {
      photo = this.currentUser.photoUrl;
    }

    const user = Object.assign({}, this.currentUser, {photoUrl: photo});
    const userRef: AngularFirestoreDocument<User> = this._database.doc(`users/${user.id}`);
    userRef.set(user);
    this._alertService.alerts.next(new Alert('Your profile was successfully updated!', AlertType.Success));
    this._location.back();
  }

  ngOnDestroy() {
    this._subsubscriptions.forEach(sub => sub.unsubscribe());
  }

}
