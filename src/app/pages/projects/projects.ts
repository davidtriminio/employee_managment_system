import {Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectService} from '../../core/services/project-service';
import {IProject, NewProjectModel} from '../../core/model/interfaces/User.Model';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {EmployeeService} from '../../core/services/employee-service';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../../core/model/classes/Employee.model';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule, NgClass, DatePipe, AsyncPipe, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {

  @ViewChild('employeeModal') employeeModal!: ElementRef

  projectForm!: FormGroup
  projectService = inject(ProjectService)
  employeeService = inject(EmployeeService)
  projectList = signal<IProject[]>([])
  projectEmployeeList = signal<any[]>([])

  currentSelectedProjectEmployee: WritableSignal<any> = signal<any[]>([])

  isFormVisible: boolean = false
  isEmployeeModalOpen: boolean = false
  employeeList$: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>()
  currentProjectId: number = 0

  assignEmployeeObj: any = {
    "empProjectId": 0,
    "projectId": 0,
    "empId": 0,
    "assignedDate": "",
    "role": "",
    "isActive": false,
    "projectName": "",
    "employeeName": ""
  }

  constructor() {
    this.initializeForm()
    this.employeeList$ = this.employeeService.getAllEmployees()
  }

  ngOnInit() {
    this.loadProjects()
    this.loadProjectEmployees()
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res: IProject[]) => {
        this.projectList.set(res)
      }
    })
  }

  loadProjectEmployees() {
    this.projectService.getAllProjectEmployee().subscribe({
      next: (res: any) => {
        this.projectEmployeeList.set(res)
        if (this.currentProjectId != 0) {
          this.currentSelectedProjectEmployee.set(this.projectEmployeeList().filter(m => m.projectId == this.currentProjectId))
        }
      }
    })
  }

  initializeForm() {
    this.projectForm = new FormGroup({

      projectId: new FormControl(0),
      projectName: new FormControl(""),
      clientName: new FormControl(""),
      startDate: new FormControl(""),
      leadByEmpId: new FormControl(""),
      contactPerson: new FormControl(""),
      contactNo: new FormControl(""),
      emailId: new FormControl("")

    })
  }

  saveProject() {
    const formValue: NewProjectModel = this.projectForm.value
    this.projectService.createProject(formValue).subscribe({
      next: (res: NewProjectModel) => {
        alert("Project Created Success")
        this.loadProjects()
      }
    })
  }

  assignEmployee() {
    this.projectService.assignEmployee(this.assignEmployeeObj).subscribe({
      next: (res: any) => {
        alert("Employee Assigned to Project")
        this.loadProjectEmployees()
      }
    })
  }


  showFormPanel() {
    this.isFormVisible = !this.isFormVisible
  }

  openEmployeeModal(projectId: number) {
    this.currentProjectId = projectId

    this.assignEmployeeObj.projectId = projectId

    this.currentSelectedProjectEmployee.set(this.projectEmployeeList().filter(m => m.projectId == projectId))

    this.isEmployeeModalOpen = true
    setTimeout(() => {
      console.log(this.employeeModal.nativeElement)
    })
  }

  closeEmployeeModal() {
    this.isEmployeeModalOpen = false
  }
}
