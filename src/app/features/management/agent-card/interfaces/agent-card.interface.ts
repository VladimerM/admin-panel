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
  dataId: number;
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
  modifiedData: MergedUser[];
}

export interface MergedUser extends User, UserData {}
