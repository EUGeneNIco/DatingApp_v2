import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  model:any = {};
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(
    private toastr:ToastrService,
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
        this.toastr.error(e.error);
      }
    })
  }

  cancel(){
    // console.log('cancel');
    this.cancelRegister.emit(false);
  }
}
