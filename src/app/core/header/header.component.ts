import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../shared/local-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // neither service is used directly in the template anymore, so now they're both private
  constructor(private localDS: LocalDataService,
              private authService: AuthService) { }

  user = 'failedToGetUser';

  ngOnInit() {
    // Subscribe only nexts on sign in/up but you need this here to update username on logout -> login
    this.localDS.userSubj.subscribe(
      (user: string) => {
        this.user = user;
      }
    );
    // this sets the username if there's user data in localStorage already
    // You need both to cover both ways to populate the username
    this.user = this.localDS.user;
  }

  onSave() {
    this.localDS.saveData();
    // you will need to implement a saveDataAndRespond function to return the observable if you want response abilities
    //   .subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

  onFetch() {
    this.localDS.fetchData();
    // again, you'll need a diffent function that actually returns the observable if you want popups on fetch/save
    //   .subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.localDS.isAuthenticated();
  }
}
