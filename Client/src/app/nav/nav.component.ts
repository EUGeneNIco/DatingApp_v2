import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = { };

  constructor(
    public accountService: AccountService
  ){

  }
  
  ngOnInit(): void {
  }

  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  logout(){
    this.accountService.logout();
  }

}
