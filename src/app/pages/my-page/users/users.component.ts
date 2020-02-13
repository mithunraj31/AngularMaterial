import { AddUserDialogComponent } from './../../../dialogs/add-user-dialog/add-user-dialog.component';
import { User } from './../../../models/User';
import { UserService } from './../../../services/UserService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'fName',
    'lName',
    'email',
    'role',
    'actions'
  ];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  progress=false;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private userService: UserService,    public dialog: MatDialog,) { }

  ngOnInit() {
    this.getUserData();
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.progress = true;
        const user: User = result;
        // change concat to replace when using real api
        this.userService.register(user).subscribe(result => {
          this.getUserData();
          console.log(result);
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }

  getUserData(){
    this.progress = true;
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(result);
      this.dataSource.data = this.users;
      this.progress = false;
    }, error=>{
      console.log(error);
      this.progress = false;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
