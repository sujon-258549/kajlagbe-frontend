export interface TCategory {
  id: string;
  name: string;
  url?: string;
  imageId?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TCategoryResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
