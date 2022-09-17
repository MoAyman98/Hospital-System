import { Component, OnInit } from '@angular/core';
import { specilizations } from '../_models/specilizations';
import { SpecilizationService } from '../_services/specilization.service';

@Component({
  selector: 'app-specilizations',
  templateUrl: './specilizations.component.html',
  styleUrls: ['./specilizations.component.css']
})
export class SpecilizationsComponent implements OnInit {
  specs: specilizations[];

  constructor(private specilizationService: SpecilizationService) { }

  ngOnInit(): void {
    this.loadSpecs();
  }

  loadSpecs() {
    this.specilizationService.getSpecilizations().subscribe(specs => {
      this.specs = specs;
    })
  }

}
