import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { IViewTask } from '../view-task/view-task';
import { DatePipe } from '@angular/common';
import { IParent } from './parent-task';
import { IProject } from '../project/project';
import { IUser } from '../user/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  parentTasks: IParent[] = [];
  parent: IParent = new IParent();
  parentDisplayName: string;
  projects: IProject[] = [];
  project: IProject = new IProject();
  projectDisplayName: string
  users: IUser[] = [];
  user: IUser = new IUser();
  userDisplayName: string;
  errorMessage: string;
  selectedProjectId: number;
  selectedParentTaskId: number;
  selectedUserId: number;
  todayDate: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private datePipe: DatePipe,
              private modalService: NgbModal) { 

    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');

    if(!(taskId == null)){
      this.isEdit = true;
      this.appService.getViewTask().subscribe(
        tasks => {
          this.task = tasks.filter(task => task.id.toLocaleString() == taskId)[0];
          this.task.startDate =  this.datePipe.transform(this.task.startDate, 'yyyy-MM-dd');
          this.task.endDate =  this.datePipe.transform(this.task.endDate, 'yyyy-MM-dd');
          this.projectDisplayName = this.task.projectId + ' - ' + this.task.projectName;          
          this.parentDisplayName = this.task.parentId + ' - ' + this.task.parentTask;          
          this.userDisplayName = this.task.employeeId + ' - ' + this.task.firstName + ' , ' + this.task.lastName;
        },
        error => this.errorMessage = <any>error
      );
    }

    this.appService.getProjects().subscribe(projectFilter => {
      this.projects = projectFilter.filter(project => !project.status);
    });

    this.appService.getUsers().subscribe(userObject => {
      this.users = userObject;
    });

    this.appService.getParentTasks().subscribe(parentObject => {
      this.parentTasks = parentObject;
    });

  }

  saveTask(taskData: IViewTask) {
    this.task = taskData;

    if (this.isParent) {
      this.parent.parentTask = this.task.taskName;

      this.appService.addParentTask(this.parent)
        .subscribe(
          save => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                  this.router.navigate(['/task'])); 
          }
        );
        console.log('Parent Task Inserted Successfully')
    } 
      else {

        if (!this.task.userId || !this.task.projectId) {
          if (!this.task.userId) {
            this.errorMessage = "User is required";
          }
          if (!this.task.projectId) {
            this.errorMessage = "Project is required";
          }
          return false;
        }


        if(this.isEdit)
        {
          this.task.startDate += 'T04:00:00.000+0000';
          this.task.endDate += 'T04:00:00.000+0000';

          this.appService.updateTask(this.task)
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

          this.appService.addTask(this.task)
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
    this.projectDisplayName = '';
    this.parentDisplayName = '';
    this.userDisplayName = '';
    this.router.navigate(['/viewTask']);
  }

  openProjectModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectProject() {
    if (this.selectedProjectId) {
      var project = this.projects.filter(project => project.projectId == this.selectedProjectId)[0];
      this.task.projectId = project.projectId;
      this.errorMessage = undefined;
    }
    this.projectDisplayName = project.projectId + ' - ' + project.projectName;
    this.modalService.dismissAll();
  }

  openParentTaskModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectParentTask() {
    if (this.selectedParentTaskId) {
      var parentTask = this.parentTasks.filter(parentTask => parentTask.parentId == this.selectedParentTaskId)[0];
      this.task.parentId = parentTask.parentId;
      this.errorMessage = undefined;
    }
    this.parentDisplayName = parentTask.parentId + ' - ' + parentTask.parentTask;
    this.modalService.dismissAll();
  }

  openUserModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      if (this.users.filter(user => user.userId == this.task.userId).length === 0) {
        this.task.userId = undefined;
      }
    });
  }

  selectUser() {
    if (!this.selectedUserId) {
      if (this.users.filter(user => user.userId == this.task.userId).length === 0) {
        this.task.userId = undefined;

      }
    } else {
      var user = this.users.filter(user => user.userId == this.selectedUserId)[0];
      this.task.userId = user.userId;
      this.errorMessage = undefined;
    }

    this.userDisplayName = user.employeeId + ' - ' + user.firstName + ' , ' + user.lastName;
    this.modalService.dismissAll();
  }


}
