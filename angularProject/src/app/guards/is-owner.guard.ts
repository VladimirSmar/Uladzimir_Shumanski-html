import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Alert } from './../classes/alert';
import { AlertType } from './../emuns/alert-type.enum';
import { AlertService } from './../services/alert.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _alertService: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser && currentUser.id === next.params.userId),
      tap((isOwner) => {
        if (!isOwner) {
          this._alertService.alerts.next(new Alert('You can only edit your profile.', AlertType.Danger));
          this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    )
  }
}
