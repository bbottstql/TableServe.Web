import { Dropdown } from "react-bootstrap";
import { IMenuItem } from "./IMenuItem";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { Link } from "react-router-dom";

interface IMenuItemCardProps {
  menuItem: IMenuItem;
}

function MenuItemCard({ menuItem }: IMenuItemCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
               <div className="d-flex justify-content-end">
         <Dropdown>
           <Dropdown.Toggle className="btn btn-light" style={{ background: "none" }}>
             <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
               <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
             </svg>
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item as={Link} to={`/menuitems/edit/${menuItem.id}`}>Edit</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
       </div>

      <span className="fs-4 fw-medium">{menuItem.name}</span>
      <span className="fs-5 fw-light">${menuItem.price}</span>
    </div>
  );
}

export default MenuItemCard;