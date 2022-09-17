import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { register } from '../_models/register';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: register = {
    name: '',
    email: '',
    password: ''
  };
  confirm : boolean;
  confirmPassword: string = "";

  constructor(private accountService: AccountService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next : response => {
        this.model.name = this.model.email = this.model.password = this.confirmPassword = "";
        if(response['message']!=='Email already exists!') {
          this.toast.success(response['message']);
        } else {
          this.toast.error(response['message']);
        }
      } ,
      error : error => {
        this.toast.error(error[error]);
      }
    })
  }

  compare() {
    if(this.model.password==this.confirmPassword) {
      this.confirm= true;
    }
    else {
      this.confirm= false;
    }
  }

}
