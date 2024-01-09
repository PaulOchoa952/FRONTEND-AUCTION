import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email:string='';
  public password:string='';
  
    constructor(private apiProv:ApiProv){
      //validar si el usuario ya esta autenticado
      if(apiProv.isAuthenticatedUser()){
        console.log('User is already authenticated.');
        window.location.href = '/carros';
      }
    }
    //metodo para iniciar sesion
    public login(){

      const data = {
        email: this.email,
        password: this.password
      }

      
      this.apiProv.login(data).then((response)=>{
        console.log(response);
        if(response.token){
          localStorage.setItem('idUser',response.user._id);
          localStorage.setItem('nombre',response.user.userName);
          localStorage.setItem('email',response.user.userEmail);
          localStorage.setItem('token',response.token);
          window.location.href = '/carros';
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrecta.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })
    }
    //metodo para ir a la pagina de registro
    goToRegister() {
      window.location.href = '/users';
      }

  }
