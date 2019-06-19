import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Alert } from './../../classes/alert';
import { AlertType } from './../../emuns/alert-type.enum';
import { AuthService } from './../../services/auth.service';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-sighup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup = undefined;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
    private _auth: AuthService,
    private _loadingService: LoadingService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  private createForm(): void {
    this.signupForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {

    if (this.signupForm.valid) {
      this._loadingService.isLoading.next(true);
      const { firstName, lastName, email, password } = this.signupForm.value;

      this._subscriptions.push(
        this._auth.signup(firstName, lastName, email, password).subscribe(success => {
          if(success) {
          this._router.navigate(['/chat']);
          } else {
            const failedSigninAlert = new Alert('There is a problem signing up, try again.', AlertType.Danger);
            this._alertService.alerts.next(failedSigninAlert);
          }

          this._loadingService.isLoading.next(false);
        })
      )
    } else {
      const failedSigninAlert = new Alert('Please enter a valid Name, Email and Password, try again.', AlertType.Danger);
      this._alertService.alerts.next(failedSigninAlert);
    }

  }
}
