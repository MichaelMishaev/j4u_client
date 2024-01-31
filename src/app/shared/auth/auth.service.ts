import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
//todo remove 
@Injectable()
export class AuthService {
  token: string;

  constructor() {}

  // signupUser(email: string, password: string) {
  //   //your code for signing up the new user
  // }

  // signinUser(email: string, password: string) {
  //   //your code for checking credentials and getting tokens for for signing in user
  // }

  logout() {   
    this.token = null;
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    const token = localStorage.auth_app_token
    return token && !this.tokenExpired(token)
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
}
