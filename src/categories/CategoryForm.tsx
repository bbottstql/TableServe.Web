import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ICategory } from "./ICategory";
import { categoryAPI } from "./CategoryAPI";

const emptyCategory: ICategory = {
  id: undefined,
  name: "",
  sortOrder: 0,
};

function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    defaultValues: async () => {
      if (!id) return emptyCategory;
      return await categoryAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<ICategory> = async (category) => {
    try {
      if (!category.id) await categoryAPI.post(category);
      else await categoryAPI.put(category);
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
    navigate("/categories");
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
        <label htmlFor="sortOrder" className="form-label">
          Sort Order
        </label>
        <input
          id="sortOrder"
          type="number"
          {...register("sortOrder", {
            valueAsNumber: true,
            required: "Sort order is required",
          })}
          className={`form-control ${errors?.sortOrder && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.sortOrder?.message}</div>
      </div>

      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/categories" className="btn btn-outline-primary me-2">
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
          Save category
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
