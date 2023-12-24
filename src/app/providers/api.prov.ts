import {Injectable} from '@angular/core';
import axios from 'axios';
import { environment } from '../../enviroments/enviroment';
@Injectable({
    providedIn: 'root'
})

export class ApiProv {
    url = environment.apiURL;

    login (data:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            axios.post(this.url+'users/login',data).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        })
    }

    isAuthenticatedUser():boolean{
        const token = localStorage.getItem('token');
        return token ? true : false;
    }

    logout(){
        localStorage.removeItem('token');
    }
    register(data:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            axios.post(this.url+'users',data).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        })
    }

    createBook(data:any):Promise<any>{
        const token = localStorage.getItem('token');
        return new Promise((resolve,reject)=>{
           axios.post(this.url+'carros',data,{
            headers: {
                Authorization: token
            }
        }).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.log(error);
        });
           
        });
    }

    updateBook(carId:any,data:any):Promise<any>{
        const token = localStorage.getItem('token');
        return new Promise((resolve,reject)=>{
            axios.put(this.url+'carros/'+carId,data,{
                headers: {
                    Authorization: token
                }
            }).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        });
    }

    deleteBook(carId:any):Promise<any>{
        const token = localStorage.getItem('token');
        return new Promise((resolve,reject)=>{
            axios.delete(this.url+'carros/'+carId,{
                headers: {
                    Authorization: token
                }
            }).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        });
    }


    getCars(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.url+'carros').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}