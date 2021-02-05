import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { ApplicationState } from 'src/app/app.module';
import { isAuthenticated } from 'src/app/store/requests-reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    private readonly isAuthenticated$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>, private router: Router) {
        this.isAuthenticated$ = this.store.select(isAuthenticated);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthenticated$.pipe(switchMap(isLoggedIn => {
            if (!isLoggedIn) {
                return this.router.navigate(['login']);
            } else {
                return of(true);
            }
        }));
    }
}
