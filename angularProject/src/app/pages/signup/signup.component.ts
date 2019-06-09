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

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {

    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;

      //TODO call the auth service
      this.subscriptions.push(
        this.auth.signup(firstName, lastName, email, password).subscribe(success => {
          if(success) {
          this.router.navigate(['/chat']);
          } else {
            const failedSigninAlert = new Alert('There is a problem signing up, try again.', AlertType.Danger);
            this.alertService.alerts.next(failedSigninAlert);
          }

          this.loadingService.isLoading.next(false);
        })
      )
    } else {
      const failedSigninAlert = new Alert('Please enter a valid Name, Email and Password, try again.', AlertType.Danger);
      this.alertService.alerts.next(failedSigninAlert);
    }

  }
}
