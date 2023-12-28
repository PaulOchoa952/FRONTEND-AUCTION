import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-initSubasta-modal',
  templateUrl: './initSubasta-modal.component.html',
  styleUrls: ['./initSubasta-modal.component.css']
})
export class InitSubastaModalComponent {
  public new = false;
  public carroId = '';
  public modelo = '';
  public color = '';
  public precio = '';
  public descripcion = '';
  public img='';
  showOptions = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  constructor(
    public dialogRef: MatDialogRef<InitSubastaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv
  ){
    this.new = data.new;
    this.carroId = data.carroId;
    this.modelo = data.modelo;
    this.color = data.color;
    this.precio = data.precio;
    this.descripcion = data.descripcion;
    this.img = data.img;
  }

  public createSubasta() {
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

  

  Onclose(): void {
    this.dialogRef.close();
  }


}
