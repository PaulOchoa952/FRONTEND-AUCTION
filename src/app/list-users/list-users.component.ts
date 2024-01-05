import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [DatePipe],
})
export class ListUsersComponent {

  public users : any;

  constructor(private apiProv:ApiProv,private router: Router,private datePipe: DatePipe
  ){
      this.getCars();
  }

  public getCars() {
    this.apiProv.getUsers().then((response) => {
      this.users = response.data;
    }).catch((error) => {
      console.log(error);
    });
  }

  formatDate(date: Date): string {
    // Usa el DatePipe para formatear la fecha como "dd/MM/yyyy"
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

}
