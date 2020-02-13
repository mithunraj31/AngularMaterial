import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    private userUrl = environment.APIURL + "/user/";
    constructor(private http: HttpClient) {

    }
    register(user: User) {
        return this.http.post<any>(this.userUrl + "register/", user);
    }

    getUsers() {
        return this.http.get<User[]>(this.userUrl);
    }

    updatePassword(password: any) {
        return this.http.post<any>(this.userUrl + "password/", password);
    }
}