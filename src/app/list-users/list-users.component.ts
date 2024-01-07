import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [DatePipe],
})
export class ListUsersComponent {

  public users : any;

  constructor(private apiProv:ApiProv,private router: Router,private datePipe: DatePipe,
    public dialog: MatDialog
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
  public UpdateUserModal(user:any){
      const dialogRef = this.dialog.open(UserModalComponent, {
        data: {
          new: false,
          userId: user._id,
          userName: user.userName,
          email: user.email,
        },
        disableClose: true,
        hasBackdrop: true,
        width: '80%',
        height: '80%',
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        this.getCars();
      });
    }
  }
