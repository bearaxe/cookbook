import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalDataService } from '../shared/local-data.service';

@Injectable()
export class AuthService{
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
              console.log('trails 1.1');
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
              console.log('trails 1.2');
              this.onAuthSuccess(token, email);
            }
          );
      })
      .catch(
        error => console.log(error)
      );
  }
  onAuthSuccess(token: string, email: string){
    console.log('trails 1');
    this.localDS.tokenSubj.next(token);
    this.localDS.userSubj.next(email.split('@')[0]);
    this.localDS.fetchData();
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

  logout(){
    firebase.auth().signOut();
    this.localDS.deleteSession();
  }

  // this returns a Promise
  // TODO: YOU WILL NEED TO STORE THIS IN THE LOCALDATA SERVICE
  // try to use this to refresh the token (but there should probably be time limits, etc)
  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.localDS.tokenSubj.next(token)
    );
    // this may not refresh the token and just be unavailable. It would need error checking.
    return this.localDS.token;
  }

  // This i don't know if it should go into the LocDS
  // This is pure auth in name, but the logic based of token, stored in locDS
  isAuthenticated() {
    return this.localDS.token != null;
  }

}
