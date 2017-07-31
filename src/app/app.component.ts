import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from './shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDaJrFwcp0tJt6X0GG9MRcTEQiWqPYBUSE",
      authDomain: "ng-cookbook-dd5be.firebaseapp.com",
    });
  }

}
