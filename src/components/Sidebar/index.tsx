import Techstar from '../../assets/images/common/techstar.svg'
import AlphaBit from '../../assets/images/common/alpha-bit.svg'
import Linkedin from '../../assets/images/social/linkedin.svg'
import Twitter from '../../assets/images/social/twitter.svg'
import Medium from '../../assets/images/social/medium.svg'

import '../app.scss'
import './sidebar.scss'
import CompanyLogo from '../CompanyLogo';
import Menus from './menu';

function BuiltAndIncubatedBy() {
    return <div className='flex-column align-items-center builtBy-container'>
        <p className="item-desc">Accelerated By</p>
        <div className='flex-row align-items-center flex-content-center'>
            <img src={Techstar} alt="techstar" />
            <img src={AlphaBit} alt="alphabit" />
        </div>
    </div>
}

function FollowUs() {
    return <div className='flex-column align-items-center FollowUs-container'>
        <p className="item-desc">Follow Us</p>
        <div className='flex-row align-items-center flex-content-center img-container'>
            <a href='https://twitter.com/Securo_Finance' target="_blank"><img src={Twitter} alt="twitter" className='img-styles' /></a>
            <a href="https://www.linkedin.com/company/securofinance/" target="_blank"><img src={Linkedin} alt="linkedin" className='img-styles' /></a>
            <a href="https://medium.com/@SecuroFinance" target="_blank"><img src={Medium} alt="medium" className='img-styles' /></a>
        </div>
    </div>
}

function Sidebar() {
    return <div className="sidebar-container flex-column flex-space-between align-item-center">
        <div className='flex-column align-items-center upper-container'>
            <div className='company-logo-container'>
                <CompanyLogo />
            </div>
            <Menus />
        </div>
        <div>
            <FollowUs />
            <BuiltAndIncubatedBy />
        </div>
    </div>
}

export default Sidebar