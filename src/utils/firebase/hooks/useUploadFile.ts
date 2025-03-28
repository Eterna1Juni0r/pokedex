// src/utils/firebase/useUploadFile.ts
import { useState } from 'react';
import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const useUploadFile = () => {
  const [progresspercent, setProgresspercent] = useState(0);

  /**
   * Загружает файл на Cloudinary (unsigned) и возвращает { url: string }
   */
  const uploadFile = async (file: File): Promise<{ url: string }> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration is missing in the environment variables');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.round((event.loaded * 100) / event.total);
              setProgresspercent(progress);
            }
          }
        }
      );
      // Возвращаем объект вида { url: ... }
      return { url: response.data.secure_url };
    } catch (error) {
      console.error('Ошибка загрузки файла на Cloudinary:', error);
      throw error;
    }
  };

  return { uploadFile, progresspercent };
};
