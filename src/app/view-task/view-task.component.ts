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

  filteredViewTasks: IViewTask[];
  viewTasks: IViewTask[] = [];
  errorMessage: string;
  sortOrder: boolean = false;

  _viewTaskFilter: string;

  get viewTaskFilter(): string {
    return this._viewTaskFilter;
  }
  set viewTaskFilter(value: string) {
    this._viewTaskFilter = value;
    this.filteredViewTasks = this.viewTaskFilter ? this.performFilter(this.viewTaskFilter) : this.viewTasks;
  }

  constructor(private router: Router,
              private appService: AppService) {
    
  }

  ngOnInit() {
    this.appService.getViewTask().subscribe(
      viewTasks => {
        this.viewTasks = viewTasks;
        this.filteredViewTasks = this.viewTasks;
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string) : IViewTask[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.viewTasks.filter((viewTask: IViewTask) => 
      viewTask.taskName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  sortByStart(){
    if(this.sortOrder)
      this.filteredViewTasks.sort((a,b) => { return <any> new Date(a.startDate) - <any> new Date(b.startDate)} );
    else
    this.filteredViewTasks.sort((a,b) => { return <any> new Date(b.startDate) - <any> new Date(a.startDate)} );
    
    this.sortOrder = !this.sortOrder;
  }

  sortByEnd(){
    if(this.sortOrder)
      this.filteredViewTasks.sort((a,b) => { return <any> new Date(a.endDate) - <any> new Date(b.endDate)} );
    else
    this.filteredViewTasks.sort((a,b) => { return <any> new Date(b.endDate) - <any> new Date(a.endDate)} );
    
    this.sortOrder = !this.sortOrder;
  }

  sortByPriority(){
    if(this.sortOrder)
      this.filteredViewTasks.sort((a,b) => a.priority - b.priority);
    else
      this.filteredViewTasks.sort((a,b) => b.priority - a.priority);
    
    this.sortOrder = !this.sortOrder;
  }

  sortByTask(){
    if(this.sortOrder)
      this.filteredViewTasks.sort((a,b) => a.taskName.localeCompare(b.taskName));
    else
      this.filteredViewTasks.sort((a,b) => b.taskName.localeCompare(a.taskName));
    
    this.sortOrder = !this.sortOrder;
  }

  editTask(taskId) {
    console.log("task : " + taskId);
    this.router.navigate(['/updateTask',taskId])
  }

}
