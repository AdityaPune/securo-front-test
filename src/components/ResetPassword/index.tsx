import { Typography, useMediaQuery } from '@mui/material';
import ResetPasswordForm from './ResetPasswordForm';

function ResetPassword() {
  const matches1 = useMediaQuery('(max-width:997px)');

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          style={
            matches1
              ? { fontSize: '22px', textAlign: 'center', marginTop: '30px' }
              : { fontSize: '30px', textAlign: 'center', marginTop: '30px' }
          }
        >
          <b>Change Existing Password</b>
        </Typography>
        <ResetPasswordForm />
      </div>
    </>
  );
}

export default ResetPassword;
