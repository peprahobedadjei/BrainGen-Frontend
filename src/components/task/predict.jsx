import { Gradient } from "../design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Profile from "../Profile/Profile";
import Button from "../Button";

const Predict = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Profile />
          <div className="h-10 mt-5 rounded-lg justify-center items-center bg-red-800">
            all sucess or error messages will show here
          </div>
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-lg">
              {/* Section 1 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Images</h2>
                <div className="flex justify-center items-center w-40 mb-4">
                  <input type="file" multiple className=" rounded p-2" />
                </div>
                <Button white>Upload</Button>
              </div>

              <hr className="border-gray-800 my-4" />

              {/* Section 2 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Folder</h2>
                <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
                  <option value="folder1">Folder 1</option>
                  <option value="folder2">Folder 2</option>
                  <option value="folder3">Folder 3</option>
                </select>
                <Button white>Load Folder</Button>
              </div>
              <hr className="border-gray-800 my-4 w-" />

              {/* Section 3 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Model</h2>
                <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
                  <option value="model1">Model 1</option>
                  <option value="model2">Model 2</option>
                  <option value="model3">Model 3</option>
                </select>
                <Button white>Load Model</Button>
              </div>
              <hr className="border-gray-800 my-4" />

              {/* Section 4 */}
              <div className="rounded-lg p-4 flex flex-col items-center space-y-2">
                <Button white>Create a Folder</Button>
                <Button>Clear Memory</Button>
              </div>
            </div>
            <div className=" lg:col-span-2 mt-10">
              {/* Section 1: 3 image divs arranged horizontally */}
              <div className="flex space-x-5 justify-around mb-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>
              <h2 className="text-base font-semibold mb-4 justify-center items-center">Visual Output using GradCam</h2>
              {/* Section 2: 3 items divs arranged horizontally */}
              <div className="flex space-x-5 justify-around mb-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>

                 {/* Section 2: 3 items divs arranged horizontally */}
                 <div className="flex space-x-5 justify-around mb-4">
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
                <div className="h-48 w-48 bg-gray-300 rounded"></div>
              </div>

              {/* Section 3: 2 buttons arranged horizontally in the center */}
              <div className="flex justify-center space-x-4">
              <Button>Reload Page</Button>
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
