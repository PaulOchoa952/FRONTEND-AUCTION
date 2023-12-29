import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-initSubasta-modal',
  templateUrl: './initSubasta-modal.component.html',
  styleUrls: ['./initSubasta-modal.component.css'],
  providers: [DatePipe],
})
export class InitSubastaModalComponent {
  public new = false;
  public carroId = '';
  public modelo = '';
  public color = '';
  public precio = '';
  public descripcion = '';
  public img = '';
  showOptions = false;

  // Selecciona la fecha actual
  today = new Date();
  selected = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );
  // Selecciona la fecha mínima para la subasta que es el dia siguiente
  minDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );
  // Selecciona la fecha máxima para la subasta que es un año
  maxDate = new Date(
    this.today.getFullYear() + 1,
    this.today.getMonth(),
    this.today.getDate()
  );

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  // Método para formatear la fecha
  formatDate(date: Date): string {
    // Usa el DatePipe para formatear la fecha como "dd/MM/yyyy"
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  constructor(
    public dialogRef: MatDialogRef<InitSubastaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv,
    private datePipe: DatePipe
  ) {
    this.new = data.new;
    this.carroId = data.carId;
    this.modelo = data.modelo;
    this.color = data.color;
    this.precio = data.precio;
    this.descripcion = data.descripcion;
    this.img = data.img;
    console.log(this.carroId);

  }

  public createSubasta() {
    console.log(this.carroId);
    const data = {
      idCarro : this.carroId,
      fechaFin : this.selected
    };
    this.apiProv.createSubasta(data).then((res) => {
      if (res) {
        Swal.fire({
          title: 'Subasta creada',
          text: 'El Carro se ha colocado en subasta',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.Onclose();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al subastar el carro',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }

  Onclose(): void {
    this.dialogRef.close();
  }
}