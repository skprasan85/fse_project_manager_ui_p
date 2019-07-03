import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { IViewTask } from '../view-task/view-task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  isEdit: boolean = false;
  tasks: IViewTask[] = [];
  task: IViewTask = new IViewTask();
  userName: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log("task Id : " + taskId);
    if(!(taskId == null)){
      this.isEdit = true;
      this.appService.getViewTask().subscribe(
        tasks => {
          this.task = tasks.filter(task => task.id.toLocaleString() == taskId)[0];
          this.task.startDate =  this.datePipe.transform(this.task.startDate, 'yyyy-MM-dd');
          this.task.endDate =  this.datePipe.transform(this.task.endDate, 'yyyy-MM-dd');
          this.userName = this.task.firstName + ',' + this.task.lastName;
        },
        error => this.errorMessage = <any>error
      );
    }

  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    return value;
  }

  cancelEdit() {
    this.isEdit = false;
    this.userName = '';
    this.router.navigate(['/viewTask']);
  }
}
