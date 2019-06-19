import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Alert } from './../../classes/alert';
import { AlertType } from './../../emuns/alert-type.enum';
import { LoadingService } from './../../services/loading.service';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = undefined;
  private _subscriptions: Subscription[] = [];
  private _returnUrl: string = undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/chat';

    this._subscriptions.push(
      this._auth.currentUser.subscribe(user => {
        if (!!user) {
          this._router.navigateByUrl('/chat');
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  private createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {

    if (this.loginForm.valid) {
      this._loadingService.isLoading.next(true);
      const { email, password } = this.loginForm.value;

      this._subscriptions.push(
        this._auth.login(email, password).subscribe(success => {
          if (success) {
            this._router.navigateByUrl(this._returnUrl);
          } else {
            this.displayFailedLogin();
          }

          this._loadingService.isLoading.next(false);
        })
      )
    } else {
      this._loadingService.isLoading.next(false);
      this.displayFailedLogin();
    }
  }

  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Your Email or Password were invalid, try again.', AlertType.Danger);
    this._alertService.alerts.next(failedLoginAlert);
  }

}
