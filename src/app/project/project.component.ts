import { Component, OnInit } from '@angular/core';
import { IProject } from './project';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IUser } from '../user/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  filteredProjects: IProject[];
  projects: IProject[] =[];
  users: IUser[];
  user: IUser = new IUser();
  errorMessage: string;
  sortOrder: boolean = false;
  project: IProject = new IProject();
  isEdit: boolean = false;
  isDateChecked: boolean = false;
  managerName: string;
  selectedManagerId: number;
  todayDate: string;

  _projectFilter: string;

  get projectFilter(): string {
    return this._projectFilter;
  }
  set projectFilter(value: string) {
    this._projectFilter = value;
    this.filteredProjects = this.projectFilter ? this.performFilter(this.projectFilter) : this.projects;
  }

  constructor(private appService: AppService,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: NgbModal) {

      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  
  ngOnInit() {
    this.appService.getProjects().subscribe(
      projects => {
        this.projects = projects;
        this.filteredProjects = this.projects;
      },
      error => this.errorMessage = <any>error
    );

    this.appService.getUsers().subscribe(userModal => {
      this.users = userModal.filter(user => user.manager);
    });

  }

  performFilter(filterBy: string) : IProject[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projects.filter((project: IProject) => 
      project.projectName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  sortByStart(){
    if(this.sortOrder)
      this.filteredProjects.sort((a,b) => { return <any> new Date(a.projectStartDate) - <any> new Date(b.projectStartDate)} );
    else
    this.filteredProjects.sort((a,b) => { return <any> new Date(b.projectStartDate) - <any> new Date(a.projectStartDate)} );
    
    this.sortOrder = !this.sortOrder;
  }

  sortByEnd(){
    if(this.sortOrder)
      this.filteredProjects.sort((a,b) => { return <any> new Date(a.projectEndDate) - <any> new Date(b.projectEndDate)} );
    else
    this.filteredProjects.sort((a,b) => { return <any> new Date(b.projectEndDate) - <any> new Date(a.projectEndDate)} );
    
    this.sortOrder = !this.sortOrder;
  }

  sortByPriority(){
    if(this.sortOrder)
      this.filteredProjects.sort((a,b) => a.projectPriority - b.projectPriority);
    else
      this.filteredProjects.sort((a,b) => b.projectPriority - a.projectPriority);
    
    this.sortOrder = !this.sortOrder;
  }

  sortByCompleted(){
    if(this.sortOrder)
      this.filteredProjects.sort((a,b) => a.completedTasks - b.completedTasks);
    else
      this.filteredProjects.sort((a,b) => b.completedTasks - a.completedTasks);
    
    this.sortOrder = !this.sortOrder;
  }

  saveProject(projectData: IProject) {
    this.project = projectData;

    if (!this.project.userId) {
      this.errorMessage = "Manager is required";
      return false;
    }

    if(this.isEdit)
    {
      this.project.projectStartDate += 'T04:00:00.000+0000';
      this.project.projectEndDate += 'T04:00:00.000+0000';
      
      this.appService.updateProject(this.project)
        .subscribe(
          save => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(['/project'])); 
          }
        );
      this.isEdit = false;
      console.log('Project Updated Successfully')
    } else {
        this.project.projectStartDate += 'T04:00:00.000+0000';
        this.project.projectEndDate += 'T04:00:00.000+0000';

        this.appService.addProject(this.project)
          .subscribe(
            save => {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/project'])); 
            }
          );
          console.log('Project Inserted Successfully')
    }
  }

  editProjectData(projectData) {
    this.project = Object.assign({}, projectData);
    this.isEdit = true;
    this.managerName = this.project.employeeId + ' - ' + this.project.firstName + ' , ' + this.project.lastName;
    this.project.projectStartDate = this.datePipe.transform(this.project.projectStartDate, 'yyyy-MM-dd');
    this.project.projectEndDate = this.datePipe.transform(this.project.projectEndDate, 'yyyy-MM-dd');
    window.scrollTo(0, 0);
  }

  cancelEdit() {
    this.isEdit = false;
    this.project = new IProject();
    this.managerName = '';
    this.router.navigate(['/project']);
  }

  dateSetter(event) {
    this.isDateChecked = !!event.target.checked;
  }

  suspendProject(projectData) {
    this.project = projectData;
    this.project.status = true;
    this.project.projectEndDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') + 'T04:00:00.000+0000';
    this.appService.updateProject(this.project)
      .subscribe(
        save => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/project'])); 
        });
  }



  openSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      if (this.users.filter(user => user.userId == this.project.userId).length === 0) {
        this.project.userId = undefined;
        this.project.firstName = undefined;
        this.project.lastName = undefined;
        this.project.employeeId = undefined;
      }
    });
  }

  selectManager() {
    if (!this.selectedManagerId) {
      if (this.users.filter(user => user.userId == this.project.userId).length === 0) {
        this.project.userId = undefined;
        this.project.firstName = undefined;
        this.project.lastName = undefined;
        this.project.employeeId = undefined;
      }
    } else {
      this.user = this.users.filter(user => user.userId == this.selectedManagerId)[0];
      this.project.userId = this.user.userId;
      this.project.firstName = this.user.firstName;
      this.project.lastName = this.user.lastName;
      this.project.employeeId = this.user.employeeId;
      this.errorMessage = undefined;
    }
    this.managerName = this.project.employeeId + ' - ' + this.project.firstName + ' , ' + this.project.lastName;
    this.modalService.dismissAll();
  }


}
