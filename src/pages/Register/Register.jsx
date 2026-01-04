

import { useForm, useWatch, Watch } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import webLogo from "../../assets/national-fast-food-day.avif";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import SocialLogin from "../../components/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const passwordValue = useWatch({ control, name: "password" });

  const handleRegister = async (data) => {
    const profileImage = data.photoURL[0];

    createUser(data.email, data.password, data.displayName)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImage);
        const url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_KEY
        }`;

        axios.post(url, formData).then((res) => {
          const photoURL = res.data?.data?.image.url;
          const updateUser = {
            displayName: data.displayName,
            photoURL: photoURL,
          };

          // create user profile in the database
          const userInfo = {
            displayName: data.displayName,
            email: data.email,
            photoURL: photoURL,
          };

          axiosSecure
            .post("/users", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                console.log("the user is added");
              }
            })
            .catch((error) => {
              console.log(error);
            });

          // update user profile to firebase
          updateUserProfile(updateUser)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your registration have been done. please login",
                showConfirmButton: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.code}`,
        });
      });
  };
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-20 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center border-2 border-gray-50 rounded-2xl">
        <div className=" h-full flex items-center">
          <img src={webLogo} className="h-full rounded-l-2xl" alt="" />
        </div>
        <div className="p-5 rounded-r-2xl bg-white h-full">
          <h3 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-5 text-primary text-center">
            Create an account
          </h3>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* name  */}
              <label className="label text-base font-semibold text-black">
                Name
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Name"
                {...register("displayName", { required: "Name is required" })}
              />
              {errors.displayName && (
                <p className="text-red-400 font-medium">
                  {errors.displayName.message}
                </p>
              )}

              {/* email  */}
              <label className="label text-base font-semibold text-black">
                Email
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
                Password
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

              {/* confirm password  */}
              <label className="label text-base font-semibold text-black">
                Confirm password
              </label>
              <input
                type="password"
                className="input w-full"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Password do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}

              <label className="label text-base font-semibold text-black">
                Upload your photo
              </label>
              <input
                type="file"
                className="file-input file-input-ghost"
                {...register("photoURL", { required: "Photo is required" })}
              />

              {/* register button  */}
              <button className="btn btn-primary text-white mt-4">Register</button>
            </fieldset>
          </form>
          <p className="text-center">
            Already have an account? please{" "}
            <Link to="/login" className="link text-primary">
              Login
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

export default Register;
