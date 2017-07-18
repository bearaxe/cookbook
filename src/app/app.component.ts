import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipe:boolean = true;

  updateView(data){
      this.showRecipe = data;
  }
}
