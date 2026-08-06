import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import {IUser} from '../../core/model/interfaces/User.Model';
import {GlobalConstant} from '../../core/globalConstant/Global.constant';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NgClass
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isSidebarExpanded: boolean = true
  loggedUserData!: IUser
  router = inject(Router)

  constructor() {
    const localData = localStorage.getItem(GlobalConstant.LOGIN_LOCAL_KEY)
    if (localData != null){
      this.loggedUserData = JSON.parse(localData)
    }
  }

  onLogOff(){
    localStorage.removeItem(GlobalConstant.LOGIN_LOCAL_KEY)
    this.router.navigate(['login'])
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded
  }
}
