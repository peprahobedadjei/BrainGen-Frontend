import { useState, useEffect, useRef } from "react";
import Heading from "../Heading";
import { Gradient } from "../design/Roadmap";
import Button from "../Button";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import axios from "axios";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modals
  const inputsRef = useRef([]);

  useEffect(() => {
    // Get email from query parameters
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") || ""); // Default to an empty string if no email is found
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digits
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Move to the next input if a value is entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // Check if all boxes are filled
    setIsComplete(newCodes.every((code) => code !== ""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!codes[index] && index > 0) {
        // Move to the previous input if the current one is empty
        inputsRef.current[index - 1].focus();
      }
      const newCodes = [...codes];
      newCodes[index] = ""; // Clear the current box
      setCodes(newCodes);

      // Check if all boxes are filled
      setIsComplete(newCodes.every((code) => code !== ""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(false);

    const verificationCode = codes.join(""); // Combine the digits into a single string

    try {
      const response = await axios.post("https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/auth/activate", {
        email,
        verification_code: verificationCode,
      });

      setSuccessMessage(response.data.message);
      setIsModalOpen(true); // Open the modal on success
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail); // Show backend error message
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Heading
            title="Activate Account 💬!"
            text={`A verification code has been sent to ${email}. Enter your verification code in the boxes below.`}
          />
          <div className="relative flex items-center justify-center">
            <div className="relative z-1 flex flex-col items-center justify-center w-full max-w-lg p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-12 shadow-md">
              <form className="w-full space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>

                {/* Verification Code Input */}
                <div className="flex justify-center gap-2">
                  {codes.map((code, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={code}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
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
                    <div className="loader text-sm">
                      Activating Account. Please wait...
                    </div>
                  </div>
                ) : (
                  isComplete && (
                    <Button white className="w-full" type="submit">
                      Activate Account
                    </Button>
                  )
                )}

                {/* Back to Register */}
                <p className="text-center text-sm text-gray-500">
                  Want to change your email?{" "}
                  <a className="underline" href="/register">
                    Go Back
                  </a>
                </p>
              </form>
            </div>
          </div>
          <Gradient />
          <ButtonGradient />
        </div>
      </div>

      {/* Error or Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-slate-900 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Success!🎉</h2>
            <p>{successMessage}</p>
            <Button className="mt-4" href={"/signin"}>
              Activate Account
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Verification;
