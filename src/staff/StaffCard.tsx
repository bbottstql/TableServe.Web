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
       <div className="card p-4" style={{ width: '23rem' }}>
      <div className="d-flex justify-content-end">
        <Dropdown className="d-inline">
          <Dropdown.Toggle className="btn btn-light no-caret" style={{ background: 'none' }}>
            <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/staff/edit/${staff.id}`}>Edit</Dropdown.Item>
            <Dropdown.Item as="a" href="#" onClick={async (event) => {
              event.preventDefault();
              if (confirm('Delete this staff member?') && staff.id) {
                await staffAPI.delete(staff.id);
                onRemove(staff);
              }
            }}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
 
      <span className="fs-4 fw-medium">
        {staff.firstName} {staff.lastName}
      </span>
 
      <span className="text-secondary">
        {staff.username}
        <br />
        {formatPhoneNumber(staff.phone)}
        <br />
        {staff.email}
 
        <br />
 
        <span className="d-flex gap-2 mt-2">
          {staff.isManager && <span className="badge text-bg-primary mt-1">Manager</span>}{' '}
          {staff.isAdmin && <span className="badge text-bg-dark mt-1">Admin</span>}
        </span>
      </span>
    </div>
  );
}

export default StaffCard;
