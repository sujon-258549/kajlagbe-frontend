"use server";

import { fetchWithAuth } from "@/lib/api";
import { TMediaImageCreatePayload, TMediaResponse, TMediaImage, TFolderResponse, TFolder } from "@/types/media";

export async function getImages(folderId?: string | null) {
  const fid = folderId === null || folderId === undefined || folderId === "" ? "root" : folderId;
  const res = await fetchWithAuth(`/media/images?folderId=${fid}`);
  return res.json() as Promise<TMediaResponse<TMediaImage[]>>;
}

export async function uploadImage(payload: TMediaImageCreatePayload) {
  const res = await fetchWithAuth("/media/upload-image", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<TMediaResponse<TMediaImage>>;
}

export async function getAllFolders() {
  const res = await fetchWithAuth("/media/folders");
  return res.json() as Promise<TFolderResponse<TFolder[]>>;
}

export async function createFolder(payload: { name: string; parentId?: string | null }) {
  const res = await fetchWithAuth("/media/create-folder", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<TFolderResponse<TFolder>>;
}

export async function deleteImage(id: string) {
  const res = await fetchWithAuth(`/media/image/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function deleteFolder(id: string) {
  const res = await fetchWithAuth(`/media/folder/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
