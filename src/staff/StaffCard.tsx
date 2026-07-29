import { Dropdown } from "react-bootstrap";
import { formatPhoneNumber } from "../utility/formatUtilities";
import { IStaff } from "./IStaff";
import { Link } from "react-router-dom";
import { staffAPI } from "./StaffAPI";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

interface IStaffCardProps {
  staff: IStaff;
  onRemove: (staff: IStaff) => void;
}

function StaffCard({ staff, onRemove }: IStaffCardProps) {
  return (
    
    <div className="card p-4" style={{ width: "23rem" }} key={staff.id}>
       
      <span className="fs-4 fw-medium d-flex">
        {staff.firstName} {staff.lastName}
        <Dropdown className="d-flex ms-4 ps-5">
        <Dropdown.Toggle
          className="btn btn-light"
          style={{ background: "none" }}
        >
          <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
            <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/staff/edit/${staff.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              if (confirm("Delete this staff member?") && staff.id) {
                await staffAPI.delete(staff.id);
                onRemove(staff);
              }
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </span>
      
      <span className="text-secondary">Username: {staff.username}</span>
      <span className="text-secondary">
        Phone: {staff.phone && formatPhoneNumber(staff.phone)}
      </span>
      <span className="text-secondary">Email: {staff.email}</span>
      {staff.isManager && (
        <span className="badge text-bg-primary">Manager</span>
      )}
      {staff.isAdmin && <span className="badge text-bg-dark">Admin</span>}
      
    </div>
  );
}

export default StaffCard;
