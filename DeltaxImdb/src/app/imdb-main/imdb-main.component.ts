import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imdb-main',
  templateUrl: './imdb-main.component.html',
  styleUrls: ['./imdb-main.component.css']
})
export class ImdbMainComponent implements OnInit {

  public isVisibleCreate: boolean = false;
  constructor() { }
  ngOnInit() {
  }
  changeVisibility(){
    if(this.isVisibleCreate)
      this.isVisibleCreate = false;
    else
      this.isVisibleCreate = true;
  }
  refresh(): void {
    window.location.reload();
  }
}
