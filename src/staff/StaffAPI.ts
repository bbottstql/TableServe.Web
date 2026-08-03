import { checkStatus, parseJSON } from "../utility/fetchUtilities";
import { IStaff } from "./IStaff";

const url = "http://localhost:5072/api/staff";

export const staffAPI = {
  list(): Promise<IStaff[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
  find(id: number): Promise<IStaff> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(staff: IStaff): Promise<IStaff> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(staff),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(staff: IStaff): Promise<IStaff> {
    return fetch(`${url}/${staff.id}`, {
      method: "PUT",
      body: JSON.stringify(staff),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },

  findByAccount(username: string, password: string): Promise<IStaff> {
    return fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (!response.ok) throw new Error("Login failed"); // wrong credentials → reject
      return response.json();
    });
  },
};
