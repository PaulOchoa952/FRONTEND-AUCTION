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

  /**
 * Realiza el proceso de registro de un nuevo usuario.
 * Verifica que todos los campos obligatorios estén completos.
 * Muestra un mensaje de error si algún campo está vacío.
 * Verifica que las contraseñas coincidan.
 * Muestra un mensaje de error si las contraseñas no coinciden.
 * Envía los datos de registro al servicio de autenticación (apiProv).
 * Muestra mensajes de éxito o error según el resultado del registro.
 * Redirige a la página de inicio de sesión después de un registro exitoso.
 */

  public register(){
    if (!this.email || !this.password || !this.confirmpassword || !this.name || !this.lastname || !this.userName ) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios. Por favor, complete todos los campos antes de guardar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
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
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
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
