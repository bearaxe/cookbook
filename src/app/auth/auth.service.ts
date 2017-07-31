import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService{
  loggedInUser= new Subject<string>();

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
      })
      .catch(
        error => console.log(error)
      );
  }

}
