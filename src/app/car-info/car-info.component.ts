import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProv } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { InitSubastaModalComponent } from '../initSubasta-modal/initSubasta-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrl: './car-info.component.css'
})
export class CarInfoComponent implements OnInit {
  carId: string | null = null;
  public car: any;

  constructor(private route: ActivatedRoute,private apiProv:ApiProv,private router: Router,
    public dialog:MatDialog,) {
    
  }

  public IniciarSubasta() {
    // Verifica que el carro no este en subasta
    //console.log(this.carId);
    this.apiProv.verfiedSubasta(this.carId!).then((response) => {
      if (response.success) {
        Swal.fire({
          title: 'Error',
          text: 'El carro ya está en subasta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        const dialogRef = this.dialog.open(InitSubastaModalComponent, {
          data: {
            new: true,
            carId: this.carId,
          },
          disableClose: true,
          hasBackdrop: true,
          width: '80%',
          height: '80%',
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          this.getCarById(this.carId);
        });
        
      }
    }).catch((error) => {
      console.error(error);
    });
    
    
  }


    // Método para obtener la información de un carro por su ID
    getCarById(carId: string | null) {
      // Verifica si carId es null antes de intentar hacer la llamada a la API
      if (carId !== null) {
        console.log(carId);
        this.apiProv.getCarById(carId).then((response) => {
          this.car = response.data; // Almacena los datos del carro en la variable car
        }).catch((error) => {
          console.error(error);
        });
      } else {
        console.error('El ID del carro es nulo.');
      }
    }

  ngOnInit(): void {
    // Se obtiene el ID del parámetro de la URL
    this.route.paramMap.subscribe(params => {
      this.carId = params.get('id');
      this.getCarById(this.carId); 
      // Aquí se puede realizar acciones adicionales con el ID si es necesario
    });
    
  }
}