import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IViewTask } from './view-task';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  viewTasks: IViewTask[] = [];
  errorMessage: string;

  constructor(private router: Router,
              private appService: AppService) {
    
  }

  ngOnInit() {
    this.appService.getViewTask().subscribe(
      viewTasks => {
        this.viewTasks = viewTasks;
      },
      error => this.errorMessage = <any>error
    );
  }

  updateTask(): void {
    this.router.navigate(['/updateTask'])
  }

}
