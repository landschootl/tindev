import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//Sauf erreur de ma part, ca ne devrait pas être ici je suppose
export class User {
  firstname: string;
  lastname: string;
  email: string;
  recruiter: boolean;
  completedProfile:boolean;
 
  constructor(firstname: string, lastname: string, recruiter: boolean, email: string, completedProfile: boolean) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.recruiter = recruiter;
    this.email = email;
    this.completedProfile = completedProfile;
  }
}
 
@Injectable()
export class AuthService {
	 //service inspired by https://devdactic.com/login-ionic-2/
	 //Need to change all the Observable by api calls
  currentUser: User;
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "azerty" && credentials.email === "mathieu.saab@tindev.com");
        this.currentUser = new User('Mathieu', 'Saab', false, 'mathieu.saab@tindev.com', true);
        console.log("User logged in : " + this.currentUser.firstname + " " + this.currentUser.lastname + " : " + this.currentUser.email + " recruiter : " + this.currentUser.recruiter);
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      // Refactor ici pour rappeler une fonction login
      return Observable.create(observer => {
        this.currentUser = new User(credentials.firstname, credentials.lastname, credentials.recruiter, 'ludovic.landschoot@tindev.com', false);
        console.log("User logged in : " + this.currentUser.firstname + " " + this.currentUser.lastname + " : " + this.currentUser.email + " recruiter : " + this.currentUser.recruiter);
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}