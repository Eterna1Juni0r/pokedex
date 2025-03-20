import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button, Input, ModalProps, Typography } from '@common';
import { citySchema, nameSchema } from '@utils/constants';
import { useUpdateDocumentMutation } from '@utils/firebase';
import type { RootState } from '../../../../utils/contexts/store/store';

import styles from './SettingChangeModalContent.module.css';

export type SettingModalItem = {
  type: keyof Pick<User, 'city' | 'displayName' | 'phoneNumber'>;
  value: string;
};

interface SettingChangeModalContentProps extends Pick<ModalProps, 'onClose'> {
  setting: SettingModalItem;
}

const validateSchema = {
  city: citySchema,
  displayName: nameSchema,
  phoneNumber: nameSchema
};

export const SettingChangeModalContent: React.FC<SettingChangeModalContentProps> = ({
  setting,
  onClose
}) => {
  // Правильный селектор: берем user из state.session.user
  const user = useSelector((state: RootState) => state.session.user);

  const updateDocumentMutation = useUpdateDocumentMutation({
    options: {
      onSuccess: () => {
        onClose();
      }
    }
  });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { [setting.type]: setting.value },
    mode: 'onBlur'
  });

  const { isSubmitting, errors } = formState;
  const loading = isSubmitting || updateDocumentMutation.isLoading;

  return (
    <form
      className={styles.setting_modal}
      onSubmit={handleSubmit(async (values) =>
        updateDocumentMutation.mutate({
          collection: 'users',
          data: { [setting.type]: values[setting.type] },
          id: user?.uid
        })
      )}
    >
      <Typography variant='sub-title'>Change your data</Typography>
      <Input
        {...register(setting.type, validateSchema[setting.type])}
        disabled={loading}
        error={errors[setting.type]?.message}
      />
      <Button variant='outlined' type='submit' loading={loading}>
        CHANGE
      </Button>
      <Button onClick={onClose} disabled={loading}>
        CANCEL
      </Button>
    </form>
  );
};
