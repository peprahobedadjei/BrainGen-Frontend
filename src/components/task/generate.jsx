import { Gradient } from "../design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Profile from "../Profile/Profile";
import { useState, useEffect } from "react";
import Button from "../Button";
import axios from "axios";

const Generate = () => {

  const [userid, setID] = useState("User"); // Default username
  const [models, setModels] = useState([]); // Store available models
  const [selectedModel, setSelectedModel] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numImages, setNumImages] = useState("");
  const [noiseDim, setNoiseDim] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [plotUrl, setPlotUrl] = useState(null);
  const [images, setImages] = useState([]); // Store images in the folder

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      if (userData.user_pseudo_id) setID(userData.user_pseudo_id);
    }
    // Fetch available models
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/generate-models`
        );
        const modelItems = response.data.items
          .filter(
            (item) =>
              item.startsWith("generator_models/") && item.endsWith(".h5")
          )
          .map((item) => item.split("/")[1]); // Extract model filenames
        setModels(modelItems);
      } catch (error) {
        setMessage("Failed to load models.");
        setMessageType("error");
        setTimeout(() => setMessage(null), 5000);
      }
    };

    fetchModels();
  }, [userid]);

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const response = await axios.post(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/${userid}/upload-images`,
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
  const handleCreateFolder = async () => {
    try {
      setIsCreating(true);
      const response = await axios.post(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/${userid}/create-folder`
      );
      setMessage(response.data.message);
      setMessageType(response.data.status === "success" ? "success" : "error");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "An unexpected error occurred while creating the folder."
      );
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsCreating(false);
    }
  };
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleClearMemory = async () => {
    try {
      setIsClearing(true);
      const response = await axios.post(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/clear-memory`
      );
      setMessage(response.data.message);
      setMessageType(response.data.status === "success" ? "success" : "info");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "An unexpected error occurred while clearing memory."
      );
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsClearing(false);
    }
  };

  const handleLoadModel = async () => {
    if (!selectedModel) {
      setMessage("Please select a model to load.");
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
      return;
    }
    try {
      setIsLoadingModel(true);
      const response = await axios.post(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/models/generate-load`,
        {
          model_name: selectedModel,
        }
      );
      setMessage(response.data.message);
      setMessageType("success");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "An unexpected error occurred while loading the model."
      );
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsLoadingModel(false);
    }
  };

  const handleGenerateImages = async () => {
    try {
      setIsGenerating(true);
      const userId = userid; // Replace with dynamic user ID if needed
      const response = await fetch(`https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/generate/models/${userId}/generate-images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_images: parseInt(numImages),
          noise_dim: parseInt(noiseDim),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate images.");
      }

      const data = await response.json();
      setMessage("Images generated successfully.");
      setMessageType("success");
      setTimeout(() => setMessage(null), 5000);
      setGeneratedImages(data.images.map((img) => img.image_url));
      setPlotUrl(data.plot);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadFolder = async () => {
    // if (!selectedFolder) {
    //   setMessage("Please select a folder to load.");
    //   setMessageType("error");
    //   setTimeout(() => setMessage(null), 5000);
    //   return;
    // }
    try {
      setIsLoadingFiles(true);
      const response = await axios.get(
        `https://brainwave-docker-gcr-image-539472932670.europe-west1.run.app/predict/${userid}/list-files`
      );
      setImages(
        response.data.files.map(
          (file) =>
            `https://storage.googleapis.com/the-challenge-433814.firebasestorage.app/users_db/${userid}/${file}`
        )
      );
      setMessage("Images loaded successfully.");
      setMessageType("success");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "An unexpected error occurred while loading the folder."
      );
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsLoadingFiles(false);
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
              {/* Section 2 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
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

              <hr className="border-gray-800 my-4" />
              {/* Section 2 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">View Folder</h2>
                {isLoadingFiles ? (
                  <>
                    <div className="loader text-sm">
                      Laoding Folder.Please wait...
                    </div>
                  </>
                ) : (
                  <Button white onClick={handleLoadFolder}>
                    Load Folder
                  </Button>
                )}
              </div>

              <hr className="border-gray-800 my-4" />

              {/* Section 3 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Model</h2>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  onChange={(e) =>
                    setSelectedModel(`generator_models/${e.target.value}`)
                  }
                >
                  <option value="" disabled selected>
                    Select a model
                  </option>
                  {models.map((model, index) => (
                    <option key={index} value={model}>
                      {model.replace(".h5", "")}
                    </option>
                  ))}
                </select>
                {isLoadingModel ? (
                  <>
                    <div className="loader text-sm">
                      Loading Model. Please wait...
                    </div>
                  </>
                ) : (
                  <Button white onClick={handleLoadModel}>
                    Load Model
                  </Button>
                )}
              </div>
              <hr className="border-gray-800 my-4" />

              {/* Section 4 */}
              <div className="rounded-lg p-4  items-center space-x-4">
                <Button white onClick={handleCreateFolder}>
                  {isCreating ? <>Creating ...</> : <>Create a Folder</>}
                </Button>
                <Button onClick={handleClearMemory}>
                  {isClearing ? (
                    <>Clearing Memory.Please wait...</>
                  ) : (
                    <>Clear Memory</>
                  )}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 mt-10">
              <div className="flex flex-wrap gap-4 justify-center border-dashed border-2 border-gray-800 h-56 p-2">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <div
                      key={index}
                      className="h-48 w-48 bg-gray-300 rounded overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No images loaded. Select a folder and click.
                  </p>
                )}
              </div>
              <h2 className="text-base font-semibold mb-4 justify-center items-center mt-5">
                Generate Images using Gnerative AI
              </h2>
              <div className="flex items-center space-x-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Images
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={numImages}
                    onChange={(e) => setNumImages(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Noise Dimension
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={noiseDim}
                    onChange={(e) => setNoiseDim(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Action
                  </label>

                  <Button white onClick={handleGenerateImages}>
                    {isGenerating ? <>Generating ...</> : <>Start Generating</>}
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center border-dashed border-2 border-gray-800 p-4">
                {generatedImages.length > 0 ? (
                  generatedImages.map((image, index) => (
                    <div
                      key={`generated-${index}`}
                      className="h-48 w-48 bg-gray-300 rounded overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Generated Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No generated images available.
                  </p>
                )}
              </div>
              {plotUrl && (
                <div className="mt-8 mb-8">
                  <h2 className="text-lg font-medium text-gray-800">
                    Generated Plot
                  </h2>
                  <div className="h-80 w-full rounded overflow-hidden mt-2">
                    <img
                      src={plotUrl}
                      alt="Generated Plot"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Section 3: 2 buttons arranged horizontally in the center */}
          </div>
          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default Generate;
