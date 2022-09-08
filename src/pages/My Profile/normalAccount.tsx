import { useAuth } from "../../services/auth/authProvider";
import { Avatar, Box, Button, Card, CardContent, TextField, Grid, Typography, Divider, CircularProgress, useMediaQuery, AppBar } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HumanIcon from "../../assets/images/icons/Avatar.svg";

import UploadIcon from "../../assets/images/icons/upload-icon.svg";

import "./profile.scss";
import { messages } from "../../constants/messages";
import { uploadDocument, userRemoveProfilePic, userUpdateData } from "../../services/axios/kyc";
import { getProfile } from "../../services/axios/user";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";
import { error, success } from "../../store/slices/messages-slice";

function ProfileLayoutWrapper({ children }: any) {
    const matches = useMediaQuery('(max-width:600px)');
    return <div className={!matches ? "flex-row flex-space-between" : ""} style={{ marginTop: "20px" }}>
        {children}
    </div>
}

function MyProfile() {
    const { user } = useAuth();
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [profilePicDisplayFile, setProfilePicDisplayFile] = useState<any>(HumanIcon);
    const [profilePicFile, setProfilePicFile] = useState<any>(undefined);
    const [passportFile, setPassportFile] = useState<any>(undefined);
    const [nationalIdFile, setNationalId] = useState<any>(undefined);
    const [loadingAll, setLoadingAll] = useState(false);
    const [username, setUsername] = useState("");
    // const [userInfo, setUserInfo] = useState<any>({});
    const [passportFileUrl, setPassportFileUrl] = useState<any>(undefined);
    const [nationalIdFileUrl, setNationalIdUrl] = useState<any>(undefined);
    const [profilePicStatus, setProfilePicStatus] = useState(false);
    const [nationalIdStatus, setNationalStatus] = useState(false);
    const [passportFileStatus, setPassportFileStatus] = useState(false);
    const [userStatus, setUserStatus] = useState<any>(undefined);
    const [messageTxt, setMessageTxt] = useState<any>(undefined);

    const matches = useMediaQuery('(max-width:600px)');

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        clearErrors
    } = useForm({
        mode: 'onChange'
    });

    const routeChange = (path: string) => {
        navigate(path);
    };

    const findUserDetails = async () => {
        const response = await getProfile();
        const data = response?.data.data;
        // setUserInfo(data)
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
        setValue('dob', new Date(data.dateOfBirth).toISOString().split('T')[0])
        setValue('emailAddress', data.emailAddress)
        setValue('streetAddress', data.street)
        setValue('city', data.city)
        setValue('country', data.country)
        setValue('state', data.state)
        setValue('postalCode', data.postalCode)
        setPassportFileUrl(data.userPassportFrontUrl)
        setNationalIdUrl(data.userNricUrl)
        setUserStatus(data.status)

        if (data.status === 'A') {
            setMessageTxt("Verified User, no need to perform re-upload action")
        } else if (data.status === 'PR') {
            setMessageTxt("Still under review stage, please contact admin if you need to perform re-upload action")
        }
        // GetProfilePic(data.userPassportFrontUrl)
        var passportfile = new File([], data.userPassportFrontUrl.substring(data.userPassportFrontUrl.lastIndexOf('/') + 1))
        setPassportFile(passportfile)
        var nricfile = new File([], data.userNricUrl.substring(data.userNricUrl.lastIndexOf('/') + 1))
        setNationalId(nricfile)
        // console.log(data)
        if (data !== undefined && data.userPhotoUrl !== null && data.userPhotoUrl !== undefined) {
            setProfilePicDisplayFile(data.userPhotoUrl)
            setUsername(data.firstName + ' ' + data.lastName)
        } else {
            setProfilePicDisplayFile(HumanIcon)
            setUsername(data.firstName + ' ' + data.lastName)
        }

    };

    useEffect(() => {

        findUserDetails();
        // if (user === null || user === undefined) {
        //     findUserDetails();
        // }
    }, []);

    const onDownloadPP = () => {
        const link = document.createElement("a");
        //link.target = "_blank"
        link.rel = 'nofollow noopener noreferrer'
        // link.title = passportFileUrl
        link.href = passportFileUrl;
        // link.download = passportFile;
        link.click();
    };

    const onDownloadNRIC = () => {
        const link = document.createElement("a");
        //link.target = "_blank"
        link.rel = 'nofollow noopener noreferrer'
        // link.title = nationalIdFileUrl
        link.href = nationalIdFileUrl;
        // link.download = nationalIdFile;
        link.click();
    };

    const uploadProfilePic = () => {
        const inputField = (document.getElementById("profilePic") as HTMLInputElement);
        inputField.value = "";
        // setProfilePicFile(undefined)
        document.getElementById("profilePic")?.click();
    };

    const uploadPassport = () => {
        if (userStatus === 'A' || userStatus === 'PR') {
            dispatch(error(({
                text: messageTxt,
                error: "Something wrong"
            })));
        } else {
            const inputField = (document.getElementById("passportFront") as HTMLInputElement);
            inputField.value = "";
            document.getElementById("passportFront")?.click();
        }
    };

    const uploadNationalID = () => {
        if (userStatus === 'A' || userStatus === 'PR') {
            dispatch(error(({
                text: messageTxt,
                error: "Something wrong"
            })));
        } else {
            const inputField = (document.getElementById("nationalId") as HTMLInputElement);
            inputField.value = "";
            document.getElementById("nationalId")?.click();
        }
    };

    // const removePP = async () => {
    //     setProfilePicDisplayFile(HumanIcon)
    //     setProfilePicFile(undefined)
    //     // if (!profilePic.name.includes("profile-pic"))
    //     await userRemoveProfilePic(true)

    // };

    // const removePassportImg = () => {
    //     setPassportFile(undefined)
    //     setPassportFileUrl(undefined)
    // };

    // const removeNRICImg = () => {
    //     setNationalId(undefined)
    //     setNationalIdUrl(undefined)
    // };

    const onSubmitAll = async (dataInfo: any) => {
        const userFormInfo = {
            firstName: dataInfo.firstName,
            lastName: dataInfo.lastName,
            dateofBirth: dataInfo.dob,
            street: dataInfo.streetAddress,
            city: dataInfo.city,
            state: dataInfo.state,
            country: dataInfo.country,
            postalCode: dataInfo.postalCode.toString()
        }

        setLoadingAll(true);
        await userUpdateData(userFormInfo)
        setUsername(userFormInfo.firstName + ' ' + userFormInfo.lastName)

        const profilePic = profilePicFile;
        const nationalId = nationalIdFile;
        const passportFront = passportFile;

        if (!nationalId.name.includes("national_id")) {
            const resp2 = await uploadDocument({
                file: nationalId,
                fileName: "national_id",
                module: "upload-user-nric",
                imageSizeType: "",
            })
            if (resp2?.status === 201) {
                setNationalStatus(true)
            } else {
                dispatch(error(({
                    text: "Upload NRIC Picture Error",
                    error: "Something wrong"
                })));
            }
        } else {
            setNationalStatus(true)
        }

        if (!passportFront.name.includes("passport-front")) {
            const resp1 = await uploadDocument({
                file: passportFront,
                fileName: "passport-front",
                module: "upload-user-passport-front",
                imageSizeType: "",
            });
            if (resp1?.status === 201) {
                setPassportFileStatus(true)
            } else {
                dispatch(error(({
                    text: "Upload Passport Picture Error",
                    error: "Something wrong"
                })));
            }
        } else {
            setPassportFileStatus(true)
        }


        if (profilePic !== undefined) {
            if (!profilePic.name.includes("profile-pic")) {
                const respPP = await uploadDocument({
                    file: profilePic,
                    fileName: "profile-pic",
                    module: "upload-user-photo",
                    imageSizeType: "",
                })
                if (respPP?.status === 201) {
                    setProfilePicStatus(true)
                } else {
                    dispatch(error(({
                        text: "Upload Profile Picture Error",
                        error: "Something wrong"
                    })));
                }
            }
        } else {
            setProfilePicStatus(true)
        }
        setLoadingAll(false);
        dispatch(success({
            text: "Update Profile Successful!"
        }))

        // Refresh data
        const response = await getProfile();
        const data = response?.data.data;
        dispatch(updateUserData({ data }));
    }


    const onChangeOne = async (e: React.FormEvent) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            setProfilePicDisplayFile(URL.createObjectURL(files[0]));
            setProfilePicFile(files[0]);
        }
    };

    const onChangeTwo = (e: React.FormEvent) => {
        const files = (e.target as HTMLInputElement).files;

        if (files && files.length > 0) {
            clearErrors("passportFront")
            setPassportFile(files[0]);
        } else {
            // Previously selected a file
            if (passportFile !== undefined) {
                setValue("passportFront", passportFile)
            }
        }
    };

    const onChangeThree = (e: React.FormEvent) => {
        const files = (e.target as HTMLInputElement).files;

        if (files && files.length > 0) {
            // console.log(files[0]);
            clearErrors("nationalId")
            setNationalId(files[0]);
        } else {
            // Previously selected a file
            if (nationalIdFile !== undefined) {
                setValue("nationalId", nationalIdFile)
            }
        }
    };


    return (
        <Grid container spacing={1} alignItems="stretch">
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmitAll)}>
                    <Box mt={2} ml={5} mr={5}>
                        <Card style={matches ? { marginBottom: "80px" } : {}}>
                            <CardContent style={{ width: "98%", margin: "auto" }}>
                                <div id="profile-container">
                                    {/** Profile Avatar */}
                                    <div className="profile-icon-wrapper">
                                        <div><Avatar src={profilePicDisplayFile} className="user-profile" /></div>
                                        <div className="user-profile-action">
                                            <Typography className="name-label">{username}</Typography>
                                            <div className="flex-row align-items-center">
                                                <Button variant="contained" className="upload-button" onClick={uploadProfilePic}>Upload</Button>
                                                <input
                                                    id="profilePic"
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    accept=".jpeg,.png,.gif,.jpg"
                                                    {...register("profilePic")}
                                                    onChange={onChangeOne}
                                                />
                                                {/* <Button variant="outlined" className="remove-button" onClick={removePP}>Remove</Button> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/** Row of Text Field */}
                                    <div className="content-wrapper">
                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    First Name
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("firstName", {
                                                        required: "First Name is empty",
                                                    })}
                                                    error={!!errors?.firstName}
                                                    helperText={errors?.firstName?.message}
                                                />
                                            </div>

                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Last Name
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("lastName", {
                                                        required: "Last Name is empty",
                                                    })}
                                                    error={!!errors?.lastName}
                                                    helperText={errors?.lastName?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Date of Birth
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    type="date"
                                                    className="shorter-input"
                                                    {...register("dob", {
                                                        required: "Date of birth is empty",
                                                        validate: (val: string) => {
                                                            const selectedDate = new Date(val).getFullYear();
                                                            const currentYear = new Date().getFullYear();
                                                            if (currentYear - selectedDate <= 18) {
                                                                return "You must be older than 18 years old to proceed financial investment.";
                                                            }
                                                        },
                                                    })}
                                                    error={!!errors?.dob}
                                                    helperText={errors?.dob?.message}
                                                />
                                            </div>

                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", paddingBottom: "20px", borderBottom: "1px solid #CCCCCC" }}>
                                                <span className="upper-label">
                                                    Email Address
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input disabled"
                                                    {...register("emailAddress", {
                                                        required: "Email Address is empty",
                                                    })}
                                                    disabled
                                                    error={!!errors?.emailAddress}
                                                    helperText={errors?.emailAddress?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <span style={{ fontWeight: 600, fontSize: "18px" }}>Address</span>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={{ width: "100%" }}>
                                                <span className="upper-label special">
                                                    Street Address
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    fullWidth
                                                    className={"full-width-textfield"}
                                                    style={{ width: "100%" }}
                                                    {...register("streetAddress", {
                                                        required: "Street is empty",
                                                    })}
                                                    error={!!errors?.streetAddress}
                                                    helperText={errors?.streetAddress?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label special">
                                                    City
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("city", {
                                                        required: "City is empty",
                                                    })}
                                                    error={!!errors?.city}
                                                    helperText={errors?.city?.message}
                                                />
                                            </div>

                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label special">
                                                    State
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("state", {
                                                        required: "State is empty",
                                                    })}
                                                    error={!!errors?.state}
                                                    helperText={errors?.state?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label special">
                                                    Country
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("country", {
                                                        required: "Country is empty",
                                                    })}
                                                    error={!!errors?.country}
                                                    helperText={errors?.country?.message}
                                                />
                                            </div>

                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", paddingBottom: "20px", borderBottom: "1px solid #CCCCCC" }}>
                                                <span className="upper-label special">
                                                    Postal Code
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("postalCode", {
                                                        required: "Postal Code is empty",
                                                    })}
                                                    error={!!errors?.postalCode}
                                                    helperText={errors?.postalCode?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", paddingBottom: "20px", borderBottom: "1px solid #CCCCCC" }}>
                                                <span className="upper-label">
                                                    Passport
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <div className={!matches ? "flex-row" : ""}>
                                                    <Button
                                                        id={!matches ? "upload-btn" : "upload-btn-small-screen"}
                                                        className={`${!!errors?.passportFront ? "error" : ""}`}
                                                        onClick={uploadPassport}
                                                    >
                                                        <img src={UploadIcon} alt="upload" />
                                                        <div className="text">
                                                            {passportFile
                                                                ? passportFile?.name
                                                                : messages.file_format_upload}
                                                        </div>
                                                        <input
                                                            id="passportFront"
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            accept=".jpeg,.png,.gif,.jpg"
                                                            {...register("passportFront", {
                                                                validate: (val: any) => {
                                                                    if (passportFile === undefined) {
                                                                        return "Please provide passport front page.";
                                                                    }
                                                                }
                                                            })}
                                                            onChange={onChangeTwo}
                                                        />
                                                    </Button>

                                                    {!matches && <div id="action-btn-container" className={!!errors?.passportFront ? "error" : ""}>
                                                        <a id="download-btn" onClick={() => onDownloadPP()}>Download</a>
                                                        {/* <Divider orientation="vertical" />
                                                        <a id="delete-btn" onClick={() => removePassportImg()}>Delete</a> */}
                                                    </div>}
                                                    {matches && <a style={{ color: "#9E9E9E" }} onClick={() => onDownloadPP()}>download</a>}
                                                </div>

                                                {!!errors?.passportFront && (
                                                    <span style={{ color: "red" }}>
                                                        Please provide Passport Picture.
                                                    </span>
                                                )}
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={{ width: "100%" }}>
                                                <span className="upper-label">
                                                    National ID
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <div className={!matches ? "flex-row" : ""}>
                                                    <Button
                                                        id={!matches ? "upload-btn" : "upload-btn-small-screen"}
                                                        className={`${!!errors?.nationalId ? "error" : ""}`}
                                                        onClick={uploadNationalID}
                                                    >
                                                        <img src={UploadIcon} alt="upload" />
                                                        <div className="text">
                                                            {nationalIdFile
                                                                ? nationalIdFile?.name
                                                                : messages.file_format_upload}
                                                        </div>
                                                        <input
                                                            id="nationalId"
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            accept=".jpeg,.png,.gif,.jpg"
                                                            {...register("nationalId", {
                                                                validate: (val: any) => {
                                                                    if (nationalIdFile === undefined) {
                                                                        return "Please provide national id.";
                                                                    }
                                                                }
                                                            })}
                                                            onChange={onChangeThree}
                                                        />
                                                    </Button>

                                                    {!matches && <div id="action-btn-container" className={!!errors?.nationalId ? "error" : ""}>
                                                        <a id="download-btn" onClick={() => onDownloadNRIC()}>Download</a>
                                                        {/* <Divider orientation="vertical" />
                                                        <a id="delete-btn" onClick={() => removeNRICImg()}>Delete</a> */}
                                                    </div>}
                                                    {matches && <a style={{ color: "#9E9E9E" }} onClick={() => onDownloadNRIC()}>download</a>}
                                                </div>

                                                {!!errors?.nationalId && (
                                                    <span style={{ color: "red" }}>
                                                        Please provide national id.
                                                    </span>
                                                )}
                                            </div>
                                        </ProfileLayoutWrapper>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {!matches && <div id="action-container">
                            {/* <Button variant="outlined" className="discard-button" disabled={loadingAll}  onClick={() => routeChange("/dashboard")}>Discard</Button> */}
                            <Button variant="contained" className="save-changes-button" type="submit" disabled={loadingAll}>{loadingAll ? <CircularProgress size={24} style={{ color: "#ffffff" }} /> : <span>Save Changes</span>}</Button>
                        </div>}

                        {matches && <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div id="action-container" style={{ marginBottom: "5px", marginTop: "10px", marginRight: "20px" }}>
                                {/* <Button variant="outlined" className="discard-button" disabled={loadingAll}  onClick={() => routeChange("/dashboard")}>Discard</Button> */}
                                <Button variant="contained" className="save-changes-button" type="submit" disabled={loadingAll}>{loadingAll ? <CircularProgress size={24} style={{ color: "#ffffff" }} /> : <span>Save Changes</span>}</Button>
                            </div>
                        </AppBar>}
                    </Box>
                </form>
            </Grid>
        </Grid>
    )
}

export default MyProfile;