import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  public cars:any=[];
  constructor(private apiProv:ApiProv,
    public dialog:MatDialog,){
      this.getCars();
  }
  public getCars() {
    this.apiProv.getCars().then((response) => {
      this.cars = response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
    // Función para hacer un seguimiento de los elementos en *ngFor
    trackCarId(index: number, car: any): number {
      return car._id; // Suponiendo que `_id` es único para cada libro
    }


  public logout(){
    this.apiProv.logout();
    window.location.href = '/login';
  }

  public deleteBook(book: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar libro: ' + book.titulo + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteBook(book._id)
          .then(
            (res) => {
              Swal.fire({
                title: "Libro Eliminado",
                icon: "success"
              });
              this.getCars();
            }
          );
      }
    });
  }
  
}
