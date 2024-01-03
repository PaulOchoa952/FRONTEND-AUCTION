import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root',
})
export class ApiProv {
  url = environment.apiURL;

  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users/login', data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
  }
  register(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users', data,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  createCar(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'carros', data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  updateCarro(carId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + 'carros/' + carId, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deleteCarro(carId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .delete(this.url + 'carros/' + carId, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public getCars(): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token'); // Obtener el token de almacenamiento local

      if (!token) {
        // Manejar el caso en el que no hay un token disponible (puedes redirigir al usuario a la página de inicio de sesión, por ejemplo)
        reject('No hay token de acceso disponible');
        return;
      }

      axios
        .get(this.url + 'carros', {
          headers: {
            Authorization: `${token}`, // Incluir el token en el encabezado Authorization
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  public getCarById(carId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      // Verificar si hay un token disponible
      if (!token) {
        // Rechazar la promesa si no hay un token de acceso disponible
        reject('No hay token de acceso disponible');
        return;
      }

      // Realizar una solicitud GET a la API para obtener la información del carro
      axios
        .get(`${this.url}carros/${carId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          // Resolver la promesa con los datos del carro obtenidos de la API
          resolve(response.data);
        })
        .catch((error) => {
          // Manejar errores y rechazar la promesa con el error correspondiente
          console.error(error);
          reject(error);
        });
    });
  }

  public getSubastaById(subastaId: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');
  
      // Verificar si hay un token disponible
      if (!token) {
        // Rechazar la promesa si no hay un token de acceso disponible
        reject('No hay token de acceso disponible');
        return;
      }
  
      // Realizar una solicitud GET a la API para obtener la información de la subasta por su ID
      axios
        .get(`${this.url}subastas/info/${subastaId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          // Resolver la promesa con los datos de la subasta obtenidos de la API
          resolve(response.data);
        })
        .catch((error) => {
          // Manejar errores y rechazar la promesa con el error correspondiente
          console.error(error);
          reject(error);
        });
    });
  }
  

  public verfiedSubasta(carId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      // Verificar si hay un token disponible
      if (!token) {
        // Rechazar la promesa si no hay un token de acceso disponible
        reject('No hay token de acceso disponible');
        return;
      }

      // Realizar una solicitud GET a la API para obtener la información del carro
      axios
        .get(`${this.url}subastas/${carId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          // Resolver la promesa con los datos del carro obtenidos de la API
          // console.log(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          // Manejar errores y rechazar la promesa con el error correspondiente
          console.error(error);
          reject(error);
        });
    });
  }

  public createSubasta(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'subastas', data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }


  public updateSubasta(subastaId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.url}subastas/oferta/${subastaId}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          // Rechazar la promesa con el error
          reject(error);
        });
    });
  }


  public getOfertasBySubastaId(subastaId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      // Verificar si hay un token disponible
      if (!token) {
        // Rechazar la promesa si no hay un token de acceso disponible
        reject('No hay token de acceso disponible');
        return;
      }

      // Realizar una solicitud GET a la API para obtener la información de ofertas de la subasta
      axios
        .get(`${this.url}subastas/ofertas/${subastaId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          // Resolver la promesa con los datos de ofertas obtenidos de la API
          resolve(response.data);
        })
        .catch((error) => {
          // Manejar errores y rechazar la promesa con el error correspondiente
          console.error(error);
          reject(error);
        });
    });
  }

  

}
