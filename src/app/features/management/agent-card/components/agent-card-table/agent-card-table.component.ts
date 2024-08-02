import { Component, Input, ViewChild, inject, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from '../../../../../main/main.component';
import { SidenavService } from '../../../../../layout/service/sidenav.service';
import {
  ManagementService,
  MergedUser,
} from '../../services/management.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-agent-card-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './agent-card-table.component.html',
  styleUrl: './agent-card-table.component.scss',
})
export class AgentCardTableComponent {
  @Input() set data(value: MergedUser[]) {
    this.dataSource = new MatTableDataSource<MergedUser>(value);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  private managementService = inject(ManagementService);
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'action',
    'select',
    'email',
    'phone',
    'role',
    'modifiedDate',
    'createDate',
    'status',
    'isEecp',
  ];
  dataSource = new MatTableDataSource<MergedUser>();
  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  selection = new SelectionModel<MergedUser>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row: MergedUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}

export interface PeriodicElement {
  login: string;
  position: number;
  phone: number;
  role: string;
  email: string;
  modifiedDate: string;
  createDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    login: 'Hydrogen',
    phone: 1.0079,
    role: 'H',
    email: 'hello',
    modifiedDate: '2022',
    createDate: '2022',
    status: 'open',
  },
];
