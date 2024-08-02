import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../layout/service/sidenav.service';
import { HeaderComponent } from '../layout/header/header.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AgentCardComponent } from '../features/management/agent-card/components/agent-card/agent-card.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = false;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidenavComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    AgentCardComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  isSidebarVisible = true;
  emailFormControl = new FormControl();

  ngAfterViewInit() {}
  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }
}
