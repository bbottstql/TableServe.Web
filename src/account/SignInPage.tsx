import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { staffAPI } from "../staff/StaffAPI";
import { useStaffContext } from "../App";
import { IStaff } from "../staff/IStaff";

interface IAccount {
  username: string;
  password: string;
}

function persistStaff(staff: IStaff) {
  localStorage.setItem("staff", JSON.stringify(staff));
}

function SignInPage() {
  const navigate = useNavigate();
  const { setStaff } = useStaffContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccount>({
    defaultValues: async () => ({ username: "", password: "" }),
  });

  const signin: SubmitHandler<IAccount> = async (account) => {
    try {
      const { password: _, ...safeStaff } = await staffAPI.findByAccount(
        account.username,
        account.password,
      );
      persistStaff(safeStaff as IStaff); // localStorage
      setStaff(safeStaff as IStaff); // context
      navigate("/orders");
    } catch (error: any) {
      toast.error("Unsuccessful sign in. Please try again.");
    }
  };

  return (
    <main className="signin d-flex flex-column gap-4 justify-content-center align-items-center">
      <svg
        width={100}
        height={78}
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#FF7A00" />
        <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#FF9736" />
        <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#FFBC7D" />
      </svg>
      <span className="mx-2 fw-semibold" style={{ color: "#FF7A00" }}>
        TableServe
      </span>

      <div className="card w-25 p-4">
        <h4 className="card-title">Sign in</h4>
        <form className="d-flex flex-column" onSubmit={handleSubmit(signin)}>
          <div className="mb-3">
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
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`form-control ${errors?.password && "is-invalid"}`}
            />
            <div className="invalid-feedback">{errors?.password?.message}</div>
          </div>
          <div className="mb-4 form-text">
            <a href="#">Forgot It?</a>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignInPage;
