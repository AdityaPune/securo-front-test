import { useEffect, useState } from 'react';

import './header.scss'
import '../app.scss'

import SecuroFinance from "../../assets/images/common/securo-finance.svg"

import useWindowSize from '../../hooks/window';

import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu, { IMobileMenuProps } from '../MobileMenu';

function HeaderPreLogin() {
    const windowSize = useWindowSize();
    const [showStakedIcon, setShowStakedIcon] = useState(false)
    const [openSide, setOpenSide] = useState(false)

    // Listen to window size change
    useEffect(() => {
        const { width } = windowSize;

        if (width !== undefined && width < 998) {
            setShowStakedIcon(true);
        } else {
            setShowStakedIcon(false);
            setOpenSide(false);
        }

    }, [windowSize])

    const mobileMenuProps: IMobileMenuProps = {
        open: openSide,
        handleOpen: setOpenSide
    }
    
    return <>
        {showStakedIcon && <div style={{ marginLeft: "16px", marginTop: "16px"}}>
            <MenuIcon onClick={() => setOpenSide(!openSide)} />
        </div>}
        {!showStakedIcon && <div className="header-container">
            <div className='header-container-wrapper flex-row align-items-center'>
                <img src={SecuroFinance} alt="company"/>
            </div>
        </div>}

        <MobileMenu {...mobileMenuProps}/>
    </>
} 

export default HeaderPreLogin