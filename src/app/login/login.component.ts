import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';
import {User} from '../models/index';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
    user: User=new User();
    loading = false;
    returnUrl: string;
    errorMessage:string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user)
            .subscribe(
               
                token => {
                    var name  = this.user.userName
                    console.log("token  "+token);
                    if(token){
                        this.authenticationService.getUser(token,name).subscribe(
                            data=>{
                                this.loading = false;
                                this.router.navigate([this.returnUrl]);
                            },
                            error=>{
                                this.errorMessage=error.error.error_description;
                                this.loading = false;
                            }

                        );
                    }
                   
                },
                error => {
                  
                    this.errorMessage=error.error.error_description;
                    this.loading = false;
                });
    }
}
