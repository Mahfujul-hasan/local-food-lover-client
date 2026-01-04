import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((res) => {
        const userInfo = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };
        // console.log(userInfo);

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              console.log("the user is added");
              navigate(location.state || "/");
            }
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              console.log("User already exists, continue login");
              navigate(location.state || "/");
            } else {
              console.log(error);
            }
          });
      })
      .catch((err) => {
        console.log("Google login error:", err);
      });
  };
  return (
    <Link>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white w-full text-black border-[#e5e5e5] hover:border-primary"
      >
        <FcGoogle />
        Login with Google
      </button>
    </Link>
  );
};

export default SocialLogin;