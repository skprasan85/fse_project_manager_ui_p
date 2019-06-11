import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Manager Application';

  constructor(private router: Router) { }
  
  showProject(): void {
    this.router.navigate(['/project'])
  }

  showTask(): void {
    this.router.navigate(['/task'])
  }

  showUser(): void {
    this.router.navigate(['/user'])
  }

  showTaskView(): void {
    this.router.navigate(['/viewTask'])
  }
}
