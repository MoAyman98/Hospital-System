import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking } from '../_models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<booking[]>(this.baseUrl + 'bookings');
  }
}
