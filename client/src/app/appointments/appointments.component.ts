import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appointments } from '../_models/appointments';
import { AppointmentService } from '../_services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: appointments[];
  id:any;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAppointments(this.id).subscribe(app =>{
      this.appointments = app;
    })
  }

}
