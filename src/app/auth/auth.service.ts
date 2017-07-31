import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService{
  // why are we using a subject here? Can't we just update it once?
  loggedInUser= new Subject<string>();
  token: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/recipes'], {relativeTo: this.route});
        this.loggedInUser.next(email.split('@')[0]);
      })
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/recipes'], {relativeTo: this.route});
        this.loggedInUser.next(email.split('@')[0]);
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => this.token = token
          );
      })
      .catch(
        error => console.log(error)
      );
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
  }

  // this returns a Promise
  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );
    // this may not refresh the token and just be unavailable. It would need error checking.
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
