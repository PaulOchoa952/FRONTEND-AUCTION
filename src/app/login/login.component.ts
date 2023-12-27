import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email:string='';
  public password:string='';
  
    constructor(private apiProv:ApiProv){
      if(apiProv.isAuthenticatedUser()){
        console.log('User is already authenticated.');
        window.location.href = '/carros';
      }
    }
  
    public login(){
      console.log("prueba");
      const data = {
        email: this.email,
        password: this.password
      }
      console.log("pasa");
      this.apiProv.login(data).then((response)=>{
        console.log(response);
        if(response.token){
          localStorage.setItem('token',response.token);
          window.location.href = '/carros';
        }
      })
    }
  }
