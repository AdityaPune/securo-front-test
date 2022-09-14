import { Button, createTheme, TextField, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_PATTERN } from '../../../constants/validation';
import { userChangePassword } from '../../../services/axios/auth';
import { useAppSelector } from '../../../store/hooks';
import { updateIsResetPassword } from '../../../store/slices/app-slice';
import { success, error } from '../../../store/slices/messages-slice';

interface IResetPasswordFormProps {
  requireCurrentPassword?: boolean;
}
function ResetPasswordForm(props: IResetPasswordFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const tempPassword = useAppSelector((state) => state.app.tempPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const matches = useMediaQuery('(max-width:600px)');

  const onSubmit = async (data: any) => {
    try {
      const currentPassword = props.requireCurrentPassword
        ? data.currentPassword
        : tempPassword;
      const updatedPassword = data.confirmPassword;

      if (currentPassword === undefined) {
        dispatch(
          error({
            text: 'Missing current password',
          })
        );
      }
      const res = await userChangePassword(updatedPassword, currentPassword);
      if (res.status === 400) {
        dispatch(
          error({
            text: res.data.errorMessage,
          })
        );
        return;
      }
      dispatch(updateIsResetPassword({ isReset: false, tempPassword: '' }));
      dispatch(
        success({
          text: 'Update Password Successful!',
        })
      );

      if (!props.requireCurrentPassword) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const textFieldTheme = createTheme({
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginBottom: "0px",
            marginTop: 0,
          }
        }
      }
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex-column align-items-center justify-content-center"
          style={!matches ? { marginTop: '16px', width: "500px" } : { marginTop: '16px', width: "280px" }}
        >
          {props.requireCurrentPassword && (
            <ThemeProvider theme={textFieldTheme}>
              <TextField
                id="outlined-basic"
                label="Current password"
                variant="outlined"
                type="password"
                style={{ marginBottom: '16px' }}
                fullWidth
                {...register('currentPassword', {
                  required: 'Required',
                })}
              />
            </ThemeProvider>
          )}
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              type="password"
              fullWidth
              {...register('password', {
                required: 'Required',
                pattern: {
                  value: PASSWORD_PATTERN,
                  message:
                    'Password must be a combination of at least 1 uppercase, 1 lower case, 1 number and 1 special character with min length of 8',
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
          </ThemeProvider>
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ marginTop: '16px' }}
              {...register('confirmPassword', {
                required: 'Required',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Password does not match';
                  }
                },
              })}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          </ThemeProvider>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            style={{ marginTop: '16px' }}
            className="securo-button-gradient"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
