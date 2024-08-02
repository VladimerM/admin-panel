import { Component, OnInit, inject } from '@angular/core';
import { AgentCardFilterComponent } from '../agent-card-filter/agent-card-filter.component';
import { AgentCardTableComponent } from '../agent-card-table/agent-card-table.component';
import {
  ManagementService,
  MergedUser,
} from '../../services/management.service';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agent-card',
  standalone: true,
  imports: [
    AgentCardFilterComponent,
    AgentCardTableComponent,
    HttpClientModule,
  ],
  templateUrl: './agent-card.component.html',
  styleUrl: './agent-card.component.scss',
})
export class AgentCardComponent implements OnInit {
  private managementService = inject(ManagementService);
  dataSource: MergedUser[] = [];
  ngOnInit(): void {
    this.managementService
      .getData()
      .pipe(
        tap((value: any) => {
          this.dataSource = value.modifiedData;
        })
      )
      .subscribe();
  }

  filterData() {}
}
