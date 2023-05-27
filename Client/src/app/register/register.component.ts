import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  model:any = {};
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(
    private accountService:AccountService,
  ){

  }

  ngOnInit(): void {
  
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error:(e) => {
        console.log(e);
      }
    })
  }

  cancel(){
    // console.log('cancel');
    this.cancelRegister.emit(false);
  }
}
