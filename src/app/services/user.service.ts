import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { User } from '../models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log("Get all");
        const headers = new HttpHeaders({
            //"Accept": "application/x-www-form-urlencoded",
            "authorization" : 'Bearer ' + localStorage.getItem('currentUserToken')
          
        } );
        return this.http.get<any>('http://localhost:8080/secured/api/users/',{headers: headers});
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        const headers = new HttpHeaders({
            "authorization" : 'Bearer ' + localStorage.getItem('currentUserToken')
        } );
        return this.http.post('http://localhost:8080/secured/api/addUser', user,{headers: headers});
    }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user);
    // }

    delete(id: number) {
        return this.http.delete('http://localhost:8080/secured/api/users/' + id);
    }
}