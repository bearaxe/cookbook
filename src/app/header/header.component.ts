import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private db: DatabaseService,
              private authService: AuthService) { }

  user = '';

  ngOnInit() {
    this.authService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.user = loggedInUser;
        console.log('updated user to:', this.user);
      }
    );
  }

  onSave(){
    this.db.saveData().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFetch(){
    this.db.fetchData().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onLogout(){
    this.authService.logout();
  }
}
