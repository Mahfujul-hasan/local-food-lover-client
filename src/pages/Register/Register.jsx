import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { loginWithGoogle, createUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const photoUrl = e.target.photoUrl.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (password !== confirmPassword) {
      Swal.fire({
        title: "please add the same password",
        icon: "warning",
      });
      return;
    }
    if (!passwordPattern.test(password)) {
      Swal.fire({
        title:
          "Password must include at least one uppercase letter, one lowercase letter, and be 6+ characters long.",
        icon: "warning",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const profile = {
          displayName: name,
          photoURL: photoUrl,
        };
        updateProfile(user, profile)
          .then()
          .catch((err) => {
            console.log(err);
          });

        Swal.fire({
          title: "You have registered successfully ",
          icon: "success",
          draggable: true,
        });

        navigate("/login");
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.code}`,
          icon: "warning",
        });
      });

  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        
        navigate(location.state || '/')
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.code}`,
          icon: "warning",
        });
      });
  };


  return (
    <div className="hero bg-base-200 min-h-screen pt-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="flex flex-col justify-center items-center ">
            <img className="w-1/3" src={logo} alt="" />
          </div>
          <form
            onSubmit={(e) => {
              handleRegister(e);
            }}
          >
            <fieldset className="fieldset">
              <label className="label text-black  font-bold">Name</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Enter your name"
              />

              <label className="label text-black  font-bold">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />

              <label className="label text-black  font-bold">Photo URL</label>
              <input
                type="url"
                className="input"
                name="photoUrl"
                placeholder="Add Photo url"
              />

              <label className="label text-black  font-bold">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />

              <label className="label text-black  font-bold">
                confirmPassword
              </label>
              <input
                type="password"
                className="input"
                name="confirmPassword"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <p>
            <small>
              Already have account? Please{" "}
              <Link to="/login" className="text-primary">
                login now
              </Link>{" "}
            </small>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <FcGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
