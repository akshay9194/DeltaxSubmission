import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {
  private apiUrl = 'http://localhost:49793/api/imdb/GetMovieInfo';
  public dataVal: any = {};

  constructor(private http: Http) {
    console.log('Hello');
    this.getData();
    this.getMovies();
   }

  ngOnInit() {
  }

  getData(){
    return this.http.get(this.apiUrl).pipe(map((response: any) => response.json()));
  }

  getMovies(){
      this.getData().subscribe(data => {
        console.log(data);
        this.dataVal = data;
      })
  }

}
