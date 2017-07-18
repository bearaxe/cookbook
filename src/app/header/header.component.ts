import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, Output {
  @Output('togglePage') page = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  goto(data){
      this.page.emit(data);
  }

}
