export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  if (!dataUrl.startsWith("data:")) {
    throw new Error("올바르지 않은 데이터 URL입니다.");
  }

  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error("스냅샷 데이터를 변환할 수 없습니다.");
  }

  return response.blob();
}
