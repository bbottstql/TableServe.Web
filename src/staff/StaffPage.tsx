import { useEffect, useState } from "react";
import type { IStaff } from "./IStaff";
import { staffAPI } from "./StaffAPI";
import StaffCard from "./StaffCard";
import { Link } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

function StaffPage() {
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);

  async function loadStaff() {
    setLoading(true);
    try {
      const staffData = await staffAPI.list();
      setStaff(staffData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function removeStaff(staffToRemove: IStaff) {
    setStaff((current) => current.filter((s) => s.id !== staffToRemove.id));
  }

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Staff</h2>
        <Link to="/staff/create" className="btn btn-primary">
          <svg
            className="bi pe-none me-2"
            width={32}
            height={32}
            fill="#FFFFFF"
          >
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>Add Staff
        </Link>
      </div>

      <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
        {loading && <p>Loading…</p>}
        {staff.map((staffMember) => (
          <StaffCard
            key={staffMember.id}
            staff={staffMember}
            onRemove={removeStaff}
          />
        ))}
      </section>
    </section>
  );
}

export default StaffPage;
