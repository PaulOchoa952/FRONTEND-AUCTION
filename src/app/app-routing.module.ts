import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarListComponent } from './car-list/car-list.component';
import { AuthGuard } from './auth.guard';
import { CarInfoComponent } from './car-info/car-info.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'carros',component: CarListComponent,canActivate: [AuthGuard] },
  {path:"car-info/:id",component:CarInfoComponent,canActivate: [AuthGuard]},
  {path:"users",component:RegisterPageComponent, canActivate: [AuthGuard]},
  {path:'**',redirectTo:'login'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
