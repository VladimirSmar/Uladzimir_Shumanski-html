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
  private subsubscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string | null = null;
  private downloadURL: Observable<string>;

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private alertService: AlertService
  ) { 
    this.loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this.subsubscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    );

    this.subsubscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    )
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const task = this.fs.upload(filePath, file);
    const ref = this.fs.ref(filePath);

    //observe the percentage changes
    this.subsubscriptions.push(
      task.percentageChanges().subscribe(percentage => {
        if(percentage < 100) {
          this.loadingService.isLoading.next(true);
        } else {
          this.loadingService.isLoading.next(false);
        }
        this.uploadPercent = percentage;
      })
    );

    //get notified when the download URL is available
    this.subsubscriptions.push(
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => this.downloadUrl = url)
        })
      ).subscribe()
    );
  }

  public save(): void {
    let photo;

    if (this.downloadUrl) {
      photo = this.downloadUrl;
    } else {
      photo = this.currentUser.photoUrl;
    }

    const user = Object.assign({}, this.currentUser, {photoUrl: photo});
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user);
    this.alertService.alerts.next(new Alert('Your profile was successfully updated!', AlertType.Success));
    this.location.back();
  }

  ngOnDestroy() {
    this.subsubscriptions.forEach(sub => sub.unsubscribe());
  }

}
