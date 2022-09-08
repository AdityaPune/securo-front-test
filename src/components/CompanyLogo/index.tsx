import { useState } from "react";

import SecuroFinance from "../../assets/images/common/securo-finance.svg"

function CompanyLogo() {
    const [logo, setLogo] = useState(SecuroFinance)

    // Listen to current theme change
    // useEffect(() => {
    //     setLogo(currentTheme === 'light' ? FolowhaleDark : FolowhaleBright)
    // }, [currentTheme])

    return <img src={logo} alt="companyLogo" />
}

export default CompanyLogo