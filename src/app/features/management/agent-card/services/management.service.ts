import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private apiUrl =
    'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/';

  constructor(private http: HttpClient) {}

  mergeUserData(users: User[], userData: UserData[]): MergedUser[] {
    const mergedData: MergedUser[] = [];

    users.forEach((user) => {
      userData.forEach((data) => {
        if (user.id === data.user_id) {
          mergedData.push({ ...user, ...data });
        }
      });
    });

    return mergedData;
  }
  getData(): Observable<ApiModifiedResponse> {
    return this.http.get<ApiModifiedResponse>(this.apiUrl).pipe(
      map((value) => {
        let modifiedData = value;
        modifiedData.modifiedData = this.mergeUserData(value.users, value.data);
        return modifiedData;
      })
    );
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  create_at: number;
  update_at: number;
}

export interface UserData {
  user_id: number;
  is_admin: boolean;
  is_ecp: boolean;
  status: string;
}

export interface Page {
  total: number;
  current: number;
  size: number;
}

export interface ApiResponse {
  page: Page;
  users: User[];
  data: UserData[];
}

export interface ApiModifiedResponse extends ApiResponse {
  modifiedData?: MergedUser[];
}

export interface MergedUser extends User, UserData {}
