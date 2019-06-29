import { Component, OnInit } from '@angular/core';
import { IProject } from './project';
import { AppService } from '../app.service';

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

  _projectFilter: string;

  get projectFilter(): string {
    return this._projectFilter;
  }
  set projectFilter(value: string) {
    this._projectFilter = value;
    this.filteredProjects = this.projectFilter ? this.performFilter(this.projectFilter) : this.projects;
  }

  constructor(private projectService: AppService) { }
  
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
      project.project.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
}
