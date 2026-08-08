import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProjectService} from '../../core/services/project-service';
import {IProject, NewProjectModel} from '../../core/model/interfaces/User.Model';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {EmployeeService} from '../../core/services/employee-service';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../../core/model/classes/Employee.model';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule, NgClass, DatePipe, AsyncPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit{
  projectForm!: FormGroup
  projectService = inject(ProjectService)
  employeeService = inject(EmployeeService)
  projectList = signal<IProject[]>([])
  isFormVisible:boolean = false
  employeeList$: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>()

  constructor() {
    this.initializeForm()
    this.employeeList$ = this.employeeService.getAllEmployees()
  }

  ngOnInit() {
    this.loadProjects()
  }

  loadProjects(){
    this.projectService.getAllProjects().subscribe({
      next:(res:IProject[]) => {
        this.projectList.set(res)
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

  saveProject(){
    const formValue: NewProjectModel = this.projectForm.value
    this.projectService.createProject(formValue).subscribe({
      next:(res: NewProjectModel) => {
        alert("Project Created Success")
        this.loadProjects()
      }
    })
  }

  showFormPanel(){
    this.isFormVisible = !this.isFormVisible
  }
}
