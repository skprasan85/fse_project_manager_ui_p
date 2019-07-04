import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { IViewTask } from '../view-task/view-task';
import { DatePipe } from '@angular/common';
import { IParent } from './parent-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  isEdit: boolean = false;
  isParent: boolean = false;
  tasks: IViewTask[] = [];
  task: IViewTask = new IViewTask();
  parent: IParent = new IParent();
  userName: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: AppService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log("task Id : " + taskId);
    if(!(taskId == null)){
      this.isEdit = true;
      this.taskService.getViewTask().subscribe(
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

  saveTask(taskData: IViewTask) {
    this.task = taskData;

    if (this.isParent) {
      this.parent.parentTask = this.task.taskName;

      this.taskService.addParentTask(this.parent)
        .subscribe(
          save => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                  this.router.navigate(['/task'])); 
          }
        );
        console.log('Parent Task Inserted Successfully')
    } 
      else {
        if(this.isEdit)
        {
          this.task.startDate += 'T04:00:00.000+0000';
          this.task.endDate += 'T04:00:00.000+0000';

          this.taskService.updateTask(this.task)
            .subscribe(
              save => {
                  this.router.navigate(['/viewTask']);
              }
            );
          this.isEdit = false;
          console.log('Task Updated Successfully')
        } else {
          
          this.task.startDate += 'T04:00:00.000+0000';
          this.task.endDate += 'T04:00:00.000+0000';

          this.taskService.addTask(this.task)
            .subscribe(
              save => {
                  this.router.navigate(['/viewTask']);
              }
            );
            console.log('Task Inserted Successfully')
        }
    }
    
  }

  parentTaskEvent(event) {
    this.isParent = !!event.target.checked;
    if (this.isParent) {
      this.errorMessage = undefined;
      this.task.projectId = undefined;
      this.task.projectName = undefined;
      this.task.parentId = undefined;
      this.task.parentTask = undefined;
      this.task.startDate = undefined;
      this.task.endDate = undefined;
      this.task.employeeId = undefined;
      this.task.firstName = undefined;
      this.task.lastName = undefined;
    }
    else {
      this.task.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.task.endDate = this.datePipe.transform(new Date(new Date().getTime() + 86400000), 'yyyy-MM-dd');
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
