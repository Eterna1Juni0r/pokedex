import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Input } from '@common';
import { citySchema, emailSchema, nameSchema, passwordSchema, ROUTES } from '@utils/constants';
import { useRegisterWithEmailAndPasswordMutation } from '@utils/firebase';
import { setIsLogin } from '../../../../utils/contexts/store/SessionSlice';

import styles from '../../AuthPage.module.css';

interface SignUpFormValues extends User {
  email: string;
  password: string;
}

export const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError } = useForm<SignUpFormValues>();

  const registerWithEmailAndPasswordMutation = useRegisterWithEmailAndPasswordMutation({
    options: {
      onSuccess: () => {
        dispatch(setIsLogin(true));
        navigate(ROUTES.POKEMONS);
      },
      onError: (error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError(
            'email',
            { type: 'custom', message: 'email already in use' },
            { shouldFocus: true }
          );
        }
      }
    }
  });

  const { isSubmitting, errors } = formState;
  const loading = isSubmitting || registerWithEmailAndPasswordMutation.isLoading;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password, ...user }) =>
        registerWithEmailAndPasswordMutation.mutate({ user, password })
      )}
    >
      <h1 className={styles.title}>Sign up</h1>
      <Input
        {...register('displayName', nameSchema)}
        disabled={loading}
        error={errors.displayName?.message}
        placeholder='name'
      />
      <Input
        {...register('email', emailSchema)}
        disabled={loading}
        error={errors.email?.message}
        placeholder='email'
      />
      <Input
        {...register('city', citySchema)}
        disabled={loading}
        error={errors.city?.message}
        placeholder='city'
      />
      <Input
        type='password'
        {...register('password', passwordSchema)}
        disabled={loading}
        error={errors.password?.message}
        placeholder='password'
      />

      <Button type='submit' variant='contained' loading={loading}>
        OK
      </Button>
    </form>
  );
};
