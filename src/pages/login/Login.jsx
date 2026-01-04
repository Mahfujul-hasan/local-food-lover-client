import { useForm } from "react-hook-form";
import webLogo from "../../assets/national-fast-food-day.avif";
import { Link, useLocation, useNavigate } from "react-router";

import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    signInUser(data.email, data.password).then(() => {
      navigate(location.state || "/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your are successfully logged in!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-20 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center border-2 border-gray-50 rounded-2xl">
        <div className="h-full hidden md:flex lg:flex items-center ">
          <img src={webLogo} className="h-full rounded-l-2xl" alt="" />
        </div>
        <div className="p-5  w-[90%] mx-auto">
          <h3 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-5 text-primary text-center">
            Please Login your account
          </h3>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email  */}
              <label className="label text-base font-semibold text-black">
                Your Email
              </label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}

              {/* password  */}
              <label className="label text-base font-semibold text-black">
                Enter Password
              </label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/,
                    message:
                      "Password must include upper, lower, number & special character and at least 6 characters.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-400 font-medium">
                  {errors.password.message}
                </p>
              )}

              {/* forgot password  */}
              <div>
                <Link className="underline text-primary font-bold">
                  Forget password?
                </Link>
              </div>

              {/* login button  */}
              <button className="btn btn-primary mt-4">Login</button>
            </fieldset>
          </form>
          <p className="text-center mt-5">
            Haven't any account? please{" "}
            <Link to="/register" className="link text-primary">
              Register
            </Link>
          </p>
          <div className="divider">or</div>
          <div className="w-full">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
