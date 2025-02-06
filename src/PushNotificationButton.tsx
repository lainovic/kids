import React from "react";
import { toast } from "react-toastify";

interface PushNotificationButtonProps {
  notificationTime: string;
  text: string;
}

const PushNotificationButton: React.FC<PushNotificationButtonProps> = ({
  notificationTime,
  text,
}) => {
  const timeoutId = React.useRef<number>();
  const handleNotificationClick = () => {
    if (!("Notification" in window)) {
      toast.error("This browser does not support desktop notifications.");
      return;
    }

    const calculateDelay = (notificationTime: string) => {
      const now = new Date();
      const [hours, minutes] = notificationTime.split(":");
      const notification = new Date();
      notification.setHours(parseInt(hours, 10));
      notification.setMinutes(parseInt(minutes, 10));
      notification.setSeconds(0);
      if (notification < now) {
        toast.info("The classes are over for today.");
        return -1;
      }

      toast.success(`Notification set to ${notification}`);
      return notification.getTime() - now.getTime();
    };

    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          if (timeoutId.current) {
            clearTimeout(timeoutId.current);
          }
          const delay = calculateDelay(notificationTime);
          if (delay < 0) {
            return;
          }
          timeoutId.current = setTimeout(() => {
            new Notification("Time to pick up a kid!", {
              icon: "/notification.png",
              body: "Time to pick up a kid!",
            });
          }, delay);
        }
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
      });
  };

  return (
    <button
      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded w-fit shadow"
      onClick={handleNotificationClick}
    >
      {text}
    </button>
  );
};

export default PushNotificationButton;
