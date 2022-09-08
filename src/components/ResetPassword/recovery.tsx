import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../constants/validation";
import { userForgetPassword } from "../../services/axios/auth";
import { error, success } from "../../store/slices/messages-slice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecuroIcon from '../../assets/images/common/securo-finance.svg';

import './reset-password.scss'

function RecoveryLink() {
    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onChange'
    });

    const matches = useMediaQuery('(max-width:600px)');
    const matches1 = useMediaQuery('(max-width:997px)');

    const dispatch = useDispatch()

    const [successReset, setIsSuccess] = useState(false);

    const onSubmit = async (data: any) => {
        const registeredEmail = data.email;

        const result: any = await userForgetPassword(registeredEmail)

        if (result.data.errorMessage) {
            // Dispatch error message
            dispatch(error({
                text: result.data.errorMessage,
                error: "Something wrong"
            }))
        }

        // Success
        if (result.data.statusCode === 200) {
            setIsSuccess(true);
            reset();
            // Dispatch success message
            dispatch(success({
                text: "Recovery link sent. Please check your mailbox for latest update"
            }))
        }

        // Redirect user to main page
        // navigate("/main")
    }

    return <>
        <div className={!matches ? "reset-password-wrapper" : "reset-password-wrapper-small"}>
            {matches1 && <div style={{ textAlign: "center", marginBottom: "20px" }}><img src={SecuroIcon}></img></div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} direction="row" justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Typography style={matches1 ? { fontSize: "24px" } : { fontSize: "32px" }} textAlign="center"><b>Reset Password</b></Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography style={matches1 ? { fontSize: "16px" } : { fontSize: "20px" }} paragraph textAlign="center">Enter the email address you signed up, then we will send an email to reset your password.</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="footer-container-wrapper flex-column align-items-center flex-content-center">
                            <TextField id="outlined-basic"
                                label="Email address"
                                variant="outlined"
                                style={{ width: '100%' }}
                                // fullWidth
                                {...register("email", {
                                    required: "Email Required",
                                    pattern: {
                                        value: EMAIL_PATTERN,
                                        message: 'Please enter a valid email',
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                            />
                            <Button variant="contained" type="submit" style={{ width: '100%', borderRadius: 8, marginTop: "24px" }} size='large'><b>Reset password</b></Button>

                            <div style={{ width: '100%', marginTop: "16px" }}>
                                <Button href="#" id="forget-password" style={{ alignSelf: "flex-start" }} onClick={() => navigate("/main")} startIcon={<ArrowBackIcon />}>Back</Button>
                            </div>
                        </div>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <div className="footer-container-wrapper flex-row align-items-center flex-content-center">
                            
                        </div>
                    </Grid>

                    {successReset&&<Grid item xs={12}>
                       <span id="status-message">Recovery link Sent ! Please check your mailbox.</span>
                    </Grid>}

                    <Grid item xs={12}>
                        <div className="footer-container-wrapper">
                            <Button href="#" id="forget-password" onClick={() => navigate("/main")} startIcon={<ArrowBackIcon/>}>Back</Button>
                        </div> 
                    </Grid> */}
                </Grid>
            </form>
        </div>
    </>
}

export default RecoveryLink