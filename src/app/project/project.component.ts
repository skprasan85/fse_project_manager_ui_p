import { Component, OnInit } from '@angular/core';
import { IProject } from './project';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  filteredProjects: IProject[];
  projects: IProject[] =[];
  errorMessage: string;
  sortOrder: boolean = false;
  project: IProject = new IProject();
  isEdit: boolean = false;
  managerName: string;

  _projectFilter: string;

  get projectFilter(): string {
    return this._projectFilter;
  }
  set projectFilter(value: string) {
    this._projectFilter = value;
    this.filteredProjects = this.projectFilter ? this.performFilter(this.projectFilter) : this.projects;
  }

  constructor(private projectService: AppService,
              private router: Router,
              private datePipe: DatePipe) { }
  
  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
        this.filteredProjects = this.projects;
      },
      error => this.errorMessage = <any>error
    );
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

    if(this.isEdit)
    {
      this.projectService.updateProject(this.project)
        .subscribe(
          save => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(['/project'])); 
          }
        );
      this.isEdit = false;
      console.log('Project Updated Successfully')
    } else {
      this.projectService.addProject(this.project)
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
    this.managerName = this.project.firstName + ',' + this.project.lastName;
    this.project.projectStartDate = this.datePipe.transform(this.project.projectStartDate, 'yyyy-MM-dd');
    this.project.projectEndDate = this.datePipe.transform(this.project.projectEndDate, 'yyyy-MM-dd');
    console.log('date : '+ this.project.projectStartDate);
    console.log(this.project.projectStartDate + 'T00:00:00.000+0000');
    window.scrollTo(0, 0);
  }

  cancelEdit() {
    this.isEdit = false;
    this.project = new IProject();
    this.managerName = '';
    this.router.navigate(['/project']);
  }
}
