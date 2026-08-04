import { Dropdown } from "react-bootstrap";
import { IMenuItem } from "./IMenuItem";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { Link } from "react-router-dom";
import { menuItemAPI } from "./MenuItemAPI";
import toast from "react-hot-toast";

interface IMenuItemCardProps {
  menuItem: IMenuItem;
  onRemove: (menuItem: IMenuItem) => void;
}

function MenuItemCard({ menuItem, onRemove }: IMenuItemCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <div className="d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="no-caret"
            style={{ background: "none" }}
          >
            <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/menuitems/edit/${menuItem.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (
                  confirm("Are you sure you want to delete this menu item?") &&
                  menuItem.id
                ) {
                  try {
                    await menuItemAPI.delete(menuItem.id);
                    onRemove(menuItem); // update parent state
                    toast.success("Successfully deleted.");
                  } catch (error: any) {
                    toast.error(error.message, { duration: 6000 });
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <span className="fs-4 fw-medium">{menuItem.name}</span>
      <span className="fs-5 fw-light">${menuItem.price}</span>
    </div>
  );
}

export default MenuItemCard;
