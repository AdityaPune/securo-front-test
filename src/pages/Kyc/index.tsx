import Kyc from "./normalAccount";
import Kyb from "./businessAccount";
import { useAppSelector } from "../../store/hooks";

function DocSubmission() {
    const user = useAppSelector(state => state.user.userData);
    if (user && user.userType === "B") return <Kyb />
    if (user && user.userType === "I") return <Kyc />
    return <></>
}

export default DocSubmission;