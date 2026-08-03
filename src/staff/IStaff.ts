export interface IStaff {
  id: number | undefined;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  username: string;
  password?: string;
  isManager: boolean;
  isAdmin: boolean;
}
