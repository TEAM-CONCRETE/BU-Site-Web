declare module "face-api.js" {
  export type Point = { x: number; y: number };

  export interface FaceDetection {
    box: { x: number; y: number; width: number; height: number };
  }

  export interface FaceLandmarks68 {
    getLeftEye(): Point[];
    getRightEye(): Point[];
  }

  export interface WithFaceLandmarks<TDetection, TLandmarks> {
    detection: TDetection;
    landmarks: TLandmarks;
  }

  export class TinyFaceDetectorOptions {
    constructor(options?: { inputSize?: number; scoreThreshold?: number });
  }

  export const nets: {
    tinyFaceDetector: { loadFromUri(url: string): Promise<void> };
    faceLandmark68TinyNet: { loadFromUri(url: string): Promise<void> };
  };

  export const tf: {
    setBackend(backendName: string): Promise<void>;
    ready(): Promise<void>;
  };

  export function detectAllFaces(
    input: HTMLVideoElement,
    options?: TinyFaceDetectorOptions
  ): Promise<FaceDetection[]>;

  export function detectSingleFace(
    input: HTMLVideoElement,
    options?: TinyFaceDetectorOptions
  ): {
    withFaceLandmarks(
      useTinyModel?: boolean
    ): Promise<WithFaceLandmarks<FaceDetection, FaceLandmarks68> | undefined>;
  };
}
