import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { ApplicationState } from "src/app/app.module";

@Injectable({
    providedIn: 'root'
})
export class ActivationGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>, private router: Router) {
        console.log('Activation guard');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('Route:', route);
        return of(true);
    }
}
