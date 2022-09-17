import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appointments } from '../_models/appointments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = "http://127.0.0.1:8000/api/";

  constructor(public http: HttpClient, private toast: ToastrService, private router: Router) { }

  getAppointments(id: number) {
    return this.http.get<appointments[]>(this.baseUrl + 'appointments/' + id);
  }

  bookAppointment(appointment) {
    return this.http.
      post(this.baseUrl + 'bookapp/',appointment)
        .subscribe(response => {
          this.toast.success("Booking Saved Successfully");
          this.router.navigateByUrl("/home");
        });
  }
}
