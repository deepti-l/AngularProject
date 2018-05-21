import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import {User,Clientdetails} from '../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    client:Clientdetails = new Clientdetails();
    login(user:User) {
        const headers = new HttpHeaders({
            //"Accept": "application/x-www-form-urlencoded",
            "authorization" : 'Basic ' + btoa(this.client.clientId + ':' + this.client.clientPassword)
          
        } );

        const formData = new FormData();
        formData.append('grant_type', this.client.grantType);
        formData.append('username', user.userName);
        formData.append('password', user.password);
        formData.append('client_id', this.client.clientId);

        return this.http.post<any>('http://localhost:8080/oauth/token',  formData,{headers: headers})
        
            .map(x => {
                if(x){
                    localStorage.setItem('currentUserToken', x.access_token);
                    return x.access_token;
                 }
             });
          }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
    }

    getUser(token:string,name:string){
        const params = new HttpParams().set("userName",name);
         const headers = new HttpHeaders({
            //"Accept": "application/x-www-form-urlencoded",
            "authorization" : 'Bearer ' + token
          
        } );
        return this.http.get<any>('http://localhost:8080/secured/api/getUserDetails',{headers: headers,params:params}).map(x => {
            if(x.isSuccess){
                localStorage.setItem('currentUser', JSON.stringify(x.items[0]));
             }
             return x.items[0];
         });
    }
}