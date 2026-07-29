export interface IStaff {
  id: number | undefined;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  username: string;
  isManager: boolean;
  isAdmin: boolean;
}