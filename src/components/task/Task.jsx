import Button from "../Button";
import Heading from "../Heading";
import { Gradient } from "../../components/design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import { GradientLight } from "../../components/design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import { useEffect, useState } from "react";

const Task = () => {

  const [username, setUsername] = useState("User"); // Default username

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Set username if data is available
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  const cards = [
    {
      id: "0",
      title: "Tumor Prediction/Analysis",
      text: "Predict the type of tumor (e.g., benign, malignant) from uploaded MRI scans. Single or Multiple",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      url: "/predict",
    },
    {
      id: "1",
      title: "Synthetic Brain Tumor Image Generation",
      text: "Generate high-quality synthetic MRI images of brain tumors.Allow users to customize parameters",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      light: true,
      url: "/generate",
    },
    {
      id: "2",
      title: "Lets Discuss",
      text: "Connect with a BrainGen chatbot which has a database of the latest Brain Tumor Papers to know more.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      url: "/chat",
    },
  ];

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Heading
             title={`Hi ${username}! Let's get Started 🤩`}
            text="Select a task to get started with BrainGen"
          />
          <div className="relative flex items-center justify-center">
            {/* Outer container for the box */}
            <div className="flex flex-wrap gap-10 mb-10">
              {cards.map((item) => (
                <div
                  className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] cursor-pointer"
                  style={{
                    backgroundImage: `url(${item.backgroundUrl})`,
                  }}
                  key={item.id}
                >
                  <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                    <h5 className="h5 mb-5">{item.title}</h5>
                    <p className="body-2 mb-6 text-n-3">{item.text}</p>
                    <div className="flex items-center mt-auto">
                      <Button className="lg:flex" href={item.url}>
                        Select
                      </Button>
                    </div>
                  </div>

                  {item.light && <GradientLight />}

                  <div
                    className="absolute inset-0.5 bg-n-8"
                    style={{ clipPath: "url(#benefits)" }}
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          width={380}
                          height={362}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ClipPath />
          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default Task;
