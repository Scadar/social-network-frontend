import React, {FC, useEffect} from 'react';
import {Box, Button, Link, MenuItem, Paper, Stack, TextField, Typography} from '@mui/material';
import {authApi} from '../../services/authService';
import {useFormik} from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {toast} from 'react-toastify';
import {isFetchBaseQueryError} from '../../utils/queryErrors';

const loginValidationSchema = yup.object({
  email: yup.string()
      .required('Логин обязателен')
      .email('Неверный формат почты'),
  password: yup.string()
      .required('Пароль обязателен'),
});

const registerValidationSchema = yup.object({
  email: yup.string()
      .required('Логин обязателен')
      .email('Неверный формат почты'),
  firstName: yup.string()
      .required('Имя обязательно')
      .min(2, 'Минимум 2 символа')
      .max(40, 'Максимум 40 символов'),
  gender: yup.mixed()
      .required('Пол обязателен')
      .oneOf(['male', 'female']),
  lastName: yup.string()
      .required('Фамилия обязательна')
      .min(2, 'Минимум 2 символа')
      .max(40, 'Максимум 40 символов'),
  password: yup.string()
      .required('Пароль обязателен')
      .min(4, 'Минимум 4 символа')
      .max(20, 'Максимум 20 символов'),
  passwordConfirmation: yup.string()
      .required('Пароль обязателен')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

type AuthPageProps = {
  page: 'login' | 'register'
}

const AuthPage: FC<AuthPageProps> = ({page}) => {

  const [fetchLogin, {isLoading: loginLoading}] = authApi.useFetchLoginMutation();
  const [fetchRegister, {isLoading: registerLoading}] = authApi.useFetchRegisterMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: page === 'login' ? loginValidationSchema : registerValidationSchema,
    onSubmit: ({email, password, firstName, gender, lastName}) => {
      if (page === 'login') {
        fetchLogin({email, password})
            .unwrap()
            .catch((e) => {
              if (isFetchBaseQueryError(e)) {
                if (e.status === 400 || e.status === 404 || e.status === 409) {
                  toast.error('Неверный логин или пароль');
                  return;
                }
              }
              toast.error('Ошибка сервера');
            });
      } else {
        fetchRegister({email, password, firstName, lastName, gender})
            .unwrap()
            .catch((e) => {
              if (isFetchBaseQueryError(e)) {
                if (e.status === 409) {
                  toast.error('Почта уже используется');
                  return;
                }
              }
              toast.error('Ошибка сервера');
            });
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [page]);// eslint-disable-line

  return (
      <Paper
          sx={{
            padding: 5,
          }}
      >
        <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              textAlign: 'center',
            }}
            marginBottom={2}
        >
          {page === 'login' ? 'Вход' : 'Регистрация'} ВКонтакте
        </Typography>

        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              width: 350,
            }}
        >
          <Stack spacing={2}>
            <TextField
                required
                id="email"
                name="email"
                label="Почта"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoFocus
                autoComplete="email"
            />
            {
                page === 'register' &&
                <>
                  <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="Имя"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                  <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Фамилия"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                  <TextField
                      name="gender"
                      id="gender"
                      select
                      label="Пол"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      error={formik.touched.gender && Boolean(formik.errors.gender)}
                      helperText={
                          formik.touched.gender && formik.errors.gender
                      }
                  >
                    <MenuItem value={'male'}>
                      Мужчина
                    </MenuItem>
                    <MenuItem value={'female'}>
                      Женщина
                    </MenuItem>
                  </TextField>
                </>
            }
            <TextField
                required
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
            />
            {
                page === 'register' &&
                <>
                  <TextField
                      required
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      label="Повторите пароль"
                      type="password"
                      value={formik.values.passwordConfirmation}
                      onChange={formik.handleChange}
                      error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                      helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                  />
                </>

            }
            <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: '100%',
                }}
            >
              <LoadingButton
                  loading={loginLoading || registerLoading}
                  fullWidth
                  type="submit"
                  variant="outlined"
              >
                {page === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </LoadingButton>
              <Button
                  component={Link}
                  color="success"
                  fullWidth
                  href={page === 'login' ? '/register' : '/login'}
              >
                {page === 'login' ? 'Регистрация' : 'Вход'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
  );
};

export default AuthPage;
