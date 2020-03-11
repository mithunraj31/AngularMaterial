import * as tslib_1 from "tslib";
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.jwtHelper = new JwtHelperService();
        this.loggedIn = new BehaviorSubject(false);
        this.apiurl = environment.APIURL;
    }
    login(user) {
        return this.http.post("http://13.113.194.21:4000/mbel/login", user);
    }
    setSession(authResult) {
        const user = this.jwtHelper.decodeToken(authResult.token);
        const expiresAt = user.exp;
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", expiresAt);
        localStorage.setItem("scopes", user.scopes);
        if (authResult.token)
            this.loggedIn.next(true);
    }
    isLoggedIn() {
        if (this.isAuthenticated()) {
            console.log("heyyyyyyy");
            this.loggedIn.next(true);
        }
        else {
            this.loggedIn.next(false);
        }
        return this.loggedIn.asObservable();
    }
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem("expires_at");
        this.loggedIn.next(false);
    }
    isAuthenticated() {
        if (this.getExpiration() > Date.now() / 1000) {
            //this.loggedIn.next(true);
            return true;
        }
        else {
            //this.loggedIn.next(false);
            return false;
        }
    }
};
AuthService = tslib_1.__decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=AuthService.js.map