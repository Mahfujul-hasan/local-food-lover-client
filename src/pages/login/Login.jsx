import React, { use} from "react";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { loginWithGoogle, signInUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignInUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          title: "You have logged in successfully ",
          icon: "success",
          draggable: true,
        });
        navigate("/");
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
        // console.log(res.user);
        Swal.fire({
          title: "You have logged in successfully ",
          icon: "success",
          draggable: true,
        });
        navigate('/')
      })
      .catch((err) => {
        Swal.fire({
          title: `${err.code}`,
          icon: "warning",
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <div className="flex flex-col justify-center items-center ">
            <img className="w-1/3" src={logo} alt="" />
          </div>
          <form onSubmit={(e) => handleSignInUser(e)}>
            <fieldset className="fieldset">
              <label className="label text-black  font-bold">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="label text-black  font-bold">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
          <p>
            <small>
              New to the Website? Please{" "}
              <Link to="/register" className="text-primary">
                register now
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

export default Login;
