import {Component, inject, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MasterService} from '../../core/services/master-service';
import {IDashboard} from '../../core/model/interfaces/User.Model';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  masterService = inject(MasterService)
  dashboardData = signal<IDashboard | null>(null)
  isLoading = signal<boolean>(false)
  errorMessage = signal<string>('')

  ngOnInit() {
    this.loadDashboard()
  }

  loadDashboard() {
    this.isLoading.set(true)
    this.errorMessage.set('')

    this.masterService.getDashboard().subscribe({
      next: (res: IDashboard) => {
        this.dashboardData.set(res)
        this.isLoading.set(false)
      },
      error: () => {
        this.errorMessage.set('No se pudo cargar la informacion del dashboard.')
        this.isLoading.set(false)
      }
    })
  }
}
