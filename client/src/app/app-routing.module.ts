import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RegisterComponent } from './register/register.component';
import { SpecilizationsComponent } from './specilizations/specilizations.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'', component: RegisterComponent},
  {path:"",
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
    {path:'home', component: SpecilizationsComponent},
    {path:'appointments/:id', component: AppointmentsComponent},
    {path:'bookings', component: BookingsComponent}
  ]
  },
  {path:'**', component: RegisterComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
