import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    private userUrl = environment.APIURL + "/user/";
    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get<User[]>(this.userUrl);
    }
}