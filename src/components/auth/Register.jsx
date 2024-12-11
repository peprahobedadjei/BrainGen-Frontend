import { useState } from "react";
import Heading from "../Heading";
import { Gradient } from "../../components/design/Roadmap";
import Button from "../Button";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loader state
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For toggling confirm password visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For success modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous successes
    setLoading(true); // Show loader

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/signup", formData);
      setSuccessMessage(response.data.message);
      setIsModalOpen(true); // Open the modal on success
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
            title="Create An Account 😎!"
            text="Get a BrainGen Account Today"
          />
          <div className="relative flex items-center justify-center">
            <div className="relative z-1 flex flex-col items-center justify-center w-full max-w-lg p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-12 shadow-md">
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                {/* Username */}
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter a Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
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

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm_password" className="sr-only">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Confirm your Password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                {loading ? (
                  <div className="flex justify-center">
                    <div className="loader text-sm">Creating Account.Please wait...</div>
                  </div>
                ) : (
                  <Button white className="w-full" type="submit">
                    Create Account
                  </Button>
                )}

                <p className="text-center text-sm text-gray-500">
                  Have an account?{" "}
                  <a className="underline" href="/signin">
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
          <Gradient />
          <ButtonGradient />
        </div>
      </div>

{/* Success Modal */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-slate-900 p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Success!🎉</h2>
      <p>{successMessage}</p>
      <Button
        className="mt-4"
        href={`/verification?email=${encodeURIComponent(formData.email)}`}
      >
        Activate Account
      </Button>
    </div>
  </div>
)}

    </>
  );
};

export default Register;
