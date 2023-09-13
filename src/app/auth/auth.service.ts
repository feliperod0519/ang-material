import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user: User={email:'deeznuts.hotmale.com',userId:'0'} as User;

  constructor(private router: Router) { }

  registerUser(authData: AuthData){
    this.user = { email: authData.email, userId: Math.round(Math.random()*1000).toString()}
    this.authSuccessfully();
  }

  login(authData:AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*1000).toString()
    }
    this.authSuccessfully();
  }

  logout(){
    this.user = {} as User;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  get User(){
    return {...this.user}
  }

  isAuth(){
    return this.user.userId !='0';
  }

  private authSuccessfully(){
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
