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

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';

    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        if (!!user) {
          this.router.navigateByUrl('/chat');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {

    if (this.loginForm.valid) {
      this.loadingService.isLoading.next(true);
      const { email, password } = this.loginForm.value;

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.displayFailedLogin();
          }

          this.loadingService.isLoading.next(false);
        })
      )
    } else {
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin();
    }
  }

  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Your Email or Password were invalid, try again.', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
  }

}
