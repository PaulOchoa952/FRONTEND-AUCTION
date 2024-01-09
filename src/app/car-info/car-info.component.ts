import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProv } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { InitSubastaModalComponent } from '../initSubasta-modal/initSubasta-modal.component';
import { HistorialModalComponent } from '../historial-modal/historial-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrl: './car-info.component.css',
})
export class CarInfoComponent implements OnInit {
  carId: string | null = null;
  public car: any;
  public sub: any;
  public subastaId: any;
  public ofertas: any;
  public estadoSubasta: boolean = false;
  public miFormulario: FormGroup;
  private subastaSubscription: Subscription | null = null;
  intervaloActualizacion: any;
  constructor(
    private route: ActivatedRoute,
    private apiProv: ApiProv,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ngZone: NgZone
  ) {
    this.miFormulario = this.formBuilder.group({
      oferta: ['', Validators.required],
      // ... otros campos del formulario
    });
  }

  /**
 * Maneja la presentación de ofertas en una subasta cuando se envía el formulario.
 * Verifica la validez del formulario.
 * Compara la oferta con el precio final actual de la subasta.
 * Si la oferta es válida, realiza la solicitud para actualizar la subasta con la nueva oferta.
 * Muestra mensajes de éxito o error según el resultado de la operación.
 */
  onSubmit() {
    if (this.miFormulario.valid) {
      if (this.miFormulario.value.oferta <= this.sub.precioFinal) {
        Swal.fire({
          title: 'Error',
          text: 'La oferta debe ser mayor al precio actual',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const data = {
          precioOfertado: this.miFormulario.value.oferta,
          subastaId: this.sub._id,
          idUser: localStorage.getItem('idUser'),
        };
        this.apiProv
          .updateSubasta(this.sub._id, data)
          .then((response) => {
            if (response) {
              Swal.fire({
                title: 'Oferta realizada',
                text: 'La oferta se ha realizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
              this.miFormulario.reset();
              this.getSubastaById(this.carId);
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al realizar la oferta',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          })
          .catch((error) => {
            // Manejar el caso de error aquí
            console.error('Error al realizar la oferta:', error);
            Swal.fire({
              title: 'Error',
              text: 'Subasta Cerrada o Fecha de Finalizacion Culminada',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      }

      console.log(this.sub._id);
      console.log(this.miFormulario.value);
    }
  }


  /*
  * Método para cerrar la subasta
  * Verifica que la subasta no esté cerrada
  * Si la subasta no está cerrada, muestra un mensaje de confirmación
  * Si el usuario confirma, realiza la solicitud para cerrar la subasta
  * Muestra un mensaje de éxito o error según el resultado de la operación
  * Actualiza la información de la subasta
  * */
  public IniciarSubasta() {
    // Verifica que el carro no este en subasta
    //console.log(this.carId);
    this.apiProv
      .verfiedSubasta(this.carId!)
      .then((response) => {
        if (response.success) {
          console.log(response);
          if(response.data.estado == "cerrado"){
            Swal.fire({
              title: 'Error',
              text: 'El carro ya fue subastado.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          } else{
            Swal.fire({
              title: 'Error',
              text: 'El carro ya está en subasta.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
          
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Método para cerrar la subasta
  // Verifica que la subasta no esté cerrada
  // Si la subasta no está cerrada, muestra un mensaje de confirmación
  // Si el usuario confirma, realiza la solicitud para cerrar la subasta
  // Muestra un mensaje de éxito o error según el resultado de la operación
  // Actualiza la información de la subasta

  public CerrarSubasta() {
    this.apiProv.closeSubasta(this.subastaId).then((response) => {
      if (response) {
        Swal.fire({
          title: 'Subasta Cerrada',
          text: 'La subasta se ha cerrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.getCarById(this.carId);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al cerrar la subasta',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }

  // Método para ver el historial de ofertas de una subasta
  // Verifica que el carro no esté en subasta
  // Llama a la función getOfertasBySubastaId sin cambios en la estructura
  // Abre el HistorialModalComponent después de cargar las ofertas

  public verHistorial() {
    // Verifica que el carro no esté en subasta
    console.log("nose" + this.subastaId);
  
    // Llama a la función getOfertasBySubastaId sin cambios en la estructura
    this.apiProv.getOfertasBySubastaId(this.subastaId)
      .then((response) => {
        this.ofertas = response.data;
  
        // Abre el HistorialModalComponent después de cargar las ofertas
        const dialogRef = this.dialog.open(HistorialModalComponent, {
          data: this.ofertas,
          disableClose: true,
          hasBackdrop: true,
          width: '80%',
          height: '80%',
        });
      })
      .catch((error) => {
        console.error('Error al obtener ofertas o abrir el historial modal:', error);
      });
  }
  


  // Método para obtener la información de un carro por su ID
  // Verifica si carId es null antes de intentar hacer la llamada a la API
  // Almacena los datos del carro en la variable car
  // Verifica si el carro está en subasta
  // Verifica si la subasta está iniciada o no
  
  getCarById(carId: string | null) {
    // Verifica si carId es null antes de intentar hacer la llamada a la API
    if (carId !== null) {
      this.apiProv
        .getCarById(carId)
        .then((response) => {
          this.car = response.data; // Almacena los datos del carro en la variable car

          // Verifica si el carro está en subasta
          // Verifica si la subasta está iniciada o no
          this.apiProv
            .verfiedSubasta(this.carId!)
            .then((subastaResponse) => {
              this.estadoSubasta = subastaResponse.success;
            })
            .catch((subastaError) => {
              console.error(subastaError);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('El ID del carro es nulo.');
    }
  }


  // Método para obtener la información de una subasta por su ID
  // Verifica si subastaId es null antes de intentar hacer la llamada a la API
  // Almacena los datos de la subasta en la variable sub
  // Almacena el ID de la subasta en la variable subastaId
  
  getSubastaById(subastaId: string | null): void {
    if (subastaId !== null) {
      this.apiProv
        .getSubastaById(subastaId)
        .then((response) => {
          this.ngZone.run(() => {
            this.sub = response.data;
            console.log(response.data._id);
            this.subastaId = response.data._id;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('El ID de la subasta es nulo.');
    }
  }

  
 

  

  ngOnInit() {
    // Se obtiene el ID del parámetro de la URL
    this.route.paramMap.subscribe((params) => {
      this.carId = params.get('id');
      this.getSubastaById(this.carId);
      this.getCarById(this.carId);

      // También se inicia un intervalo de actualización cada 10 segundos
      this.intervaloActualizacion = setInterval(() => {
        this.getSubastaById(this.carId);
        this.getCarById(this.carId);
      }, 5000);
    });
  }
  ngOnDestroy(): void {
    // Desuscribe del observable al destruir el componente para evitar posibles fugas de memoria
    if (this.subastaSubscription) {
      this.subastaSubscription.unsubscribe();
    }
  }
}
