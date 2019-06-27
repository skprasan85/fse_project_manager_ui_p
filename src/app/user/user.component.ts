import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];
  errorMessage: string;

  constructor(private userService: AppService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => this.errorMessage = <any>error
    );
  }

}
