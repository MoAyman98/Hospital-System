import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { loginResponse } from '../_models/loginResponse';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        if(response['message']==='Login Successful') {
          this.toast.success(response['message']);
          this.router.navigateByUrl("/home");
        } else {
          this.toast.error(response['message']);
        }
      },
      error: error => {
        this.toast.error("Incorrect Email or Password");
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
    this.model.username = "";
    this.model.password = "";
  }

}
