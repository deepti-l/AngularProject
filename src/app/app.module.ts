import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedModule} from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule,Router} from '@angular/router';
import {routing} from './app.route';
import {UserService,AuthenticationService,AlertService} from './services/index';
import {AuthGuard} from './guards/index';
import {DataGridModule} from './data-grid/data-grid.module';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    DataGridModule,
    routing
  ],
  providers: [
    AuthenticationService,
    AlertService ,  
    UserService, 
    AuthGuard   
  ],
  bootstrap: [AppComponent],
  schemas: [ 
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
