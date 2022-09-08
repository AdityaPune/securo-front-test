import { useEffect, useRef, useState } from "react";
import { useWeb3Context } from "../../hooks/web3";
import { useAppSelector } from "../../store/hooks";
import {
  Button,
  Grid,
  TextField,
  Typography,
  AlertColor,
  CircularProgress,
  useMediaQuery,
  Box
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../constants/validation";
import UploadIcon from "../../assets/images/icons/upload-icon.svg";
import KycCompletion from "../../assets/images/icons/kyc-completion.png";
import { useAuth } from "../../services/auth/authProvider";
import SecuroLogo from '../../assets/images/common/securo-finance.svg';

import {
  userUpdateData,
  uploadDocument,
  userUploadAll,
} from "../../services/axios/kyc";

import ConnectMenu from "../../components/Connect/connectButton";
import ThemedSnackBar, { SnackBarProps } from "../../components/Snackbar";

import "./kyc.scss";
import { constants } from "ethers";
import { sleep } from "../../utils";
import { updateUserStatus } from "../../store/slices/app-slice";
import { useDispatch } from "react-redux";
import { updateNonBusinessView } from "../../store/slices/app-slice";

import { messages } from "../../constants/messages";

function Kyc() {
  const [view, setView] = useState<string>("0");
  const [passportFile, setPassportFile] = useState<File>();
  const [nationalIdFile, setNationalIdFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const matches = useMediaQuery('(max-width:800px)');

  const userStatus = useAppSelector((state) => state.app.userStatus);
  useEffect(() => {
    if (userStatus === "PR") {
      setView("2");
      dispatch(updateNonBusinessView("2"));
    }

    if (userStatus === "A") {
      setView("3");
      dispatch(updateNonBusinessView("3"));
    }
  }, [userStatus]);

  const routeChange = (path: string) => {
    navigate(path);
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  // useEffect(() => {
  //   async function check() {
  //     let res = await userUploadAll();
  //     if (res === "2") {
  //       setView("2");
  //       return;
  //     } else if (res === "1") {
  //       setView("1");
  //       return;
  //     } else {
  //       setView("0");
  //       return;
  //     }
  //   }
  //   check();
  // }, []);

  const onSubmitOne = async (data: any) => {
    setView("1");
    dispatch(updateNonBusinessView("1"));
    await userUpdateData(data);
  };
  const onSubmitTwo = async (data2: any) => {
    // File uploaded from upload field, it's in File type, can try to console.log to see its content
    const nationalId = nationalIdFile;
    const passportFront = passportFile;

    setLoading(true);
    const resp1 = await uploadDocument({
      file: passportFront,
      fileName: "passport-front",
      module: "upload-user-passport-front",
      imageSizeType: "",
    });

    // Axios call here
    const resp2 = await uploadDocument({
      file: nationalId,
      fileName: "national_id",
      module: "upload-user-nric",
      imageSizeType: "",
    });

    // Dispatch an action to update user status to PR
    dispatch(updateUserStatus({ userStatus: "PR" }));

    // Update local storage user
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    user.status = "PR";
    user = JSON.stringify(user);
    localStorage.removeItem("user");
    localStorage.setItem("user", user);

    if (resp1?.status === 201 && resp2?.status === 201) {
      setLoading(false);
      setView("2");
      dispatch(updateNonBusinessView("2"));
    } else {
      alert("Something went wrong");
    }
  };

  const onChangeOne = (e: React.FormEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      // console.log(files[0]);
      clearErrors("passportFront");
      setPassportFile(files[0]);
    } else {
      // Previously selected a file
      if (passportFile !== undefined) {
        setValue("passportFront", passportFile)
      }
    }
  };

  const onChangeTwo = (e: React.FormEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      // console.log(files[0]);
      clearErrors("nationalId");
      setNationalIdFile(files[0]);
    } else {
      // Previously selected a file
      if (nationalIdFile !== undefined) {
        setValue("nationalId", nationalIdFile)
      }
    }
  };

  const uploadPassport = () => {
    // const inputField = (document.getElementById("passportFront") as HTMLInputElement);
    // inputField.value = "";
    // setPassportFile(undefined);
    document.getElementById("passportFront")?.click();
  };
  const uploadNationalID = () => {
    // const inputField = (document.getElementById("nationalId") as HTMLInputElement);
    // inputField.value = "";
    // setNationalIdFile(undefined);
    document.getElementById("nationalId")?.click();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", flexWrap: "wrap" }}>
      {/* {matches && <div style={{ textAlign: "center", flexShrink: 0 }}><img src={SecuroLogo} style={{ width: "150px" }}></img></div>} */}
      <div className="kyc-container">
        {view === "0" && (
          <form
            onSubmit={handleSubmit(onSubmitOne)}
            className="kyc-mini-container-form"
          >
            <Grid container className="kyc-mini-container" spacing={2}>
              <Grid item xs={12} className="kyc-heading">
                <Typography style={matches ? { fontSize: "24px" } : { fontSize: "30px" }} className="kyc-heading-text">
                  Complete Your KYC
                </Typography>
              </Grid>
              <Grid item xs={12} className="kyc-subheading">
                <Typography style={matches ? { fontSize: "16px" } : { fontSize: "20px" }} className="kyc-subheading-text">
                  Please verify your Personal Details to enjoy seamless use at
                  Securo.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left" mb={1} style={{ fontWeight: 600, fontSize: "14px" }}>First Name</Typography>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  {...register("firstName", { required: "Required" })}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" mb={1} style={{ fontWeight: 600, fontSize: "14px" }}>Last Name</Typography>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  {...register("lastName", { required: "Required" })}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography align="left" mb={1} style={{ fontWeight: 600, fontSize: "14px" }}>Date Of Birth</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="date"
                  fullWidth
                  {...register("dateofBirth", {
                    required: "Required",
                    validate: (val: string) => {
                      const selectedDate = new Date(val).getFullYear();
                      const currentYear = new Date().getFullYear();
                      if (currentYear - selectedDate <= 18) {
                        return "You must be older than 18 years old to proceed financial investment.";
                      }
                    },
                  })}
                  error={!!errors?.dateofBirth}
                  helperText={errors?.dateofBirth?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography align="left" mb={1} style={{ fontWeight: 600, fontSize: "14px" }}>Address</Typography>
                <TextField
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                  fullWidth
                  {...register("street", { required: "Required" })}
                  error={!!errors?.street}
                  helperText={errors?.street?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  fullWidth
                  {...register("city", { required: "Required" })}
                  error={!!errors?.city}
                  helperText={errors?.city?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                  fullWidth
                  {...register("state", { required: "Required" })}
                  error={!!errors?.state}
                  helperText={errors?.state?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  {...register("country", { required: "Required" })}
                  error={!!errors?.country}
                  helperText={errors?.country?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                  {...register("postalCode", { required: "Required" })}
                  error={!!errors?.postalCode}
                  helperText={errors?.postalCode?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
        {view === "1" && (
          <form
            onSubmit={handleSubmit(onSubmitTwo)}
            className="kyc-mini-container-form"
          >
            <Grid container className="kyc-mini-container" spacing={2}>
              <Grid item xs={12} className="kyc-heading">
                <Typography style={matches ? { fontSize: "24px" } : { fontSize: "32px" }} className="kyc-heading-text">
                  Complete Your KYC
                </Typography>
              </Grid>
              <Grid item xs={12} className="kyc-subheading">
                <Typography style={matches ? { fontSize: "16px" } : { fontSize: "20px" }} className="kyc-subheading-text">
                  Kindly upload your Passport and National ID to verify and
                  complete your KYC
                </Typography>
              </Grid>

              <Grid item xs={12} className="documents">
                <Typography className="passport" style={matches ? { fontSize: "16px", textAlign: "left" } : { fontSize: "20px", textAlign: "center" }}>Passport</Typography>
                <Button
                  className={`styled-button ${!!errors?.passportFront ? "error" : ""
                    }`}
                  onClick={uploadPassport}
                >
                  <img src={UploadIcon}></img>
                  <div className="text">
                    {passportFile
                      ? passportFile.name
                      : messages.file_format_upload}
                  </div>
                </Button>
                <input
                  id="passportFront"
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpeg,.png,.gif,.jpg"
                  {...register("passportFront", {
                    validate: (val: any) => {
                      if (passportFile === undefined) {
                        return "Please provide passport front page.";
                      }
                    }
                  })}
                  onChange={onChangeOne}
                />
                {!!errors?.passportFront && (
                  <span style={{ color: "red" }}>
                    {errors?.passportFront?.message}
                  </span>
                )}
              </Grid>

              <Grid item xs={12} className="documents">
                <Typography className="passport" style={matches ? { fontSize: "16px", textAlign: "left" } : { fontSize: "20px", textAlign: "center" }}>National ID</Typography>
                <Button
                  className={`styled-button ${!!errors?.nationalId ? "error" : ""
                    }`}
                  onClick={uploadNationalID}
                >
                  <img src={UploadIcon}></img>
                  <div className="text">
                    {nationalIdFile
                      ? nationalIdFile.name
                      : messages.file_format_upload}
                  </div>
                </Button>
                <input
                  id="nationalId"
                  style={{ display: "none" }}
                  {...register("nationalId", {
                    validate: (val: any) => {
                      if (nationalIdFile === undefined) {
                        return "Please provide national id.";
                      }
                    }
                  })}
                  type="file"
                  accept=".jpeg,.png,.gif,.jpg"
                  onChange={onChangeTwo}
                />
                {!!errors?.nationalId && (
                  <span style={{ color: "red" }}>
                    {errors?.nationalId?.message}
                  </span>
                )}
              </Grid>

              <Grid item xs={6} className="page-buttons">
                <Button
                  variant="contained"
                  fullWidth
                  className="back-next"
                  onClick={() => {
                    setView("0");
                    dispatch(updateNonBusinessView("0"));
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6} className="page-buttons">
                <Button
                  variant="contained"
                  type="submit"
                  className="back-next"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : <span>Submit</span>}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
        {view === "2" && (
          <div className="kyc-mini-container-last" style={{ marginTop: "40px" }}>
            <img src={KycCompletion}></img>
            <div className="kyc-heading">
              <Typography style={matches ? { fontSize: "24px" } : { fontSize: "32px" }} className="kyc-heading-text">
                Thank you for submitting your documents
              </Typography>
            </div>

            <div className="kyc-subheading">
              <Typography style={matches ? { fontSize: "16px" } : { fontSize: "20px" }} className="kyc-subheading-text">
                We are reviewing your documents. This should only take a couple of
                minutes. Meanwhile, you can check out our investment strategies
                here. We will update you via mail once your KYC is completed.
              </Typography>
            </div>

            <div className="button-container">
              <Button
                className={!matches ? "button-text" : ""}
                variant="contained"
                type="submit"
                fullWidth
                onClick={() => routeChange("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
      {view === "3" && (
        <div style={{ marginTop: "40px" }} id="completed-kyc">
          <img src={KycCompletion}></img>
          <div id="kyc-heading">
            <Typography style={{ fontSize: "24px" }}>
              You have completed the KYC process.
            </Typography>
            <div id="button-container">
              <Button
                id={!matches ? "button-text" : ""}
                variant="contained"
                type="submit"
                fullWidth
                onClick={() => routeChange("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kyc;
