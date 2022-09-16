import { Component, OnInit } from '@angular/core';
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
  confirmPassword: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next : response => {
        console.log(response);
        // this.route.navigateByUrl("/home");
        // this.toast.success("Account created successfully")
      } ,
      error : error => {
        // this.toast.error(error.error.title);
        console.log(error);
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
