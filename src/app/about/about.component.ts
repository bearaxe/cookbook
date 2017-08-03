import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  todo= [
    'Make a profile page',
    'Add profile data to firebase',
    'Add which profile submitted a recipe to recipe detail',
    'Add private/public field to recipe detail',
    'Only display public recipes when not logged in',
    'Only display your profile\'s private recipes when logged in',
  ];

  constructor() { }

  ngOnInit() {
  }

}
