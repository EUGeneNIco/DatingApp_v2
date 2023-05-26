import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = 'Dating App';
  users:any;

  constructor(
    private http:HttpClient
  ){

  }

  ngOnInit(): void {
     this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data:any) => {
        this.users = data;
      },
      error: (e) => {
        console.log(e);
      }
     }) 
  }

  

}
