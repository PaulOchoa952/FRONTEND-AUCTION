import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {
  public new = false;
  public userId = "";
  public userName = '';
  public email = '';

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv
  ){
    this.new = data.new;
    this.userId = data.userId;
    this.userName = data.userName;
    this.email = data.email;
  }


  /**
 * Actualiza la información de un usuario con los datos proporcionados.
 * Utiliza el servicio apiProv para enviar la solicitud de actualización al servidor.
 * Muestra un mensaje de éxito si la actualización se realiza correctamente.
 * Cierra algún tipo de ventana o modal después de la actualización.
 */


  public updateUser(): void {
    const data = {
      userId:this.userId,
      userName: this.userName,
      email: this.email,
    }
    this.apiProv.updateUser(this.userId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Usuario Actualizado",
            icon: "success"
          });
          this.Onclose()
        }
      }
    );
  }
  Onclose(): void {
    this.dialogRef.close();
  }
}

