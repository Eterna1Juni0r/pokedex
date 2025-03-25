// UploadPhotoModal.tsx
import React from 'react';
import { Button } from '@common'; // замените путь, если нужно
import { useUpdateDocumentMutation, useUploadFile } from '@utils/firebase'; // путь к вашему хуку
import type { ModalProps } from '../Modal/Modal';
import { Modal } from '../Modal/Modal';

interface UploadPhotoModalProps extends Omit<ModalProps, 'children' | 'loading'> {
  uid: User['uid'];
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ onClose, uid, ...props }) => {
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Получаем uploadFile и прогресс
  const { uploadFile, progresspercent } = useUploadFile();
  const updateDocumentMutation = useUpdateDocumentMutation();

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    setLoading(true);
    try {
      // result будет { url: string }
      const result = await uploadFile(event.target.files[0]);

      console.log('Загружаемый файл:', event.target.files[0]);
      console.log('Результат Cloudinary:', result);

      // Обновляем документ в Firestore (или вашей базе) с новым photoURL
      await updateDocumentMutation.mutateAsync({
        collection: 'users',
        data: { photoURL: result.url },
        id: uid
      });

      onClose();
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} onClose={onClose}>
      <label htmlFor='upload-button'>
        <input
          type='file'
          id='upload-button'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileInputChange}
        />
        <Button variant='text' onClick={() => !loading && fileInputRef.current?.click()}>
          {!loading ? 'Upload your photo' : `${progresspercent}%`}
        </Button>
      </label>
      <Button onClick={onClose} loading={loading}>
        CANCEL
      </Button>
    </Modal>
  );
};
