import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { IViewTask } from './view-task/view-task';
import { IProject } from './project/project';
import { IUser } from './user/user';
import { IParent } from './add-task/parent-task';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private serviceURL = 'http://localhost:8070/api/projectManager'

  constructor(private http: HttpClient){}

  getProjects(): Observable<IProject[]> {

      return this.http.get<IProject[]>(`${this.serviceURL}/findAllProjects`, httpOptions).pipe(
          tap(data => console.log('All : ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  addProject(project: IProject): Observable<IProject> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IProject>(`${this.serviceURL}/addProject`, project).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  updateProject(project: any): Observable<IProject> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IProject>(`${this.serviceURL}/updateProject`, project, httpOptions).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.serviceURL}/findAllUsers`).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  addUser(user: IUser): Observable<IUser> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IUser>(`${this.serviceURL}/addUser`, user).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  updateUser(user: any): Observable<IUser> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IUser>(`${this.serviceURL}/updateUser`, user, httpOptions).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  deleteUser(userId: any): Observable<any> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.delete(`${this.serviceURL}/deleteUser/${userId}`, httpOptions).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  getViewTask(): Observable<IViewTask[]> {
      return this.http.get<IViewTask[]>(`${this.serviceURL}/findAllTasks`).pipe(
          tap(data => console.log('All : ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  addTask(task: IViewTask): Observable<IViewTask> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IViewTask>(`${this.serviceURL}/addTask`, task).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  updateTask(task: any): Observable<IViewTask> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IViewTask>(`${this.serviceURL}/updateTask`, task, httpOptions).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  addParentTask(parentTask: IParent): Observable<IParent> {

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post<IParent>(`${this.serviceURL}/addParentTask`, parentTask).pipe(
        tap(data => console.log('All : ' + JSON.stringify(data))),
        catchError(this.handleError)
    );  
  }

  getParentTasks(): Observable<IParent[]> {
    return this.http.get<IParent[]>(`${this.serviceURL}/getParentList`).pipe(
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
