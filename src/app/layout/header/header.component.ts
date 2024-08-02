import { Component } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService) {}

  toggleSidebar() {
    // Check if the button click event is registered
    this.sidenavService.toggleSidebar();
    // Check if the visibility state is changing
  }
}
