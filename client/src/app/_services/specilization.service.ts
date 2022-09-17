import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { specilizations } from '../_models/specilizations';

@Injectable({
  providedIn: 'root'
})
export class SpecilizationService {
  baseUrl = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  getSpecilizations() {
    return this.http.get<specilizations[]>(this.baseUrl + 'specilizations');
  }
}
