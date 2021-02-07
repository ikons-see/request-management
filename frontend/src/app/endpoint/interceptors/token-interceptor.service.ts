import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RequestsManagementService } from "../requests-management.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private requestService: RequestsManagementService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request) {
            return next.handle(request);
        }

        const token = this.requestService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            });
        }
        return next.handle(request);
    }
}