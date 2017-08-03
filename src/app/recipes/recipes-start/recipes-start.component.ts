import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../shared/local-data.service';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.css']
})
export class RecipesStartComponent implements OnInit {

  constructor(private localDS: LocalDataService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.localDS.isAuthenticated();
  }

}
