import { IStaff } from "./IStaff";

const url = "http://localhost:5072/api/staff";

export const staffAPI = {
  list(): Promise<IStaff[]> {
    return fetch(url).then((response) => response.json());
  },
    delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" });
    },
       find(id: number): Promise<IStaff> {
     return fetch(`${url}/${id}`).then((response) => response.json());
   },
   post(staff: IStaff): Promise<IStaff> {
     return fetch(url, {
       method: "POST",
       body: JSON.stringify(staff),
       headers: { "Content-Type": "application/json" },
     }).then((response) => response.json());
   },
   put(staff: IStaff): Promise<IStaff> {
     return fetch(`${url}/${staff.id}`, {
       method: "PUT",
       body: JSON.stringify(staff),
       headers: { "Content-Type": "application/json" },
     }).then((response) => response.json());
   },

};