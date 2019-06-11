import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{path:'', redirectTo:'viewTask', pathMatch:'full'},
                        {path:'project', component: ProjectComponent},
                        {path:'task', component: AddTaskComponent},
                        {path:'user', component: UserComponent},
                        {path:'viewTask', component: ViewTaskComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
