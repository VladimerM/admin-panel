import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from '../../../../../main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { MergedUser } from '../../interfaces/agent-card.interface';
import { Subject } from 'rxjs';
import { AgentAction } from '../../enums/agent-card.enum';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() set data(value: MergedUser[]) {
    this.dataSource = new MatTableDataSource<MergedUser>(value);
    this.dataSource.paginator = this.paginator;
  }

  @Input() onAction: Subject<AgentAction>;

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

  private localStorageService = inject(LocalStorageService);

  ngOnInit() {
    this.onAction.subscribe((value) => this.executeOnAction(value));
  }

  executeOnAction(actionType: AgentAction) {
    switch (actionType) {
      case AgentAction.BAN:
        this.selection.selected.forEach((item) => {
          this.dataSource.data[
            this.dataSource.data.findIndex(
              (dataItem) => dataItem.dataId === item.dataId
            )
          ].status = 'BLOCKED';
        });
        break;
      case AgentAction.UNBAN:
        this.selection.selected.forEach((item) => {
          this.dataSource.data[
            this.dataSource.data.findIndex(
              (dataItem) => dataItem.dataId === item.dataId
            )
          ].status = 'ACTIVE';
        });
    }
    this.localStorageService.updateItem('cardTable', this.dataSource.data);
  }

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
