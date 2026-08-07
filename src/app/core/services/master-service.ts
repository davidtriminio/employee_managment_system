import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IApiResponseModel} from '../model/interfaces/User.Model';

@Service()
export class MasterService {
  http = inject(HttpClient)

  getAllParentDept(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + "GetParentDepartment")
  }

  getAllChildDeptByParentId(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + "GetChildDepartmentByParentId?deptId=" + id)
  }
}
