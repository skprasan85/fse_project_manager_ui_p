import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log("task Id : " + taskId);

  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    return value;
  }

  
}
