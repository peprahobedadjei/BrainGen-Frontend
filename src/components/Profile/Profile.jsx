import { brainwave } from "../../assets";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming React Router is used

const Profile = () => {
  const [username, setUsername] = useState("User"); // Default username
  const [email, setEmail] = useState("User@gmail.com"); // Default username
  const [activeTab, setActiveTab] = useState("generate"); // Default active tab
  const currentLocation = useLocation();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      if (userData.username) setUsername(userData.username);
      if (userData.email) setEmail(userData.email);
    }
  }, []);

  // Set active tab based on current URL
  useEffect(() => {
    const path = currentLocation.pathname;
    if (path.includes("/predict")) setActiveTab("predict");
    else if (path.includes("/chat")) setActiveTab("chat");
    else setActiveTab("generate");
  }, [currentLocation]);

  return (
    <div className="fixed top-3 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm h-20">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        {/* User Info Section */}

        <div className="flex items-center max-lg:py-4">
          <a className="block w-[12rem] xl:mr-8" href="#hero">
            <img src={brainwave} width={190} height={40} alt="BrainGen" />
          </a>
        </div>
        {/* Center Navigation */}
        <div className="flex items-center space-x-6">
          <a
            href="/generate"
            className={`text-sm font-medium ${
              activeTab === "generate" ? "text-blue-600" : "text-n-1/50"
            } hover:text-blue-600`}
          >
            Generate Images
          </a>
          <a
            href="/predict"
            className={`text-sm font-medium ${
              activeTab === "predict" ? "text-blue-600" : "text-n-1/50"
            } hover:text-blue-600`}
          >
            Make a Preiction
          </a>
          <a
            href="/chat"
            className={`text-sm font-medium ${
              activeTab === "chat" ? "text-blue-600" : "text-n-1/50"
            } hover:text-blue-600`}
          >
            Chat with BrainGen
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg" // Replace with a valid image path or user avatar URL
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">{username}</p>
            <p className="font-medium">{email}</p>
            <p className="text-red-600">LogOut </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
