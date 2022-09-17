import { Component, OnInit } from '@angular/core';
import { specilizations } from '../_models/specilizations';
import { AccountService } from '../_services/account.service';
import { SpecilizationService } from '../_services/specilization.service';

@Component({
  selector: 'app-specilizations',
  templateUrl: './specilizations.component.html',
  styleUrls: ['./specilizations.component.css']
})
export class SpecilizationsComponent implements OnInit {
  specs: specilizations[];
  role: number;

  constructor(private specilizationService: SpecilizationService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.getUser();
    this.loadSpecs();
  }

  loadSpecs() {
    this.specilizationService.getSpecilizations().subscribe(specs => {
      this.specs = specs;
    })
  }

  getUser() {
    this.accountService.getUser().subscribe(res => {
      this.role = res['role'];
    })
  }

}
