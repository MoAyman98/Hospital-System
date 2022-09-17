import { Component, OnInit } from '@angular/core';
import { booking } from '../_models/booking';
import { AccountService } from '../_services/account.service';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: booking[];
  role: number;

  constructor(private bookingService: BookingService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUser();
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe((res : booking[]) => {
      this.bookings = res;
    })
  }

  getUser() {
    this.accountService.getUser().subscribe(res => {
      this.role = res["role"];
    })
  }

}
