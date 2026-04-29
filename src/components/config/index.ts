export const config = {
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
  superAdminEmail: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL,
  apiBaseUrl: process.env.NEXT_PUBLIC_BASE_API,
};
