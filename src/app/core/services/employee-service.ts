import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../model/classes/Employee.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Service()
export class EmployeeService {

  http  = inject(HttpClient)

  constructor() {
  }

  onCreateEmployee(obj: EmployeeModel):Observable<EmployeeModel>{
    return this.http.post<EmployeeModel>(environment.API_URL + "CreateEmployee", obj)
  }
}
