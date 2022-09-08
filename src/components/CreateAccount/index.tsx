import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../constants/validation";
import { registerUser } from "../../services/axios/user";
import { error } from "../../store/slices/messages-slice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../ResetPassword/reset-password.scss';
import CreateAccountConfirmation from "./confirmation";
import SecuroIcon from '../../assets/images/common/securo-finance.svg';

function CreateAccount() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        reset
    } = useForm({
        mode: 'onChange'
    });

    const [view, setView] = useState(0);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const matches = useMediaQuery('(max-width:600px)');
    const matches1 = useMediaQuery('(max-width:997px)');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmit = async (data: any) => {
        const email = data.email
        const password = data.password
        const firstName = data.email

        const response: any = await registerUser(email, password, firstName);
        if (Object.keys(response.data.data).length === 0) {
            const errorMessage = response.data.message;
            dispatch(error(({
                text: errorMessage,
                error: "Something wrong"
            })));
            reset();
            return;
        }
        setRegisteredEmail(email)
        setView(1)
    }

    const [checked1, setChecked1] = useState(false);

    const handleChange1 = (event: any) => {
        setChecked1(event.target.checked);
    };

    return <div className={!matches ? "reset-password-wrapper" : "reset-password-wrapper-small"}>
        {view === 0 && <>
            {matches1 && <div style={{ textAlign: "center", marginBottom: "20px" }}><img src={SecuroIcon}></img></div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="row" justifyContent={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <Typography style={matches1 ? { fontSize: "24px" } : { fontSize: "32px" }} textAlign="center"><b>Create Your Account</b></Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="footer-container-wrapper flex-column align-items-center flex-content-center">
                            <TextField id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                style={{ width: '100%', marginTop: "16px" }}
                                {...register("email", {
                                    required: "Email Address is empty",
                                    pattern: {
                                        value: EMAIL_PATTERN,
                                        message: 'Please enter a valid email',
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                            />
                            <TextField id="outlined-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                                style={{ width: '100%', marginTop: "16px" }}
                                {...register("password", {
                                    required: "Password is empty",
                                    pattern: {
                                        value: PASSWORD_PATTERN,
                                        message: "Password must be a combination of at least 1 uppercase, 1 lower case, 1 number and 1 special character with min length of 8"
                                    },
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password?.message}
                            />

                            <TextField id="outlined-basic"
                                label="Confirmed Password"
                                type="password"
                                variant="outlined"
                                style={{ width: '100%', marginTop: "16px", marginBottom: "16px" }}
                                {...register("confirmedPassword", {
                                    required: "Confirmed Password is empty",
                                    validate: (val: string) => {
                                        if (watch('password') !== val) {
                                            return "Password does not match";
                                        }
                                    },
                                })}
                                error={!!errors?.confirmedPassword}
                                helperText={errors?.confirmedPassword?.message}
                            />

                            <FormGroup>
                                <FormControl >
                                    <FormControlLabel control={<div style={{ display: "table-cell" }}><Checkbox checked={checked1} onChange={handleChange1} required size="small" /></div>}
                                        style={{ display: "table", alignSelf: "center", width: '100%' }}
                                        label={
                                            <div style={{ textAlign: "justify", fontSize: "14px" }}>
                                                Investments in the Securo products are speculative investments that involve high degrees of risk, including loss of invested funds. Securo Products are not suitable for any investor that cannot afford loss of the entire investment. Carefully consider each Product’s investment objectives, risk factors, fees and expenses before investing. This and other information can be found in each Product’s factsheet, which may be obtained from Securo’s website.
                                            </div>
                                        }
                                        labelPlacement="end" />
                                </FormControl>
                                <FormControl>
                                    <Button variant="contained" type="submit" style={{ alignSelf: "center", margin: "16px 0px", borderRadius: 8, width: '100%', marginTop: "16px" }}>Create Account</Button>
                                </FormControl>
                            </FormGroup>

                            <div style={{ marginBottom: "8px", alignSelf: "center", width: '100%', textAlign: "center" }}>
                                <span>
                                    By creating an account, you agree to our
                                    <a href="https://securo-static.s3.us-east-2.amazonaws.com/documents/AML+%26+KYC+policy.pdf" target="_BLANK" rel='noopener noreferrer'> KYC Policy,</a>
                                    <a style={{ margin: "0px 2px" }} href="https://securo-static.s3.us-east-2.amazonaws.com/documents/Terms+of+Service.pdf" target="_BLANK" rel='noopener noreferrer'>Terms of Service</a>
                                    and
                                    <a style={{ margin: "0px 2px" }} href="https://securo-static.s3.us-east-2.amazonaws.com/documents/Privacy+Policy.pdf" target="_BLANK" rel='noopener noreferrer'>Privacy Policy</a>
                                </span>
                            </div>

                            <div style={{ width: "100%", marginTop: "8px" }}>
                                <Button href="#" id="forget-password" style={{ alignSelf: "flex-start" }} onClick={() => navigate("/main")} startIcon={<ArrowBackIcon />}>Back</Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>}
        {view === 1 && <CreateAccountConfirmation email={registeredEmail} />}
    </div>
}

export default CreateAccount
