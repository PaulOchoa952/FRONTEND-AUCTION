import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-cars-modal',
  templateUrl: './cars-modal.component.html',
  styleUrls: ['./cars-modal.component.css']
})
export class CarsModalComponent {
  public new = false;
  public carroId = "";
  public modelo = '';
  public color = '';
  public precio = '';
  public descripcion = '';
  public img='';

  constructor(
    public dialogRef: MatDialogRef<CarsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv
  ){

//Validar que exista el id del carro
    if (data.carroId) {
      this.carroId = data.carroId;
    } else {
      console.error('ID del carro no proporcionado en los datos.');
    }
    this.asignarDatos(data);

  }

  //método para asignar los datos al componente
  private asignarDatos(data: any): void {
    if (data.data) {
      // Si existe data.data, utiliza esos datos
      data = data.data;
    }
    // Asignar los datos al componente
    this.new = data.new;
    this.carroId = data.carroId;
    this.modelo = data.modelo;
    this.color = data.color;
    this.precio = data.precio;
    this.descripcion = data.descripcion;
    this.img = data.img;
  
    console.log("Valores asignados al componente:", this);
  }

  public createCar() {
    const data = {
      modelo: this.modelo,
      color: this.color,
      precio: this.precio,
      descripcion: this.descripcion,
      img: this.img
    }
    this.apiProv.createCar(data)
    .then((res) => {
      if (res) {
        Swal.fire({
          title: 'Carro creado',
          text: 'El Carro se ha agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.Onclose();
      }
      else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear el carro',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
    
  }

  public updateCarro(): void {
      // Verifica si carroId es válido antes de intentar la actualización
  if (!this.carroId) {
    console.error('ID del carro no válido');
    return;
  }
    const data = {
      modelo: this.modelo,
      color: this.color,
      precio: this.precio,
      descripcion: this.descripcion,
      img: this.img
    }

    this.apiProv.updateCarro(this.carroId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Carro Actualizado",
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
