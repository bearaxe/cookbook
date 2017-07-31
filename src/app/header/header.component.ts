import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private db: DatabaseService) { }

  ngOnInit() {
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
}
