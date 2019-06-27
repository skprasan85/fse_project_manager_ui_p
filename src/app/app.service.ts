import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { IViewTask } from './view-task/view-task';
import { IProject } from './project/project';
import { IUser } from './user/user';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  private viewProjectUrl = 'api/project.json';
  private viewUserUrl = 'api/user.json';
  private viewTaskUrl = 'api/task.json';

  constructor(private http: HttpClient){}

  getProjects(): Observable<IProject[]> {
      return this.http.get<IProject[]>(this.viewProjectUrl).pipe(
          tap(data => console.log('All : ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.viewUserUrl).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  getViewTask(): Observable<IViewTask[]> {
      return this.http.get<IViewTask[]>(this.viewTaskUrl).pipe(
          tap(data => console.log('All : ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }


  private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occured: ${err.error.message}`;
      } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
  }

}
