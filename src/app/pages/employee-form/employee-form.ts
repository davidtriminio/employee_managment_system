import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EmployeeModel} from '../../core/model/classes/Employee.model';
import {EmployeeService} from '../../core/services/employee-service';
import {MasterService} from '../../core/services/master-service';
import {IApiResponseModel, IChildDept, IParentDept} from '../../core/model/interfaces/User.Model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [
    FormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  employeeObj: EmployeeModel = new EmployeeModel()
  empSrv = inject(EmployeeService)
  masterSrv = inject(MasterService)
  activatedRoute = inject(ActivatedRoute)

  parentDeptList: WritableSignal<IParentDept[]> = signal([])
  childDeptList: WritableSignal<IChildDept[]> = signal([])

  currentEditEmptyId: number = 0

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(res:any) => {
        this.currentEditEmptyId = res.id
        if (this.currentEditEmptyId != 0){
          this.getEmployeeDetails()
        }
      }
    })
    this.getParentDept()
  }

  getParentDept() {
    this.masterSrv.getAllParentDept().subscribe({
      next: (res:IApiResponseModel) => {
        this.parentDeptList.set(res.data)
      }
    })
  }

  getEmployeeDetails(){
    this.empSrv.getEmployeeById(this.currentEditEmptyId).subscribe({
      next:(res:EmployeeModel) => {
        this.employeeObj = res
      }
    })
  }

  onChangeParent(event: any){
    const id= event.target.value
    this.masterSrv.getAllChildDeptByParentId(id).subscribe({
      next:(res:IApiResponseModel) =>{
        this.childDeptList.set(res.data)
      }
    })
  }

  onSaveEmp() {
    this.empSrv.onCreateEmployee(this.employeeObj).subscribe({
      next: (res: EmployeeModel) => {
        alert("Employee Created Success")
      },
    })
  }
}
