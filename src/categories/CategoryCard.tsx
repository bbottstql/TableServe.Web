import { Dropdown } from "react-bootstrap";
import { ICategory } from "./ICategory";
import { Link } from "react-router-dom";
import { categoryAPI } from "./CategoryAPI";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

interface ICategoryCardProps {
  category: ICategory;
  onRemove: (category: ICategory) => void;
}

function CategoryCard({ category, onRemove }: ICategoryCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }} key={category.id}>
      <span className="fs-4 fw-medium d-flex">
        {category.name}
        <Dropdown className="d-flex ms-4 ps-5">
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
            <Dropdown.Item as={Link} to={`/categories/edit/${category.id}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("Delete this category?") && category.id) {
                  await categoryAPI.delete(category.id);
                  onRemove(category);
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </span>

      <span className="text-secondary">Sort Order {category.sortOrder}</span>
    </div>
  );
}

export default CategoryCard;
