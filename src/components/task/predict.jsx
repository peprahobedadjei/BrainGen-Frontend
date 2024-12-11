import { Gradient } from "../design/Roadmap";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Profile from "../Profile/Profile";

const Predict = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="container">
          <Profile />
          <Gradient />
          <ButtonGradient />
        </div>
      </div>
    </>
  );
};

export default Predict;
