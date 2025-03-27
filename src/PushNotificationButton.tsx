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

    const calculateDelay = (endTIme: string) => {
      const now = new Date();
      const [hours, minutes] = endTIme.split(":");
      const end = new Date();
      end.setHours(parseInt(hours, 10));
      end.setMinutes(parseInt(minutes, 10));
      end.setSeconds(0);
      if (end < now) {
        toast.info("The classes are over for today.");
        return -1;
      }

      toast.success(`Notification set to ${end}`);
      // notify 30 minutes before the end of the school day
      const notificationTime =
        end.getTime() - now.getTime() - 30 * 60 * 1000;
      return notificationTime;
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
      className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 transition duration-300"
      onClick={handleNotificationClick}
    >
      {text}
    </button>
  );
};

export default PushNotificationButton;
