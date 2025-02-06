import React from "react";
import "./App.css";
import ClassScheduleComponent from "./ClassScheduleComponent";
import PushNotificationButton from "./PushNotificationButton";
import { ToastContainer } from "react-toastify";

function App() {
  const [schoolDayEndTime, setSchoolDayEndTime] = React.useState<string>("");
  return (
    <div className="flex flex-col justify-center h-screen gap-4 items-center">
      <ClassScheduleComponent setTime={setSchoolDayEndTime} />
      <PushNotificationButton
        notificationTime={schoolDayEndTime}
        text="Get notified when it's time to pick up a kid today"
      />
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={1000}
        closeOnClick
        pauseOnHover
        closeButton={false}
        theme="colored"
        style={{
          height: "50px",
          textAlign: "center",
        }}
      />
    </div>
  );
}

export default App;
