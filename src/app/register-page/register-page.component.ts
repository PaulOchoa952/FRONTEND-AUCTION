import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})

export class RegisterPageComponent {
  public new=false;
  public email:string='';
  public password:string='';
  public confirmpassword:string='';
  public name:string='';
  public lastname:string='';
  public userName:string='';

  constructor(private apiProv:ApiProv){
    this.confirmpassword='';
  }
  public register(){
    if(this.password!== this.confirmpassword){
      Swal.fire({
        title:"Error",
        text:'Las contraseñas no coinciden',
        icon:'error',
        confirmButtonText:'Aceptar'
      });
      return;
    }
    const data = {
      userName:this.userName,
      email: this.email,
      password:this.password,
      name:this.name,
      lastName:this.lastname
    }
    this.apiProv.register(data)
    .then((res) => {
      if (res) {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El Usuario ha sido agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        window.location.href = '/login';
      }
      else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear el usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }




}
