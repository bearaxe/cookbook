// handle all localStore ops here
// handle all data to go to localStore here
// all persistent data should go here (anything that should come back on app reload)
// theoretically you can save everything on window.unload but idk if that's the best way rn
// You can publish all your local data to the store located here and then just inject this wherever you want access to
//   that data
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DatabaseService } from './database.service';

@Injectable()
export class LocalDataService {
  tokenSubj = new Subject<string>();
  userSubj = new Subject<string>();
  token: string;
  user: string;

  constructor(private db: DatabaseService,
              private router: Router) {
    this.tokenSubj.subscribe(
      (token: string) => {
        this.token = token;
        this.store('token', token);
      }
    );

    this.userSubj.subscribe(
      (user: string) => {
        this.user = user;
        this.store('user', user);
      }
    );

    this.findSession();
  }

  findSession() {
    const tempTok = this.get('token');
    const tempUse = this.get('user');
    // null values are strings in localStorage, so I'm checking if string (not undefined) and value null or other
    if (tempTok !== 'null' && typeof tempTok === 'string'
        && tempUse !== 'null' && typeof tempUse === 'string') {
      this.tokenSubj.next(tempTok);
      this.userSubj.next(tempUse);
      this.fetchData();
    }
  }

  store(key: string, value: string) {
    window.localStorage.setItem(key, value);
    console.log('Key: ', key, ' successfully stored');
  }

  get(key: string) {
    console.log('Retrieving key:', key);
    return window.localStorage.getItem(key);
  }

  saveData() {
    this.db.saveData(this.token).subscribe(
      (response) => console.log('Silent data save successful.\nChanges should now show in Firebase.'),
      (error) => console.log('Silent data save FAILED:', error)
    );
  }

  fetchData() {
    this.db.fetchData(this.token).subscribe(
      (response) => console.log('Silent data fetch successful.\nData on site should now match Firebase.'),
      (error) => {
        console.log('Silent data fetch FAILED:', error);
        this.errorHandler(error);
      }
    );
  }

  errorHandler(error) {
    switch (error.status) {
      case 401:
        // implement a model instead of an alert box for every alert box.
        // Also, let people wait and not delete session if there's something they want to save
        alert('Session appears to have expired.\nPlease log back in to continue.');
        this.deleteSession();
        break;
      default:
        console.log('This error is unhandled. Please implement a handler for errorCode '
                    + error.statusCode + ':' +  error.json().error + ' in localDataService');
        alert('Something went very wrong. Please reload and try again.\nSorry :(');
    }
  }

  deleteSession() {
    this.tokenSubj.next(null);
    this.userSubj.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.token != null;
  }

  onAuthSuccess() {
    this.fetchData();
    this.router.navigate(['/recipes']);
  }
}
