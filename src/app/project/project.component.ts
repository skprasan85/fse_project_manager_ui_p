import { Component, OnInit } from '@angular/core';
import { IProject } from './project';
import { AppService } from '../app.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: IProject[] =[];
  errorMessage: string;

  constructor(private projectService: AppService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => this.errorMessage = <any>error
    );
  }

}
