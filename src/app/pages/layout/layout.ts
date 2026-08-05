import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';

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

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded
  }
}
