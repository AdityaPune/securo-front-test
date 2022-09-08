import './footer.scss'
import Techstar from '../../assets/images/common/techstar.svg'
import Daoventures from '../../assets/images/common/daoventures.svg'
import { Divider } from '@mui/material';

function Footer() {
    return <div style={{ height: "170px"}}>
        <div className="footer-container ">
            <div className="footer-container-wrapper flex-row align-items-center flex-content-center">
                <div className="flex-column align-items-center footer-item">
                    <p className="footer-item-desc">Built By</p>
                    <img src={Daoventures} className="footer-item-img" alt="built-by"/>
                </div>

                <Divider orientation={'vertical'} className="divider"/>

                <div className="flex-column align-items-center footer-item">
                    <p className="footer-item-desc">Incubated By</p>
                    <img src={Techstar}  className="footer-item-img"  alt="incubated-by"/>
                </div>
            </div>
        </div>
    </div>
}

export default Footer;