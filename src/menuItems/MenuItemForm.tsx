import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { IMenuItem } from "./IMenuItem";

import { menuItemAPI } from "./MenuItemAPI";
import { categoryAPI } from "../categories/CategoryAPI";
import toast from "react-hot-toast";
import { ICategory } from "../categories/Icategory";

const emptyMenuItem: IMenuItem = {
  id: undefined,
  name: "",
  price: undefined,
  categoryId: undefined,
  category: {} as ICategory,
};

function MenuItemForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);

  async function loadCategories() {
    setCategories(await categoryAPI.list());
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuItem>({
    defaultValues: async () => {
      await loadCategories(); // dropdown options, either mode
      if (!id) return emptyMenuItem; // Create → blank record
      return await menuItemAPI.find(Number(id)); // Edit → fetch the record
    },
  });

  const save: SubmitHandler<IMenuItem> = async (menuItem) => {
    try {
      delete menuItem.category; // send categoryId, not the embedded object
      if (!menuItem.id)
        await menuItemAPI.post(menuItem); // no id → Create
      else await menuItemAPI.put(menuItem); // has id → Edit
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
      return;
    }
    toast.success("Successfully saved.");
    navigate("/menuitems");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-75">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className={`form-control ${errors?.name && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
            required: "Price is required",
          })}
          className={`form-control ${errors?.price && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.price?.message}</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="categoryId" className="form-label">
          Category
        </label>
        <select
          id="categoryId"
          {...register("categoryId", {
            valueAsNumber: true,
            required: "Category is required",
          })}
          className={`form-select ${errors?.categoryId && "is-invalid"}`}
        >
          <option value="">Select Category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.categoryId?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/menuitems" className="btn btn-outline-primary me-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          <svg
            className="bi pe-none me-2"
            width={16}
            height={16}
            fill="#FFFFFF"
          >
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save menu item
        </button>
      </div>
    </form>
  );
}

export default MenuItemForm;
