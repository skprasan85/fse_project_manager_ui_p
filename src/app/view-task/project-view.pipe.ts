import { Pipe, PipeTransform } from '@angular/core';
import { IViewTask } from './view-task';

@Pipe({
  name: 'projectView'
})
export class ProjectViewPipe implements PipeTransform {

  transform(viewTasks: IViewTask[], selectedProjectId: number): any {
    return !selectedProjectId ? viewTasks : viewTasks.filter(task => task.projectId == selectedProjectId);
  }

}
