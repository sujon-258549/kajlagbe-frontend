import { TCategoryResponse } from "./category";

export interface TSubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  icon?: string;
  image?: string;
  imageId?: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TSubCategoryResponse<T> = TCategoryResponse<T>;
