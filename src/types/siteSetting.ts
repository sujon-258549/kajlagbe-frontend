export interface TSiteSetting {
  id?: string;
  key: string;
  value: any;
  group?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TSiteSettingMap = Record<string, any>;

export interface TSiteSettingResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
