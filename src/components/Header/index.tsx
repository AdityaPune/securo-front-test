import { useEffect, useState } from "react";

import "./header.scss";
import "../app.scss";

import useWindowSize from "../../hooks/window";

import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu, { IMobileMenuProps } from "../MobileMenu";

import { useAuth } from "../../services/auth/authProvider";
import { Avatar, Typography, AppBar, Box } from "@mui/material";
import CompanyLogo from "../CompanyLogo";
import { useLocation, useNavigate } from "react-router-dom";

import menu from "../../constants/menu";
import SecuroSymbol from "../../assets/images/common/securo-finance.svg";

import GobackIcon from "../../assets/images/common/go-back.svg";
import HumanIcon from "../../assets/images/common/human.svg";
import MenuIconSecuro from "../../assets/images/icons/MenuIcon.svg";
import SettingsIcon from "../../assets/images/common/settings.svg";
import NotificationsIcon from "../../assets/images/common/notifs.svg";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppSelector } from "../../store/hooks";

function Header() {
  const windowSize = useWindowSize();
  const [scroll, setScroll] = useState(false);

  const [showStakedIcon, setShowStakedIcon] = useState(false);
  const [openSide, setOpenSide] = useState(false);

  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parentPath, setParentPath] = useState("");
  const [isChildrenPage, setIsChildrenPage] = useState(false);

  const [profilePicDisplayFile, setProfilePicDisplayFile] =
    useState<any>(HumanIcon);
  const [expanded, setExpanded] = useState(false);

  const userData = useAppSelector((state) => state.user.userData);
  useEffect(() => {
    if (
      userData !== undefined &&
      userData.userPhotoUrl !== undefined &&
      userData.userPhotoUrl !== null
    ) {
      setProfilePicDisplayFile(userData.userPhotoUrl);
      if (userData.firstName) setUsername(userData.firstName);
    } else {
      setProfilePicDisplayFile(HumanIcon);
      //if (userData.firstName) setUsername(userData.firstName)
    }
  }, [userData]);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      const parsedUser = user;
      setUsername(parsedUser.name ? parsedUser.name : parsedUser.emailAddress);
    }
    setIsAuthenticated(!!user);
  }, [user]);

  // Listen to window size change
  useEffect(() => {
    const { width } = windowSize;

    if (width !== undefined && width <= 960) {
      setShowStakedIcon(true);
    } else {
      setShowStakedIcon(false);
      setOpenSide(false);
    }
  }, [windowSize]);

  const location = useLocation();
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState("");
  const businessView = useAppSelector((state) => state.app.businessView);
  const nonBusinessView = useAppSelector((state) => state.app.nonBusinessView);

  const { pathname } = location;

  // Scrolling
  useEffect(() => {
    function onScroll() {
      const scrollTop = root?.scrollTop;
      if (scrollTop) {
        setScroll(scrollTop >= 50);
      }
    }

    const root = document.getElementById("overall-content");
    root?.addEventListener("scroll", onScroll, true);

    return () => {
      root?.scrollTo(0, 0);
      root?.removeEventListener("scroll", onScroll, true);
    };
  }, [pathname, businessView, nonBusinessView]);

  useEffect(() => {
    setParentPath("");
    setIsChildrenPage(false);
    setScroll(false);
    const { pathname } = location;
    const paths = pathname.split("/").filter((p) => p !== "");
    if (paths.length > 0) {
      if (paths.length >= 2) {
        setParentPath(`/${paths[0]}`);
        setIsChildrenPage(true);
      } else {
        const path = menu.find((m) => m.path.includes(`/${paths[0]}`));
        if (path !== undefined) {
          setHeaderTitle(path.headerLabel);
        }
      }
    }
  }, [location, businessView, nonBusinessView]);

  const mobileMenuProps: IMobileMenuProps = {
    open: openSide,
    handleOpen: setOpenSide,
  };

  function GoBackComponent() {
    return (
      <div
        className="flex-row align-items-center"
        id="go-back"
        onClick={() => navigate(parentPath)}
      >
        <img src={GobackIcon} alt="Go back" />
        <span style={{ marginLeft: "8px" }}>Go Back</span>
      </div>
    );
  }

  const handleLogout = () => {
    setScroll(false);
    logout();
  };

  {
    /*  */
  }

  function AccountButtonComponent() {
    return (
      <div id="account-action-button">
        <div className={`content`}>
          <div className={"actions"}>
            <img src={SettingsIcon} className={"utility-icon"} />
            <img src={NotificationsIcon} className={"utility-icon"} />
            <div
              className={"account-picture"}
              onClick={() => setExpanded(!expanded)}
            >
              <div className="name-container-wrapper">
                <Avatar
                  src={profilePicDisplayFile}
                  alt="human"
                  className={`${expanded ? "icon-align" : ""} `}
                  style={{ marginRight: "4px", width: "32px", height: "32px" }}
                  variant="rounded"
                />
              </div>

              {expanded && (
                <div className="expanded-container">
                  <div
                    className="menu-item"
                    style={{ borderTop: "0px" }}
                    onClick={() => navigate("/my-account")}
                  >
                    My Account
                  </div>

                  <div
                    className="menu-item special"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && showStakedIcon && (
        <Box style={{ marginLeft: "16px", marginTop: "16px" }}>
          <AppBar color="inherit">
            <Box
              display="flex"
              justifyContent="space-between"
              p={1}
              style={{ borderBottom: "1px solid #EEEEEE" }}
            >
              <Box>
                <img src={SecuroSymbol} style={{ height: "40px" }}></img>
              </Box>
              <Box mt={0.5}>
                <img
                  src={MenuIconSecuro}
                  onClick={() => setOpenSide(!openSide)}
                ></img>
                {/* <MenuIcon onClick={() => setOpenSide(!openSide)} /> */}
              </Box>
            </Box>
            <Box>
              <AccountButtonComponent />
            </Box>
          </AppBar>
          <Box mt={5}>&nbsp;</Box>
        </Box>
      )}

      {!showStakedIcon && (
        <div className="header-container">
          <div
            className={`header-container-wrapper ${
              scroll ? (expanded ? "scrolled-expanded" : "scrolled") : ""
            } ${expanded ? "expanded" : ""}`}
          >
            {!isAuthenticated && <CompanyLogo />}
            {isAuthenticated && (
              <>
                {isChildrenPage ? (
                  <GoBackComponent />
                ) : (
                  <div className={"header-title-div"}>
                    <Typography className={"header-container-title"}>
                      {headerTitle}
                    </Typography>
                    {headerTitle === "Dashboard" && (
                      <Typography className={"welcome-back-message"}>
                        Welcome back, {username}!
                      </Typography>
                    )}
                  </div>
                )}
              </>
            )}
            {isAuthenticated && <AccountButtonComponent />}
          </div>
        </div>
      )}

      <MobileMenu {...mobileMenuProps} />
    </>
  );
}

export function Titles() {
  const windowSize = useWindowSize();
  const [scroll, setScroll] = useState(false);

  const [showStakedIcon, setShowStakedIcon] = useState(false);
  const [openSide, setOpenSide] = useState(false);

  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parentPath, setParentPath] = useState("");
  const [isChildrenPage, setIsChildrenPage] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // Listen to window size change
  useEffect(() => {
    const { width } = windowSize;

    if (width !== undefined && width <= 960) {
      setShowStakedIcon(true);
    } else {
      setShowStakedIcon(false);
      setOpenSide(false);
    }
  }, [windowSize]);

  const location = useLocation();
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    setParentPath("");
    setIsChildrenPage(false);
    setScroll(false);
    const { pathname } = location;
    const paths = pathname.split("/").filter((p) => p !== "");
    if (paths.length > 0) {
      if (paths.length >= 2) {
        setParentPath(`/${paths[0]}`);
        setIsChildrenPage(true);
      } else {
        const path = menu.find((m) => m.path.includes(`/${paths[0]}`));
        if (path !== undefined) {
          setHeaderTitle(path.headerLabel);
        }
      }
    }
  }, [location]);

  function GoBackComponent() {
    return (
      <div
        className="flex-row align-items-center"
        id="go-back"
        onClick={() => navigate(parentPath)}
      >
        <img
          src={GobackIcon}
          alt="Go back"
          style={showStakedIcon ? { width: "18px", height: "18px" } : {}}
        />
        <span
          style={
            showStakedIcon
              ? { marginLeft: "8px", fontSize: "20px" }
              : { marginLeft: "8px" }
          }
        >
          Go Back
        </span>
      </div>
    );
  }

  return (
    <>
      {showStakedIcon && (
        <Box mt={10}>
          {isAuthenticated && (
            <>
              {isChildrenPage ? (
                <Box ml={4}>
                  <GoBackComponent />
                </Box>
              ) : (
                <Box ml={5}>
                  <Typography style={{ fontSize: "25px", fontWeight: 700 }}>
                    {headerTitle}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default Header;
