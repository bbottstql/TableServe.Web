import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IStaff } from "./IStaff";
import { staffAPI } from "./StaffAPI";

const emptyStaff: IStaff = {
  id: undefined,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  username: "",
  isManager: false,
  isAdmin: false,
};

function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStaff>({
    defaultValues: async () => {
      if (!id) return emptyStaff;
      return await staffAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IStaff> = async (staff) => {
    try {
      if (!staff.id) await staffAPI.post(staff);
      else await staffAPI.put(staff);
    } catch (error: any) {
      toast.error(error.message, { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
    navigate("/staff");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-50">
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className={`form-control ${errors?.firstName && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.firstName?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          className={`form-control ${errors?.lastName && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.lastName?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="form-control"
        />
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="form-control"
        />
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username", { required: "Username is required" })}
          className={`form-control ${errors?.username && "is-invalid"}`}
        />
        <div className="invalid-feedback">{errors?.username?.message}</div>
      </div>

      <div className="mb-3 w-100 d-flex gap-3">
        <div className="form-check">
          <input
            id="isManager"
            type="checkbox"
            {...register("isManager")}
            className="form-check-input"
          />
          <label htmlFor="isManager" className="form-check-label">
            Manager
          </label>
        </div>

        <div className="form-check">
          <input
            id="isAdmin"
            type="checkbox"
            {...register("isAdmin")}
            className="form-check-input"
          />
          <label htmlFor="isAdmin" className="form-check-label">
            Admin
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/staff" className="btn btn-outline-primary me-2">
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
          Save staff member
        </button>
      </div>
    </form>
  );
}

export default StaffForm;
