import { useAuth } from "../../services/auth/authProvider";
import { Avatar, Box, Button, Card, CardContent, TextField, Grid, Typography, Divider, CircularProgress, useMediaQuery, AppBar } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HumanIcon from "../../assets/images/icons/Avatar.svg";

import UploadIcon from "../../assets/images/icons/upload-icon.svg";

import "./profile.scss";
import { messages } from "../../constants/messages";
import { uploadDocument, userRemoveProfilePic, userUpdateData, businessUserUpdateData } from "../../services/axios/kyc";
import { getProfile } from "../../services/axios/user";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";
import { error, success } from "../../store/slices/messages-slice";
import { getBuinessProfile } from "../../services/axios/user";

function ProfileLayoutWrapper({ children }: any) {
    const matches = useMediaQuery('(max-width:600px)');
    return <div className={!matches ? "flex-row flex-space-between" : ""} style={{ marginTop: "20px" }}>
        {children}
    </div>
}

function MyBusinessProfile() {
    const { user } = useAuth();
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [profilePicDisplayFile, setProfilePicDisplayFile] = useState<any>(HumanIcon);
    const [profilePicFile, setProfilePicFile] = useState<any>(undefined);
    const [certificateOfIncorporationFile, setCertificateOfIncorporationFile] = useState<any>(undefined);
    const [loadingAll, setLoadingAll] = useState(false);
    const [username, setUsername] = useState("");
    // const [userInfo, setUserInfo] = useState<any>({});
    const [certificateOfIncorporationFileUrl, setCertificateOfIncorporationFileUrl] = useState<any>(undefined);
    const [profilePicStatus, setProfilePicStatus] = useState(false);
    const [certificateOfIncorporationFileStatus, setCertificateOfIncorporationFileStatus] = useState(false);
    const [userStatus, setUserStatus] = useState<any>(undefined);
    const [messageTxt, setMessageTxt] = useState<any>(undefined);

    const matches = useMediaQuery('(max-width:600px)');

    // const onPress = () => {
    //     if (user) getBuinessProfile(user.id)
    // }

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

    const findBusinessUserDetails = async () => {
        // console.log("user", user)
        const response = await getBuinessProfile(user.id);
        const data = response?.data.data;
        console.log("data", data)
        // setUserInfo(data)
        setValue('businessIncorporationDate', new Date(data.businessIncorporationDate).toISOString().split('T')[0])
        setValue('emailAddress', data.emailAddress)
        setValue('country', data.country)
        setValue('state', data.state)
        setValue('businessName', data.businessName)
        setValue('companyName', data.companyName)
        setValue('companyJurisdictionCode', data.companyJurisdictionCode)
        setValue('postalCode', data.postalCode)
        setValue('contactName', data.contactName)
        setValue('companyRegistrationNumber', data.companyRegistration)
        setCertificateOfIncorporationFileUrl(data.corpLicenseDocs)
        setUserStatus(data.status)

        if (data.status === 'A') {
            setMessageTxt("Verified User, no need to perform re-upload action")
        } else if (data.status === 'PR') {
            setMessageTxt("Still under review stage, please contact admin if you need to perform re-upload action")
        }
        // GetProfilePic(data.userPassportFrontUrl)
        var certificateFile = new File([], data.corpLicenseDocs.substring(data.corpLicenseDocs.lastIndexOf('/') + 1))
        setCertificateOfIncorporationFile(certificateFile)
        // console.log(data)
        if (data !== undefined && data.userPhotoUrl !== null && data.userPhotoUrl !== undefined) {
            setProfilePicDisplayFile(data.userPhotoUrl)
            setUsername(data.contactName)
        } else {
            setProfilePicDisplayFile(HumanIcon)
            setUsername(data.contactName)
        }

    };

    useEffect(() => {
        if (user) {
            findBusinessUserDetails();
        }
        // if (user === null || user === undefined) {
        //     findUserDetails();
        // }
    }, [user]);

    const onDownloadCertificate = () => {
        const link = document.createElement("a");
        //link.target = "_blank"
        link.rel = 'nofollow noopener noreferrer'
        // link.title = passportFileUrl
        link.href = certificateOfIncorporationFileUrl;
        // link.download = passportFile;
        link.click();
    };

    const uploadProfilePic = () => {
        const inputField = (document.getElementById("profilePic") as HTMLInputElement);
        inputField.value = "";
        // setProfilePicFile(undefined)
        document.getElementById("profilePic")?.click();
    };

    const uploadCertificate = () => {
        if (userStatus === 'A' || userStatus === 'PR') {
            dispatch(error(({
                text: messageTxt,
                error: "Something wrong"
            })));
        } else {
            const inputField = (document.getElementById("incorporationCertificate") as HTMLInputElement);
            inputField.value = "";
            document.getElementById("incorporationCertificate")?.click();
        }
    };

    const onSubmitAll = async (dataInfo: any) => {
        const userFormInfo = {
            businessName: dataInfo.businessName,
            companyName: dataInfo.companyName,
            companyJurisdictionCode: dataInfo.companyJurisdictionCode,
            businessIncorporationDate: dataInfo.businessIncorporationDate,
            state: dataInfo.state,
            country: dataInfo.country,
            postalCode: dataInfo.postalCode.toString(),
            companyRegistrationNumber: dataInfo.companyRegistrationNumber,
            contactName: dataInfo.contactName
        }

        setLoadingAll(true);
        await businessUserUpdateData(userFormInfo)
        setUsername(userFormInfo.contactName)

        const profilePic = profilePicFile;
        const certificateFile = certificateOfIncorporationFile;

        if (!certificateFile.name.includes("certificate-of-incorporation")) {
            const resp1 = await uploadDocument({
                file: certificateFile,
                fileName: "certificate-of-incorporation",
                module: "upload-corp-license",
                imageSizeType: "",
            });
            if (resp1?.status === 201) {
                setCertificateOfIncorporationFileStatus(true)
            } else {
                dispatch(error(({
                    text: "Upload Passport Picture Error",
                    error: "Something wrong"
                })));
            }
        } else {
            setCertificateOfIncorporationFileStatus(true)
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
        const response = await getBuinessProfile(user.id);
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
            clearErrors("incorporationCertificate")
            setCertificateOfIncorporationFile(files[0]);
        } else {
            // Previously selected a file
            if (certificateOfIncorporationFile !== undefined) {
                setValue("incorporationCertificate", certificateOfIncorporationFile)
            }
        }
    };

    return (
        <Grid container spacing={1} alignItems="stretch">
            <Grid item xs={12}>
                {/* <button onClick={onPress}>click</button> */}
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
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Contact Name
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("contactName", {
                                                        required: "Contact Name is empty",
                                                    })}
                                                    error={!!errors?.contactName}
                                                    helperText={errors?.contactName?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Business Name
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("businessName", {
                                                        required: "Business Name is empty",
                                                    })}
                                                    error={!!errors?.businessName}
                                                    helperText={errors?.businessName?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Company Name
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("companyName", {
                                                        required: "Company Name is empty",
                                                    })}
                                                    error={!!errors?.companyName}
                                                    helperText={errors?.companyName?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Company Registration Number
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("companyRegistrationNumber", {
                                                        required: "Company Registration Number is empty",
                                                    })}
                                                    error={!!errors?.companyRegistrationNumber}
                                                    helperText={errors?.companyRegistrationNumber?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "100%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Company Jurisdiction Code
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    className="shorter-input"
                                                    {...register("companyJurisdictionCode", {
                                                        required: "Company Jurisdiction Code is empty",
                                                    })}
                                                    error={!!errors?.companyRegistrationNumber}
                                                    helperText={errors?.companyRegistrationNumber?.message}
                                                />
                                            </div>
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={!matches ? { width: "45%" } : { width: "100%", marginBottom: "10px" }}>
                                                <span className="upper-label">
                                                    Business Incorporation Date
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <TextField id="outlined-basic"
                                                    variant="outlined"
                                                    type="date"
                                                    className="shorter-input"
                                                    {...register("businessIncorporationDate", {
                                                        required: "Business Incorporation Date is empty",
                                                        // validate: (val: string) => {
                                                        //     const selectedDate = new Date(val).getFullYear();
                                                        //     const currentYear = new Date().getFullYear();
                                                        //     if (currentYear - selectedDate <= 18) {
                                                        //         return "You must be older than 18 years old to proceed financial investment.";
                                                        //     }
                                                        // },
                                                    })}
                                                    error={!!errors?.businessIncorporationDate}
                                                    helperText={errors?.businessIncorporationDate?.message}
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

                                        {/* <ProfileLayoutWrapper>
                                            <span style={{ fontWeight: 600, fontSize: "18px" }}>Address</span>
                                        </ProfileLayoutWrapper> */}

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={{ width: "100%", marginBottom: "10px" }}>
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
                                            <div id="input-container" style={{ width: "100%", marginBottom: "10px" }}>
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
                                        </ProfileLayoutWrapper>

                                        <ProfileLayoutWrapper>
                                            <div id="input-container" style={{ width: "100%", paddingBottom: "20px", borderBottom: "1px solid #CCCCCC" }}>
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
                                                    Certificate of Incorporation
                                                    <span className="aesterisk">*</span>
                                                </span>

                                                <div className={!matches ? "flex-row" : ""}>
                                                    <Button
                                                        id={!matches ? "upload-btn" : "upload-btn-small-screen"}
                                                        className={`${!!errors?.passportFront ? "error" : ""}`}
                                                        onClick={uploadCertificate}
                                                    >
                                                        <img src={UploadIcon} alt="upload" />
                                                        <div className="text">
                                                            {certificateOfIncorporationFile
                                                                ? certificateOfIncorporationFile?.name
                                                                : messages.file_format_upload}
                                                        </div>
                                                        <input
                                                            id="incorporationCertificate"
                                                            type="file"
                                                            style={{ display: "none" }}
                                                            accept=".jpeg,.png,.gif,.jpg"
                                                            {...register("incorporationCertificate", {
                                                                validate: (val: any) => {
                                                                    if (certificateOfIncorporationFile === undefined) {
                                                                        return "Please provide passport front page.";
                                                                    }
                                                                }
                                                            })}
                                                            onChange={onChangeTwo}
                                                        />
                                                    </Button>

                                                    {!matches && <div id="action-btn-container" className={!!errors?.passportFront ? "error" : ""}>
                                                        <a id="download-btn" onClick={() => onDownloadCertificate()}>Download</a>
                                                        {/* <Divider orientation="vertical" />
                                                        <a id="delete-btn" onClick={() => removePassportImg()}>Delete</a> */}
                                                    </div>}
                                                    {matches && <a style={{ color: "#9E9E9E" }} onClick={() => onDownloadCertificate()}>download</a>}
                                                </div>

                                                {!!errors?.passportFront && (
                                                    <span style={{ color: "red" }}>
                                                        Please provide Passport Picture.
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

export default MyBusinessProfile;