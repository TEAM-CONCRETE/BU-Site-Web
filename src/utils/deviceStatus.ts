export async function checkCameraAvailability(): Promise<boolean> {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return false;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasVideoInput = devices.some(
      (device) => device.kind === "videoinput"
    );

    if (!hasVideoInput) {
      return false;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    stream.getTracks().forEach((track) => track.stop());

    return true;
  } catch {
    return false;
  }
}

export function getNetworkStatus(): "connected" | "disconnected" {
  return navigator.onLine ? "connected" : "disconnected";
}
