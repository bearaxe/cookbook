import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatabaseService } from '../shared/database.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalDataService } from '../shared/local-data.service';

@Injectable()
export class AuthService{
  // why are we using a subject here? Can't we just update it once?
  // I need to figure out how to set the initial value of a Subject
  // try out BehaviorSubject

  // loggedInUser= ( window.localStorage.getItem('cookbook-user')
  //                     ? new BehaviorSubject<string>(window.localStorage.getItem('cookbook-user'))
  //                     : new Subject<string>());
  loggedInUser = new Subject<string>();
  // token: string = window.localStorage.getItem('cookbook-tk') || null;
  token: string;
  // HEADS UP: You cannot run db commands in this service. That would cause a circular dependency
  constructor(private router: Router,
              private route: ActivatedRoute,
              private localDS: LocalDataService) { }

  signupUser(email: string, password: string, cb: any){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
              this.onAuthSuccess(token, email);
            }
          );
      })
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
              this.onAuthSuccess(token, email);
            }

          );
      })
      .catch(
        error => console.log(error)
      );
  }
  onAuthSuccess(token: string, email: string){
    this.localDS.tokenSubj.next(token);
    this.localDS.userSubj.next(email.split('@')[0]);
    this.localDS.fetchData();
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

  logout(){
    firebase.auth().signOut();
    // clean out localDS data (shouldn't this go in a clearData function in localDS?)
    this.localDS.tokenSubj.next(null);
    this.localDS.userSubj.next(null);
  }

  // this returns a Promise
  // TODO: YOU WILL NEED TO STORE THIS IN THE LOCALDATA SERVICE
  // try to use this to refresh the token (but there should probably be time limits, etc)
  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );
    // this may not refresh the token and just be unavailable. It would need error checking.
    return this.token;
  }

  // This i don't know if it should go into the LocDS
  // This is pure auth in name, but the logic based of token, stored in locDS
  isAuthenticated() {
    return this.localDS.token != null;
  }

}
