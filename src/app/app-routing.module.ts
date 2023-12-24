import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarListComponent } from './car-list/car-list.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'carros',component: CarListComponent},
  {path:'**',redirectTo:'login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
