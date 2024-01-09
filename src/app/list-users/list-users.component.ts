import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [DatePipe],
})
export class ListUsersComponent {

  public users : any;

  constructor(private apiProv:ApiProv,private router: Router,private datePipe: DatePipe,
    public dialog: MatDialog
  ){
      this.getCars();
  }

  public getCars() {
    this.apiProv.getUsers().then((response) => {
      this.users = response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
  formatDate(date: Date): string {
    // Usa el DatePipe para formatear la fecha como "dd/MM/yyyy"
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  /**
 * Abre un cuadro de diálogo modal para la actualización de información de un usuario.
 * - Objeto que contiene la información del usuario a actualizar.
 *                Se pasa como datos al componente UserModalComponent.
 *                Debe contener propiedades como _id, userName y email.
 *                El modal se abre con la información del usuario para su edición.
 *                Después de cerrarse el modal, actualiza la lista de usuarios llamando a getCars().
 */
  public UpdateUserModal(user:any){
      const dialogRef = this.dialog.open(UserModalComponent, {
        data: {
          new: false,
          userId: user._id,
          userName: user.userName,
          email: user.email,
        },
        disableClose: true,
        hasBackdrop: true,
        width: '80%',
        height: '80%',
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        this.getCars();
      });
    }

    /**
     * Abre un cuadro de diálogo modal para la creación de un nuevo usuario.
     * - Objeto que contiene la información del usuario a crear.
     *                Se pasa como datos al componente UserModalComponent.
     *                Debe contener propiedades como userName y email.
     *                El modal se abre vacío para la creación del usuario.
     *                Después de cerrarse el modal, actualiza la lista de usuarios llamando a getCars().
     */
    public deleteUser(user: any) {
      Swal.fire({
        showCancelButton: true,
        title: '¿Desea eliminar el usuario: ' + user.userName + ' ?',
        confirmButtonText: "Confirmar",
        cancelButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiProv.deleteUser(user._id)
            .then(
              (res) => {
                Swal.fire({
                  title: 'Eliminado',
                  text: 'Usuario eliminado correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.getCars();
              }
            )
            .catch(
              (err) => {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo eliminar el usuario.',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            );
        }
      });
    }
  }
