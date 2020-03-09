import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthInterceptorService = class AuthInterceptorService {
    intercept(req, next) {
        const idToken = localStorage.getItem("id_token");
        let cloned = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        cloned = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
        console.log(cloned);
        if (idToken) {
            cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(cloned);
        }
    }
};
AuthInterceptorService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthInterceptorService);
export { AuthInterceptorService };
//# sourceMappingURL=auth-interceptor.service.js.map