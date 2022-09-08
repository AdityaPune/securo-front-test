import MyProfile from "./normalAccount";
import MyBusinessProfile from "./businessAccount";
import { useAppSelector } from "../../store/hooks";

function AccountComponent() {
    const user = useAppSelector(state => state.user.userData);
    if (user && user.userType === "B") return <MyBusinessProfile />
    if (user && user.userType === "I") return <MyProfile />
    return <></>
}

export default AccountComponent;