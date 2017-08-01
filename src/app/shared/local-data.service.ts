// handle all localStore ops here
// handle all data to go to localStore here
// all persistent data should go here (anything that should come back on app reload)
// theoretically you can save everything on window.unload but idk if that's the best way rn
// You can publish all your local data to the store located here and then just inject this wherever you want access to
//   that data
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalDataService {
  tokenSubj = new Subject<string>();
  userSubj = new Subject<string>();
  token: string;
  user: string;
  tokSub = new Subscription();
  useSub = new Subscription();

  constructor(private db: DatabaseService){
    this.tokSub = this.tokenSubj.subscribe(
      (token: string) => {
        this.token = token;
        this.store('token', token);
      }
    );

    this.useSub = this.userSubj.subscribe(
      (user: string) => {
        this.user = user;
        this.store('user', user);
      }
    );

    this.findSession();
  }

  // if you get null for user or token, you should make them log in again, not show them the logged in stuff lol
  findSession(){
    let tempTok = this.get('token');
    let tempUse = this.get('user');
    // null values are strings in localStorage, so that's what I'm checking here
    if(tempTok !== 'null' && tempUse !== 'null') {
      this.tokenSubj.next(this.get('token'));
      this.userSubj.next(this.get('user'));
      this.fetchData();
    }
    console.log('my info!\ntoken:', this.token, '\nuser:', this.user);
  }

  store(key: string, value: string){
    window.localStorage.setItem(key, value);
    console.log('Key: ', key, ' successfully stored');
  }

  get(key: string){
    console.log('Retrieving key:', key);
    return window.localStorage.getItem(key);
  }

  // alias to database function
  saveData(){
    this.db.saveData(this.token).subscribe(
      (response) => console.log('Silent data save successful.\nChanges should now show in Firebase.'),
      (error) => console.log('Silent data save FAILED:', error)
    );
  }

  // alias to database function
  fetchData(){
    this.db.fetchData(this.token).subscribe(
      (response) => console.log('Silent data fetch successful.\nData on site should now match Firebase.'),
      (error) => console.log('Silent data fetcH FAILED:', error)
    );
  }
}
