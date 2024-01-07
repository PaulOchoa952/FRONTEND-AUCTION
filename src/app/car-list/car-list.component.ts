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
  selectedOption = "option1";

  public cars:any=[];
  public carsSubastados:any=[];
  constructor(private apiProv:ApiProv,private router: Router,
    public dialog:MatDialog,){
      this.getCars();
      this.getCarrosSubastados();
  }

  public getCarrosSubastados() {
    this.apiProv.getSubastasActivas().then((response) => {
      this.carsSubastados = response.data;
    }).catch((error) => {
      console.log(error);
    });
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
      title: '¿Desea eliminar Carro: ' + carro.modelo + ' ?',
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
        modelo: carro.modelo,
        color: carro.color,
        precio: carro.precio,
        descripcion: carro.descripcion,
        img : carro.img
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

  userClick() {
    this.router.navigate(['/list-users']);
  }

  goToRegister() {
    window.location.href = '/users';
  }
  
}
