export interface TMediaImage {
  id: string;
  name: string;
  url: string;
  folderId: string | null;
  slug: string;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface TMediaImageCreatePayload {
  name: string;
  url: string;
  folderId?: string | null;
}

export interface TMediaResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TFolder {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
  parent?: {
    id: string;
    name: string;
  } | null;
  children?: TFolder[];
  images?: TMediaImage[];
}

export interface TFolderResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
