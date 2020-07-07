import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/LoginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

export interface Token {
    sub: string;
    scopes: string;
    iat: string;
    exp: string;
    firstName: string;
    lastName: string;
}

@Injectable()
export class AuthService {
    private jwtHelper = new JwtHelperService();
    private loggedIn = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient) { }

    apiurl = environment.APIURL;
    
    login(user: LoginUser) {
        return this.http.post<LoginUser>(this.apiurl+"/login", user);

    }

    public setSession(authResult) {
        const user: Token = this.jwtHelper.decodeToken(authResult.token);
        const expiresAt = user.exp;
        
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", expiresAt);
        localStorage.setItem("scopes",user.scopes);
        localStorage.setItem("firstName",user.firstName);
        localStorage.setItem("lastName",user.lastName);
        if (authResult.token) this.loggedIn.next(true);
    }

    public isLoggedIn() {
        if (this.isAuthenticated()) {
            this.loggedIn.next(true);
        } else {
            this.loggedIn.next(false);
        }

        return this.loggedIn.asObservable();
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt: Number = JSON.parse(expiration);

        return expiresAt;
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem("expires_at");
        this.loggedIn.next(false);
    }

    public isAuthenticated(): boolean {
        if (this.getExpiration() > Date.now()/1000 ) {
            //this.loggedIn.next(true);
            return true;
        } else {
            //this.loggedIn.next(false);
            return false;
        }
    }

    getFirstName(): string{
        return localStorage.getItem("firstName");
    }

    getLastName(): string{
        return localStorage.getItem("lastName");
    }
    getRole(): string {
        return localStorage.getItem("scopes");
    }
}