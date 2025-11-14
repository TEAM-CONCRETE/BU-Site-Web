import * as React from "react";
import { formatDate, formatTime } from "@/utils/dateTime";
import {
  getNetworkStatus,
  checkCameraAvailability,
} from "@/utils/deviceStatus";

export function useHeaderState() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState<string>("");
  const [currentTime, setCurrentTime] = React.useState<string>("");
  const [networkStatus, setNetworkStatus] = React.useState<
    "connected" | "disconnected"
  >("connected");
  const [cameraStatus, setCameraStatus] = React.useState<"normal" | "error">(
    "normal"
  );

  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(getNetworkStatus());
    };

    updateNetworkStatus();
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  React.useEffect(() => {
    const checkCamera = async () => {
      const isAvailable = await checkCameraAvailability();
      setCameraStatus(isAvailable ? "normal" : "error");
    };

    checkCamera();
    const interval = setInterval(checkCamera, 30000);

    return () => clearInterval(interval);
  }, []);

  const networkStatusText =
    networkStatus === "connected" ? "네트워크 연결" : "네트워크 끊김";
  const cameraStatusText =
    cameraStatus === "normal" ? "카메라 정상" : "카메라 오류";

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentDate,
    currentTime,
    networkStatus,
    cameraStatus,
    networkStatusText,
    cameraStatusText,
  };
}
