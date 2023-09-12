import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user: User={} as User;

  constructor() { }

  registerUser(authData: AuthData){
    this.user = { email: authData.email, userId: Math.round(Math.random()*1000).toString()}
    this.authChange.next(true);
  }

  login(authData:AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*1000).toString()
    }
    this.authChange.next(true);
  }

  logout(){
    this.user = {} as User;
    this.authChange.next(false);
  }

  get User(){
    return {...this.user}
  }

  isAuth(){
    return this.user !=null;
  }
}
