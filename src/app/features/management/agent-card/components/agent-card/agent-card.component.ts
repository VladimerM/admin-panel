import { Component, OnInit, inject } from '@angular/core';
import { AgentCardFilterComponent } from '../agent-card-filter/agent-card-filter.component';
import { AgentCardTableComponent } from '../agent-card-table/agent-card-table.component';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ManagementService } from '../../services/management.service';
import {
  ApiModifiedResponse,
  MergedUser,
} from '../../interfaces/agent-card.interface';
import { AgentAction } from '../../enums/agent-card.enum';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';

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
  private localStorageService = inject(LocalStorageService);
  dataSource: MergedUser[];
  filteredDataSource: MergedUser[] = [];
  onAction: Subject<AgentAction> = new Subject();
  ngOnInit(): void {
    this.managementService
      .getData()
      .pipe(
        tap((value: ApiModifiedResponse) => {
          let localStorageValue: MergedUser[] =
            this.localStorageService.getItem('cardTable');

          if (localStorageValue) {
            localStorageValue.forEach((item) => {
              let itemIndex = value.modifiedData?.findIndex(
                (modifiedItem) => modifiedItem.dataId == item.dataId
              );
              value.modifiedData[itemIndex] = item;
            });
          }

          this.dataSource = value.modifiedData;
          this.filteredDataSource = this.dataSource;
        })
      )
      .subscribe();
  }

  applyFilter(filter) {
    this.filteredDataSource = this.dataSource?.filter((item) => {
      console.log(new Date(item.create_at));

      if (filter.login && item.name !== filter.login) return false;
      if (filter.email && item.email !== filter.email) return false;
      if (filter.phone && item.phone !== filter.phone) return false;
      if (filter.is_admin !== null && item.is_admin !== filter.is_admin)
        return false;
      if (filter.create_at && item.create_at != filter.create_at) return false;
      if (filter.update_at && item.update_at != filter.update_at) return false;
      if (filter.status && item.status !== filter.status) return false;
      return true;
    });
  }

  filterData(filter: any) {
    console.log(filter);

    this.applyFilter(filter);
  }
}
