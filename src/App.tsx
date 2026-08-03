import "bootstrap/dist/css/bootstrap.min.css"; // back in App now (it left the tree in Lesson 5)
import "./App.css";
import { Outlet } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IStaff } from "./staff/IStaff";

export interface StaffContextType {
  staff: IStaff | undefined;
  setStaff: React.Dispatch<React.SetStateAction<IStaff | undefined>>;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export function useStaffContext(): StaffContextType {
  const staffContext = useContext(StaffContext);
  if (staffContext === undefined) throw new Error("context not found");
  return staffContext;
}

function getPersistedStaff() {
  const staffAsJSON = localStorage.getItem("staff");
  if (!staffAsJSON) return undefined;
  return JSON.parse(staffAsJSON);
}

function App() {
  const [staff, setStaff] = useState<IStaff | undefined>(getPersistedStaff());
  return (
    <StaffContext.Provider value={{ staff, setStaff }}>
      <Toaster
        toastOptions={{
          success: { iconTheme: { primary: "#FF7A00", secondary: "white" } },
          style: { maxWidth: 500 },
        }}
      />

      <Outlet />
    </StaffContext.Provider>
  );
}

export default App;
