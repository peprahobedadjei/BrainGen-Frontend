import { Gradient } from "../design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Profile from "../Profile/Profile";

const Predict = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Profile />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-lg">
              {/* Section 1 */}
              <div className="rounded-lg p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Images</h2>

                <input type="file" multiple className="mb-4" />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Upload
                </button>
              </div>

              {/* Section 2 */}
              <div className="rounded-lg  p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Folder</h2>
                <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
                  <option value="folder1">Folder 1</option>
                  <option value="folder2">Folder 2</option>
                  <option value="folder3">Folder 3</option>
                </select>
              </div>

              {/* Section 3 */}
              <div className="rounded-lg  p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Choose Model</h2>
                <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
                  <option value="model1">Model 1</option>
                  <option value="model2">Model 2</option>
                  <option value="model3">Model 3</option>
                </select>
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Load Model
                </button>
              </div>

              {/* Section 4 */}
              <div className="rounded-lg  p-4 flex flex-col items-center">
                <button className="bg-purple-500 text-white px-4 py-2 rounded mb-4">
                  Create a Folder
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Clear Memory
                </button>
              </div>
            </div>
            <div className="h-32 rounded-lg  lg:col-span-2"></div>
          </div>
          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default Predict;
