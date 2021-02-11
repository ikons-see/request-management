import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { getUserRole } from '../../store/global/global-reducer';
import { Role } from '../../types/data-types';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessGuard implements CanActivate, CanActivateChild {
    private readonly userRole$: Observable<Role>;

    constructor(private store: Store<ApplicationState>, private router: Router) {
        this.userRole$ = this.store.select(getUserRole);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.hasRouteAccess(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    hasRouteAccess(url: string) {
        console.log('Url:', url);
        return this.userRole$.pipe(
            map(role => {
              console.log('url ', url);
              if (role == Role.admin && url.includes('administrator')) {
                  return true;
                } else 
                if (role == Role.requester && url.includes('requester')) {
                 return true;
                } else {
                    this.router.navigateByUrl('app/not-authorized');
                }
              return false;
            })
          );
    }
}