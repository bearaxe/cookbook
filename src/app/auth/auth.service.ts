import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatabaseService } from '../shared/database.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService{
  // why are we using a subject here? Can't we just update it once?
  loggedInUser= new Subject<string>();
  token: string;

  // HEADS UP: You cannot run db commands in this service. That would cause a circular dependency
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  signupUser(email: string, password: string, cb: any){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/recipes'], {relativeTo: this.route});
        this.loggedInUser.next(email.split('@')[0]);
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
              this.token = token;
              cb.fetchData().subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            }
          );
      })
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string,
             cb: any){
             // cb: (resolve, reject) => any){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/recipes'], {relativeTo: this.route});
        this.loggedInUser.next(email.split('@')[0]);
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
              this.token = token;
              // I don't actually know if this is a hack or not.... it works but it's a thread through to avoid
              // that circular dependency problem from earlier. It works but this might be terrible practice, idk.
              // I also can't figure out how to strongtype this so it seems like this may be better to avoid if I need
              // to do anything like this in the future.
              console.log('lelelelel:', typeof cb, '\nwtf:', cb);
              // LEL IT'S A DATABASE! I LITERALLY JUST PASSED IT IN. Well I was way overthinking that. This should be ok
              // It's an instance being passed but this one's owned by the signin component.
              // If you implement this functionality for sign up, the cb (db) instance will be owned by sign up
              // This really should be redesigned, it wasn't made with this in foresight, so that's why this is janky af
              cb.fetchData().subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            }
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
