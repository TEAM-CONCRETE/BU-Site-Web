import { authenticatedApiClient } from "@/lib/api/interceptor";

export type AttendanceType = "CHECK_IN" | "CHECK_OUT";

export interface VerifyAttendanceResponse {
  verified: boolean;
  recordId: string;
  employeeId: string;
  employeeName: string;
  attendanceType: AttendanceType;
  timestamp: string;
  message: string;
  isLate?: boolean;
}

interface VerifyAttendancePayload {
  phoneNumber: string;
  faceImage: Blob;
}

export async function verifyAttendanceApi(
  payload: VerifyAttendancePayload
): Promise<VerifyAttendanceResponse> {
  const formData = new FormData();
  formData.append("phoneNumber", payload.phoneNumber);
  formData.append("faceImage", payload.faceImage, "snapshot.png");

  return authenticatedApiClient<VerifyAttendanceResponse>(
    "/v1/attendance/verify",
    {
      method: "POST",
      body: formData,
    }
  );
}
