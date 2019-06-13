import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private router: Router) {
    
  }

  ngOnInit() {
  }

  updateTask(): void {
    this.router.navigate(['/updateTask'])
  }

}
