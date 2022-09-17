import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private toast: ToastrService){}

  canActivate(): Observable<boolean> {
    return this.accountService.userRole$.pipe(
      map(role => {
        if (role===1) return true;
        else {
          this.toast.error("Only admin is authorized here");
          return false;
        }
      })
    ) 
  }
  
}
