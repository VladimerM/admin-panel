import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  ApiModifiedResponse,
  MergedUser,
  User,
  UserData,
} from '../interfaces/agent-card.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private apiUrl =
    'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/';

  constructor(private http: HttpClient) {}

  getData(): Observable<ApiModifiedResponse> {
    return this.http.get<ApiModifiedResponse>(this.apiUrl).pipe(
      map((value) => {
        let modifiedData = value;
        modifiedData.modifiedData = this.mergeUserData(value.users, value.data);
        return modifiedData;
      })
    );
  }

  mergeUserData(users: User[], userData: UserData[]): MergedUser[] {
    const mergedData: MergedUser[] = [];
    let index = 0;
    users.forEach((user) => {
      userData.forEach((data) => {
        index++;
        if (user.id === data.user_id) {
          data.dataId = index;
          mergedData.push({ ...user, ...data });
        }
      });
    });

    return mergedData;
  }
}
