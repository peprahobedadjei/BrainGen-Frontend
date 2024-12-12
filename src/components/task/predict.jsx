import { useState, useEffect } from "react";
import axios from "axios";
import { Gradient } from "../design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Profile from "../Profile/Profile";
import Button from "../Button";

const Predict = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  const [isUploading, setIsUploading] = useState(false);
  const [userid, setID] = useState("User"); // Default username

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      if (userData.user_pseudo_id) setID(userData.user_pseudo_id);
    }
  }, []);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const response = await axios.post(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/predict/${userid}/upload-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Use the message from the API response
      setMessage(response.data.message);
      setMessageType(response.data.success ? "success" : "error");
      setTimeout(() => setMessage(null), 5000);
      // Clear the form data after successful upload
      if (response.data.success) {
        setFiles([]);
        document.querySelector('input[type="file"]').value = "";
      }
    } catch (error) {
      // Use error message from the API response or default message
      setMessage(error.response?.data?.error || "An unexpected error occurred");
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Profile />

          {/* Message Display */}
          {message && (
            <div
              className={`h-10 mt-5 rounded-lg flex justify-center items-center text-white text-sm ${
                messageType === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-6">
            <div className="rounded-lg">
              {/* Section 1 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Images</h2>
                <div className="flex justify-center items-center w-40 mb-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="rounded p-2 border border-gray-300"
                  />
                </div>
                {isUploading ? (
                  <>
                    <div className="loader text-sm">
                      Uploading.Please wait...
                    </div>
                  </>
                ) : (
                  <Button white onClick={handleUpload}>
                    Upload
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default Predict;
