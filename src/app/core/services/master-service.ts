import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IApiResponseModel, IDashboard} from '../model/interfaces/User.Model';
import {GlobalConstant} from '../globalConstant/Global.constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)

  getAllParentDept(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + "GetParentDepartment")
  }

  getAllChildDeptByParentId(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + "GetChildDepartmentByParentId?deptId=" + id)
  }

  getDashboard(): Observable<IDashboard> {
    return this.http.get<IDashboard>(environment.API_URL + GlobalConstant.API_METHOD.GET_DASHBOARD)
  }
}
