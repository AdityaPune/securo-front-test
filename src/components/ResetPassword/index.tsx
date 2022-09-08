import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PASSWORD_PATTERN } from "../../constants/validation";
import { userChangePassword } from "../../services/axios/auth";
import { useAppSelector } from "../../store/hooks";
import { updateIsResetPassword } from "../../store/slices/app-slice";
import { success } from "../../store/slices/messages-slice";
import SecuroIcon from '../../assets/images/common/securo-finance.svg';

function ResetPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch
    } = useForm({
        mode: 'onChange'
    });

    const tempPassword = useAppSelector(state => state.app.tempPassword)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const matches = useMediaQuery('(max-width:600px)');
    const matches1 = useMediaQuery('(max-width:997px)');

    const onSubmit = async (data: any) => {
        try {
            const updatedPassword = data.confirmPassword;
            if (tempPassword === undefined) {
                throw new Error(`Missing current password`)
            }
            await userChangePassword(updatedPassword, tempPassword)
            dispatch(updateIsResetPassword({ isReset: false, tempPassword: "" }))
            dispatch(success({
                text: "Update Password Successful!"
            }))
            navigate("/dashboard")
        } catch (err) {
            console.log(err)
        }
    }

    return <div className={!matches ? "reset-password-wrapper" : "reset-password-wrapper-small"}>
        {/* {matches1 && <div style={{ textAlign: "center", marginBottom: "20px" }}><img src={SecuroIcon}></img></div>} */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} flexDirection="row" justifyContent={"center"}>
                <Grid item xs={12}>
                    <Typography style={matches1 ? { fontSize: "24px", textAlign: "center", marginTop: "30px" } : { fontSize: "32px", textAlign: "center", marginTop: "30px" }}><b>Reset Password</b></Typography>
                </Grid>

                <Grid item xs={12}>
                    <div className="flex-column align-items-center justify-content-center" style={{ marginTop: "16px" }}>
                        <TextField id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            {...register("password", {
                                required: "Required",
                                pattern: {
                                    value: PASSWORD_PATTERN,
                                    message: "Password must be a combination of at least 1 uppercase, 1 lower case, 1 number and 1 special character with min length of 8"
                                }
                            })}
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                        />

                        <TextField id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            sx={{ marginTop: "16px" }}
                            {...register("confirmPassword", {
                                required: "Required",
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        return "Password does not match";
                                    }
                                },
                            })}
                            error={!!errors?.confirmPassword}
                            helperText={errors?.confirmPassword?.message}
                        />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" type="submit" fullWidth>Reset Password</Button>
                </Grid>
            </Grid>
        </form>
    </div>
}

export default ResetPassword;