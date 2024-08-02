import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible);
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidenavService.toggleSidebar(); // Toggle sidebar state
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }
}
