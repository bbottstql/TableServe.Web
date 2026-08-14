import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import bootstrapIcons from "./assets/bootstrap-icons.svg";
import { useStaffContext } from "./App";

function AppNav() {
  const location = useLocation();
  const { staff } = useStaffContext();
  return (
    <Nav
      variant="pills"
      defaultActiveKey={location.pathname}
      as="ul"
      className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-end min-vh-100 position-sticky"
      style={{ width: 280 }}
    >
      {staff?.isAdmin && (
        <>
          <Nav.Item as="li" className="text-secondary fw-bold mb-2">
            Serve
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="/orders" as={Link} to="/orders">
              <svg
                className="bi pe-none me-2"
                width={16}
                height={16}
                fill="currentColor"
              >
                <use xlinkHref={`${bootstrapIcons}#cart`} />
              </svg>
              Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="/menuitems" as={Link} to="/menuitems">
              <svg
                className="bi pe-none me-2"
                width={16}
                height={16}
                fill="currentColor"
              >
                <use xlinkHref={`${bootstrapIcons}#journal-text`} />
              </svg>
              Menu
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="/staff" as={Link} to="/staff">
              <svg
                className="bi pe-none me-2"
                width={16}
                height={16}
                fill="currentColor"
              >
                <use xlinkHref={`${bootstrapIcons}#people`} />
              </svg>
              Staff
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="/categories" as={Link} to="/categories">
              <svg
                className="bi pe-none me-2"
                width={16}
                height={16}
                fill="currentColor"
              >
                <use xlinkHref={`${bootstrapIcons}#tags`} />
              </svg>
              Categories
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      
    </Nav>
  );
}
export default AppNav;
