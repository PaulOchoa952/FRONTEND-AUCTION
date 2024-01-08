import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root',
})
export class ApiProv {
  url = environment.apiURL;
  //metodo para iniciar sesion
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
  //metodo para obtener los usuarios
  public getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.url}users`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  //metodo para saer si el usuario esta autenticado
  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  //metodo para cerrar sesion
  logout() {
    localStorage.removeItem('token');
  }

  //metodo para registrar un usuario
  register(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users', data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  //metodo para crear un carro
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

  //metodo para actualizar un carro
  updateCarro(carroId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + 'carros/' + carroId, data, {
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

  //metodo para eliminar un carro
  deleteCarro(carroId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .delete(this.url + 'carros/' + carroId, {
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

  //metodo para obtener los carros
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

  //metodo para obtener un carro por su id
  public getCarById(carroId: string): Promise<any> {
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
        .get(`${this.url}carros/${carroId}`, {
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
//metodo para obtener las subastas por id
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
//metodo para obtener las subastas por id
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
  
  //metodo para crear una subasta
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
  //metodo para cerrar una subasta
  public closeSubasta(subastaId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this.url}subastas/${subastaId}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          // Rechazar la promesa con el error
          reject(error);
        });
    });
  }
  //metodo para obtener las subastas activas
  public getSubastasActivas(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      // Verificar si hay un token disponible
      if (!token) {
        // Rechazar la promesa si no hay un token de acceso disponible
        reject('No hay token de acceso disponible');
        return;
      }

      // Realizar una solicitud GET a la API para obtener la información de subastas activas
      axios
        .get(this.url + 'subastas/activa', {
          headers: {
            Authorization: `${token}`, // Incluir el token en el encabezado Authorization
          },
        })
        .then((response) => {
          // Resolver la promesa con los datos de subastas obtenidos de la API
          console.log('hola');
          console.log(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          // Manejar errores y rechazar la promesa con el error correspondiente
          console.error(error);
          reject(error);
        });
    });
  }
//metodo para actualizar una subasta
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

  //metodo para obtener las ofertas de una subasta
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

  //metodo para actualizar un usuario
  updateUser(userId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + 'users/' + userId, data, {
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
}
