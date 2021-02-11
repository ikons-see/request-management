import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { Role } from '../../types/data-types';
import { map } from 'rxjs/operators';
import { RequestsManagementService } from '../requests-management.service';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessGuard implements CanActivate {
    private readonly userRole$: Observable<Role>;

    constructor(private store: Store<ApplicationState>,
        private router: Router,
        private requestsService: RequestsManagementService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const role = route.data['role'] as Role;
        return this.checkLogin(role, state.url);
    }

    checkLogin(role: Role, url: string): Observable<boolean> {
        return this.requestsService.getUserInfo().pipe(
            map(userData => {
                if (userData.authorities.includes(role)) {
                    return true;
                } else {
                    this.router.navigateByUrl('app/not-authorized');
                }
                return false;
            })
        );
    }
}