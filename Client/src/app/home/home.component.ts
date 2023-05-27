import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean = false;
  users:any;

  constructor(
    private http:HttpClient
  ){

  }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data:any) => {
        this.users = data;
      },
      error: (e) => {
        console.log(e);
      }
    }) 
  }

  cancelRegisterMode(event: boolean){
    console.log('cancel register mode? ', event);
    
    this.registerMode = event;
  }

}