import { config } from "@/components/config";
import type { TMediaImageCreatePayload } from "@/types/media";

const uploadImageToCloudinary = async (
  file: File,
  cloudName: string,
  uploadPreset: string,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return await response.json();
};

export const uploadToCloudinary = async (file: File) => {
  const cloudName = config.cloudinary.cloudName;
  const uploadPreset = config.cloudinary.uploadPreset;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary config missing");
  }

  try {
    const uploadedData = await uploadImageToCloudinary(
      file,
      cloudName,
      uploadPreset,
    );
    return uploadedData.secure_url as string;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

function fileBaseName(file: File): string {
  const raw = file.name.trim();
  if (!raw) return "image";
  return raw.replace(/\.[^/.]+$/i, "") || "image";
}

export type UploadMediaImageResult<T> = {
  result: T;
  publicUrl: string;
};

export const uploadMediaImage = async <T>(
  file: File,
  folderId: string | null | undefined,
  saveToApi: (payload: TMediaImageCreatePayload) => Promise<T>,
): Promise<UploadMediaImageResult<T>> => {
  const publicUrl = await uploadToCloudinary(file);
  const name = fileBaseName(file);
  const result = await saveToApi({
    name,
    url: publicUrl,
    folderId: folderId ?? null,
  });
  return { result, publicUrl };
};
