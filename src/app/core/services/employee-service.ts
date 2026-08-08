import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../model/classes/Employee.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {GlobalConstant} from '../globalConstant/Global.constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http  = inject(HttpClient)

  constructor() {
  }

  getAllEmployees():Observable<EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_EMPLOYEE)
  }

  getEmployeeById(ID: number):Observable<EmployeeModel>{
    return this.http.get<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.GET_EMPLOYEE_BY_ID + ID)
  }

  onCreateEmployee(obj: EmployeeModel):Observable<EmployeeModel>{
    return this.http.post<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.CREATE_EMPLOYEE, obj)
  }
}
