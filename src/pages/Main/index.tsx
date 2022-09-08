import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../constants/validation";
import { useAuth } from "../../services/auth/authProvider";
import { useAppSelector } from "../../store/hooks";
import useMediaQuery from '@mui/material/useMediaQuery';
import SecuroLogo from '../../assets/images/common/securo-finance.svg';
import { updateDestinationPage } from "../../store/slices/app-slice";

import "./main.scss";
import { useDispatch } from "react-redux";

function LoginContainer() {

  const matches = useMediaQuery('(max-width:600px)');
  const matches1 = useMediaQuery('(min-width: 600px) and (max-width: 990px)');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Navigate to forget password
  const navigate = useNavigate();
  const navigateToForgetPassword = () => {
    navigate("/forget-password");
  };

  const navigateToCreateAccount = () => {
    navigate("/register");
  };

  const destinationPage = useAppSelector(state => state.app.destinationPage);

  // Redirect user to reset password page if user reset password before
  const { user } = useAuth();
  const dispatch = useDispatch();

  const isResetPassword = useAppSelector((state) => state.app.isResetPassword);
  useEffect(() => {
    if (!!user) {
      if (isResetPassword) {
        navigate("/reset-password");
        dispatch(updateDestinationPage("/dashboard"));
        return;
      }

      // if (user.status === "A") {
      //   if (destinationPage === "/verify") {
      //     navigate("/dashboard");
      //     dispatch(updateDestinationPage("/dashboard"));
      //     return;
      //   }
      // }

      // if (destinationPage === "/") {
      //   navigate("/dashboard");
      //   dispatch(updateDestinationPage("/dashboard"));
      //   return;
      // }

      navigate(destinationPage);
      dispatch(updateDestinationPage("/dashboard"));
    }
  }, [user, isResetPassword]);

  // Handling for login page
  const { login } = useAuth();
  const onSubmit = async (data: any) => {
    const email = data.email;
    const password = data.password;
    await login(email, password);
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container id="login-container" spacing={2}>
            <Grid item xs={12}>
              <div id="login-title-container">
                <Typography className="SignIn" sx={matches1 ? { textAlign: "center", fontWeight: 700, marginRight: "30px" }
                  : { textAlign: "center", fontWeight: 700 }}>
                  Sign In
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Email Required",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "Please enter a valid email",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                {...register("password", { required: "Required" })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <div className="flex-row flex-end">
                <a
                  href="#"
                  id="forget-password"
                  onClick={() => navigateToForgetPassword()}
                >
                  Forgot Password ?
                </a>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="flex-row flex-content-center">
                <div style={matches ? { width: "100%" } : { width: "70%" }}>
                  <Button variant="contained" type="submit" fullWidth>
                    Sign In
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: "16px" }}
                    onClick={() => navigateToCreateAccount()}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

function Main() {
  const matches = useMediaQuery('(min-width:600px)');
  const matches1 = useMediaQuery('(max-width:990px)');

  return (
    <>
      <div className="main-page-wrapper flex-row align-item-center">
        <div>
          <Grid container direction={"row"} alignItems={"center"}>
            <Grid xs={12} md={7}>
              <div className="flex-column flex-align-center" style={{ paddingLeft: "36px" }}>
                {!matches && <div style={{ textAlign: "center", marginRight: "30px" }}><img src={SecuroLogo} style={{ width: "150px" }}></img></div>}
                {matches && matches1 && <div style={{ textAlign: "center", marginBottom: "20px", marginRight: "70px" }}><img src={SecuroLogo} style={{ width: "180px" }}></img></div>}
                <h1 id="welcome-text">Welcome to {!matches1 && <br />}
                  Securo Finance</h1>
                <h4 id="welcome-desc">
                  Decentralized Made Easy.<br />
                  Simplify crypto investing with DeFi indices.<br />
                  Using all-in-1 dashboard and API integration.
                </h4>
              </div>
            </Grid>

            <Grid xs={12} md={5}>
              <LoginContainer />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Main;
