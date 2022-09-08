import WhiteWrapper from "../WhiteWrapper"
import EmailConfirm from "../../assets/images/common/email-confirm.svg"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function CreateAccountConfirmation({ email }: { email: string }) {
    const navigate = useNavigate()
    return <WhiteWrapper>
        <div className="flex-column align-items-center">
            <img src={EmailConfirm} alt="email-confirm" style={{ width: "100px", margin: "16px" }} />
            <Typography variant="h5" style={{ margin: "8px", textAlign: "center" }}><b>Verify your email</b></Typography>
            <Typography style={{ marginTop: "8px", textAlign: "center" }}>We've sent you an email to <span style={{ fontWeight: "bold" }}>{email}</span></Typography>
            <Typography style={{ marginBottom: "16px", textAlign: "center" }}>Kindly check your mail to verify your account.</Typography>

            <Button variant="contained" sx={{ width: "50%", margin: "16px" }} onClick={() => navigate("/")}>Login</Button>
        </div>
    </WhiteWrapper>
}

export default CreateAccountConfirmation