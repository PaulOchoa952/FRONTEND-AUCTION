import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { CarsModalComponent } from '../cars-modal/cars-modal.component';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  public cars:any=[];
  constructor(private apiProv:ApiProv,private router: Router,
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

  public deleteCarro(carro: any) {
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar libro: ' + carro.modelo + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteCarro(carro._id)
          .then(
            (res) => {
              Swal.fire({
                title: "Carro Eliminado",
                icon: "success"
              });
              this.getCars();
            }
          );
      }
    });
  }
  public newBookModal() {
    const dialogRef = this.dialog.open(CarsModalComponent, {
      data: {
        new: true
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

  public updateBookModal(carro: any) {
    const dialogRef = this.dialog.open(CarsModalComponent, {
      data: {
        new: false,
        carroId: carro._id,
        modelo: carro.titulo,
        color: carro.autor,
        precio: carro.isbn,
        descripcion: carro.descripcion,
        imagenes: carro.imagenes
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

  //funcion para navegar a la info del carro
  carClick(carId: string) {
    this.router.navigate(['/car-info', carId]);
  }

  goToRegister() {
    window.location.href = '/users';
  }
  
}
