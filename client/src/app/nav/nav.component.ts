import { Component, OnInit } from '@angular/core';
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

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        // this.toast.success(`Welcome ${this.model.username}`);
        // this.router.navigateByUrl("/home");
      },
      error: error => {
        console.log(error);
        // this.toast.error(error.error.message);
      }
    })
  }

  logout() {
    this.accountService.logout();
    // this.router.navigateByUrl("/");
    this.model.username = "";
    this.model.password = "";
  }

}
