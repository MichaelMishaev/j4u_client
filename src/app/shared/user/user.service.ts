import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {


  private user:any;  
  public setCurrentUser(user){
    this.user = user;
  }
  public getCurrentUser() {
    return this.user;
  }
 
 
}
