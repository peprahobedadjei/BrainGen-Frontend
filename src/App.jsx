import { Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Verification from "./components/auth/Verification";
import Task from "./components/task/Task";
import Chat from "./components/task/chat";
import Generate from "./components/task/generate";
import Profile from "./components/Profile/Profile";
import Predict from "./components/task/predict";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/task" element={<Task />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
