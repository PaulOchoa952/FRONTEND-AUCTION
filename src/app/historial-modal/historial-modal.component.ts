import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial-modal',
  templateUrl: './historial-modal.component.html',
  styleUrls: ['./historial-modal.component.css'],
  providers: [DatePipe],
})
export class HistorialModalComponent implements OnInit {
  public new = false;
  public carroId = '';
  public modelo = '';
  public color = '';
  public precio = '';
  public descripcion = '';
  public img = '';
  showOptions = false;
  public ofertas : any;
  public arrayOfertas: any;

 

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  // Método para formatear la fecha
  formatDate(date: Date): string {
    // Usa el DatePipe para formatear la fecha como "dd/MM/yyyy"
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
  // En tu componente de Angular
trackByOfferId(index: number, oferta: any): string {
  return oferta.idUser; // O cualquier propiedad única de la oferta
}
trackByIndex(index: number, item: any): any {
  return index;
}
trackByFn(index: number, oferta: any): string {
  // Devuelve un identificador único para cada elemento en tu lista.
  // Aquí, asumimos que cada elemento tiene un campo 'id' que puede usarse como identificador.
  return oferta.precioOfertado;  // Ajusta esto según la estructura de tu objeto oferta.
}


  constructor(
    public dialogRef: MatDialogRef<HistorialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv,
    private datePipe: DatePipe
  ) {
    this.ofertas=data;
    
  }
  ngOnInit(): void {
    this.ofertas = this.data;
  
  }


  Onclose(): void {
    this.dialogRef.close();
  }
}