import Heading from "../Heading";
import { Gradient } from "../design/Roadmap";
import Button from "../Button";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SignIn = () => {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loader state
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        "https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/auth/login",
        formData
      );
      const { data } = response.data;

      // Save success message data to local storage
      localStorage.setItem("userData", JSON.stringify(data));

      // Navigate to /task on successful login
      navigate("/task");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail); // Show backend error message
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Heading
            title="Welcome Back 👋!"
            text="Login Into your BrainGen Account"
          />
          <div className="relative flex items-center justify-center">
            {/* Outer container for the box */}
            <div className="relative z-1 flex flex-col items-center justify-center w-full max-w-lg p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-12 shadow-md">
              {/* Form inside the box */}
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div>
                  <label htmlFor="username_or_email" className="sr-only">
                    Username or Email Address
                  </label>

                  <div>
                    <label htmlFor="username_or_email" className="sr-only">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username_or_email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter a Username or Email Adress"
                        value={formData.username_or_email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                  <a className="underline" href="/register">
                    Activate my Account
                  </a>
                </p>
                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </p>
                )}
                {/* Submit Button */}
                {loading ? (
                  <div className="flex justify-center">
                    <div className="loader text-sm">
                      Authenticating.Please wait...
                    </div>
                  </div>
                ) : (
                  <Button white className="w-full" type="submit">
                    Create Account
                  </Button>
                )}

                <p className="text-center text-sm text-gray-500">
                  No account? {""}
                  <a className="underline" href="/register">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default SignIn;
